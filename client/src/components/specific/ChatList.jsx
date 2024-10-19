import {Stack} from "@mui/material";
import {ChatItem} from "../shared/ChatItem.jsx";

const ChatList = ({
                      w='100%',
                      chats=[],
                      chatId,
                      onlineUsers=[],
                      newMessagesAlert=[{
                          chatId: '',
                          count: 0,
                      }],
                      handleDeleteChat,
                  }) => {
    return (
        <>
            <Stack direction="column" width={w} height={'100%'} overflow={'auto'}>
                {
                    chats?.map((data, index) => {
                        const { avatar, _id, name,groupChat, members } = data;

                        const newMessageAlert = newMessagesAlert.find(({chatId}) => chatId === _id);

                        const isOnline = members?.some((member) => onlineUsers.includes(member));

                        return <ChatItem
                            newMessageAlert={newMessageAlert}
                            isOnline={isOnline}
                            _id={_id}
                            key={_id}
                            sameSender={chatId === _id}
                            groupChat={groupChat}
                            name={name}
                            avatar={avatar}
                            handleDeleteChat={handleDeleteChat}
                        />;
                    })
                }
            </Stack>
        </>
    )
}

export default ChatList;
