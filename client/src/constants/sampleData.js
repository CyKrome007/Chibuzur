export const sampleChats = [
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Doe',
        _id: '1',
        groupChat: false,
        members: ['1', '2']
    },
    {
        avatar: [
            'https://www.w3schools.com/howto/img_avatar.png',
            'https://www.w3schools.com/howto/img_avatar.png',
            'https://www.w3schools.com/howto/img_avatar.png',
            'https://www.w3schools.com/howto/img_avatar.png',
            'https://www.w3schools.com/howto/img_avatar.png',
            'https://www.w3schools.com/howto/img_avatar.png',
        ],
        name: 'John Boi',
        _id: '2',
        groupChat: true,
        members: ['1', '2']
    }
]

export const sampleUsers = [
    {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: 'John Doe',
        _id: '1',
    },
    {
        avatar: [
            'https://www.w3schools.com/howto/img_avatar.png',
        ],
        name: 'John Boi',
        _id: '2',
    },
]

export const sampleNotifications = [
    {
        sender: {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Doe',
        },
        _id: '1',
    },
    {
        sender: {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Boi',
        },
        _id: '2',
    },
    {
        sender: {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Doe',
        },
        _id: '1',
    },
    {
        sender: {
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            name: 'John Boi',
        },
        _id: '2',
    },
]

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: 'asdasd',
                url: 'https://w3schools.com/howto/img_avatar.png',
            },
        ],
        content: "L*uda ka Message hai",
        _id: 'asdfasdfasdfadf',
        sender: {
            _id: 'user._id',
            name: 'Chaman',
        },
        chat: 'chatId',
        createdAt: '2024-02-12T10:41:30.630Z',
    },
    {
        attachments: [
            {
                public_id: 'asdasd 2',
                url: 'https://w3schools.com/howto/img_avatar.png',
            },
        ],
        content: "L*uda 2 ka Message hai",
        _id: 'asdfasdfasdfadg',
        sender: {
            _id: 'dlkasjf',
            name: 'Chaman 2',
        },
        chat: 'chatId',
        createdAt: '2024-02-12T10:41:30.630Z',
    },
];

export const dashboardData = {
    users: [
        {
            name: 'John Doe',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            _id: '1',
            username: 'john_doe',
            friends: 20,
            groups: 5,
        },
        {
            name: 'John Boi',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            _id: '2',
            username: 'john_boi',
            friends: 20,
            groups: 25,
        },
    ],
    chats: [
        {
            name: 'Bhasad Group',
            avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
            _id: '1',
            groupChat: true,
            members: [
                {
                    _id: '1',
                    avatar: 'https://w3schools.com/howto/img_avatar.png',
                },
                {
                    _id: '2',
                    avatar: 'https://w3schools.com/howto/img_avatar.png',
                }
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: 'John Doe',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        },
        {
            name: 'L*da Lassan Group',
            avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
            _id: '2',
            groupChat: true,
            members: [
                {
                    _id: '1',
                    avatar: 'https://w3schools.com/howto/img_avatar.png',
                },
                {
                    _id: '2',
                    avatar: 'https://w3schools.com/howto/img_avatar.png',
                }
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: 'John Doe',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        }
    ],
    messages: [
        {
            attachments: [
                {
                    public_id: 'asdasd',
                    url: 'https://w3schools.com/howto/img_avatar.png',
                },
            ],
            content: '',
            _id: 'sfajdlfajsdfjasldfha',
            sender: {
                name: 'Chaman 2',
                avatar: 'https://w3schools.com/howto/img_avatar.png'
            },
            chat: 'chatId',
            groupChat: false,
            createdAt: '2024-10-12T10:41:30.630Z',
        },
        {
            attachments: [
                {
                    public_id: 'asdasd 2',
                    url: 'https://w3schools.com/howto/img_avatar.png',
                },
            ],
            content: '',
            _id: 'sfajdlfajsdfjasldfhaa',
            sender: {
                name: 'Chaman 2',
                avatar: 'https://w3schools.com/howto/img_avatar.png'
            },
            chat: 'chatId',
            groupChat: true,
            createdAt: '2024-10-12T10:41:30.630Z',
        },
    ],
};
