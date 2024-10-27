import {TryCatch} from "../middlewares/error.js";
import {ErrorHandler} from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import {deleteFilesFromCloudinary, emitEvent} from "../utils/features.js";
import {ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALTER, REFETCH_CHATS} from "../constants/events.js";
import {getOtherMember} from "../lib/helper.js";
import {User} from "../models/user.js";
import {Message} from "../models/message.js";

const newGroup = TryCatch(async(req, res, next) => {
    const {name, members} = req.body;

    if(members.length < 2)
        return next(new ErrorHandler('Group Must Have At Least 3 Members'), 400);

    const allMembers = [...members, req.userId];

    await Chat.create({
        name,
        groupChat: true,
        creator: req.userId,
        members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group.`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
        success: true,
        message: `Group Created Successfully.`,
    })

});

const getMyChats = TryCatch(async(req, res, next) => {

    const chats = await Chat.find({ members: req.userId }).populate(
        "members",
        "name avatar"
    );

    const transformedChats = chats.map(({_id, name, members, groupChat}) => {

        const otherMember = getOtherMember(members, req.userId);

        return {
            _id,
            groupChat,
            avatar: groupChat
                ? members.slice(0, 3).map(({ avatar }) => avatar.url)
                : [otherMember.avatar],
            name: groupChat ? name : otherMember.name,
            members: members.reduce((prev, curr) => {
                if(curr._id.toString() !== req.userId.toString()) {
                    prev.push(curr._id);
                }
                return prev;
            }, []),

        }
    });

    return res.status(200).json({
        success: true,
        chats: transformedChats,
    })

});

const getMyGroups = TryCatch(async (req, res, next) => {
    const chats = await Chat.find({
        membsers: req.userId,
        groupChat: true,
        creator: req.userId,
    }).populate('members', 'name avatar');

    const groups = chat.map(
        ({members, _id, groupChat, name}) => ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
        })
    );

    return res.status(200).json({
        success: true,
        groups
    })

});

const addMembers = TryCatch(async (req, res, next) => {

    const { chatId, members } = req.body;

    if(!members || members.length < 1) return next(new ErrorHandler('Please provide members'), 400);

    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler("Chat not found"), 404);
    if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat'), 404);
    if(chat.creator.toString() !== req.userId.toString()) return next(new ErrorHandler('You are not allowed to add members to this group'), 403);

    const allNewMembersPromise = members.map((i) => User.findById(i, 'name'));

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers.filter(
        (i) => !chat.members.includes(i._id.toString())
    ).map((i) => i._id);

    chat.members.push(...uniqueMembers);

    if (chat.members.length > 100)
        return next(new ErrorHandler('Group member resultPerPage reached'), 400);
    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(req, ALERT, chat.members, `${allUsersName} has been added to the group.`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: 'Members added successfully'
    })

});

const removeMember = TryCatch(async (req, res, next) => {

    const { userId, chatId } = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, 'name'),
    ]);

    if(!chat) return next(new ErrorHandler("Chat not found"), 404);
    if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat'), 404);
    if(chat.creator.toString() !== req.userId.toString()) return next(new ErrorHandler('You are not allowed to add members to this group'), 403);

    if(chat.members.length <= 3)
        return next(new ErrorHandler('Group must have at least 3 members'), 400);

    chat.members = chat.members.filter(
        (member) => member.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(req, ALERT, `${userThatWillBeRemoved.name} has been removed from the group.`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: 'Member removed successfully'
    });

});

const leaveGroup = TryCatch(async (req, res, next) => {

    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler("Chat not found"), 404);
    if(!chat.groupChat) return next(new ErrorHandler('This is not a group chat'), 400);
    const remainingMembers = chat.members.filter(
        (member) => member.toString() !== req.userId.toString()
    );

    if(remainingMembers.length < 3)
        return next(new ErrorHandler("Group must have atleast 3 members"), 400);

    if(chat.creator.toString() === req.userId.toString()) {
        chat.creator = remainingMembers[Math.floor(Math.random() * remainingMembers.length)];
    }

    chat.members = remainingMembers;

    const [user] = await Promise.all([
        User.findById(req.userId, "name"),
        await chat.save()
    ]);

    emitEvent(req, ALERT, `${user.name} has left the group.`);
    // emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: 'Member removed successfully'
    });

});

const sendAttachments = TryCatch(async(req, res, next) => {

    const {chatId} = req.body;

    const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.userId, 'name'),
    ]);

    if (!chat) {
        return next(new ErrorHandler("Chat not found"), 404);
    }

    const files = req.files || [];

    if(files.length === 0)
        return next(new ErrorHandler('No files found.'), 400);

    const attachments = [];

    const messageForDB = {
        content: "",
        attachments,
        sender: me._id,
        chat: chatId,
    };

    const messageForRealTime = {
        ...messageForDB,
        sender: {
            _id: me._id,
            name: me.name,
        },
    };

    emitEvent(req, NEW_ATTACHMENT, chat.members, {
        message: messageForRealTime,
        chatId,
    });

    const message = await Message.create(messageForDB);

    emitEvent(req, NEW_MESSAGE_ALTER, chat.members, {
        chatId
    });

    return res.status(200).json({
        success: true,
        message
    });
});

const getChatDetails = TryCatch(async (req, res, next) => {
    if(req.query.populate === 'true') {
        // console.log('Populate')
        const chat = await Chat.findById(req.params.id).populate('members', 'name avatar').lean();

        if(!chat)
            return next(new ErrorHandler('Chat not Found'), 404)

        chat.members = chat.members.map(({_id, name, avatar}) => ({
            _id,
            name,
            avatar: avatar.url
        }));

        return res.status(200).json({
            success: true,
            chat,
        });

    } else {
        // console.log('Not Populate')
        const chat = await Chat.findById(req.params.id);
        if(!chat)
            return next(new ErrorHandler('Chat not Found'), 404);
        return res.status(200).json({
            success: true,
            chat,
        });
    }
});

const renameGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const {name}= req.body;

    const chat = await Chat.findById(chatId);

    if(!chat)
        return next(new ErrorHandler('Chat not found'), 404);

    if(!chat.groupChat)
        return next(new ErrorHandler('This is not a group chat'), 400);

    if(chat.creator.toString() !== req.userId.toString())
        return next(new ErrorHandler('You are not allowed to rename the group'), 403);

    chat.name = name;

    await chat.save();

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message:`Group renamed successfully to ${name}`,
    });

});

const deleteChat = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if(!chat)
        return next(new ErrorHandler('Chat not found'), 404);

    const members = chat.members;

    if(chat.groupChat && chat.creator.toString() !== req.userId.toString())
        return next(new ErrorHandler('You are not allowed to delete the group'), 403);

    const messagesWithAttachments = await Message.find({
        chat: chatId,
        attachments: {
            $exists: true,
            $ne: []
        },
    })

    const public_ids = [];

    messagesWithAttachments.forEach(({attachments}) => {
        attachments.forEach(({public_id}) => public_ids.push(public_id))
    });

    await Promise.all([
        deleteFilesFromCloudinary(public_ids),
        chat.deleteOne(),
        Message.deleteMany({ chat: chatId }),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: 'Chat Deleted Successfully',
    });

});

const getMessages = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    const { page = 1 } = req.query;

    const resultPerPage  = 20;
    const skip = (page - 1) * resultPerPage;

    const [messages, totalMessagesCount] = await Promise.all([
        Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(resultPerPage)
            .populate('sender', 'name')
            .lean(),
        Message.countDocuments({ chat: chatId }),
    ]);

    const totalPages = Math.ceil(totalMessagesCount / resultPerPage);

    return res.status(200).json({
        success: true,
        messages: messages.reverse(),
        totalPages
    });

});

export {
    newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup,
    deleteChat, getMessages
};