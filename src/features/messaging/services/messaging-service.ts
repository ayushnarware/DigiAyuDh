import type { Chat, Message, User, ChatType } from '../types';

class MessagingService {
  private currentUser: User = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@company.com',
    avatar: 'https://avatar.vercel.sh/john',
    status: 'online',
  };

  private mockChats: Chat[] = [
    {
      id: 'chat-1',
      type: 'private',
      name: 'Sarah Johnson',
      avatar: 'https://avatar.vercel.sh/sarah',
      members: [this.currentUser, { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' }],
      createdBy: this.currentUser,
      createdAt: new Date(Date.now() - 86400000),
      lastMessage: {
        id: 'msg-1',
        chatId: 'chat-1',
        sender: { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
        content: 'Let\'s sync up tomorrow!',
        timestamp: new Date(Date.now() - 3600000),
        status: 'seen',
      },
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
    },
    {
      id: 'chat-2',
      type: 'group',
      name: 'Project Team',
      avatar: 'https://avatar.vercel.sh/team',
      members: [
        this.currentUser,
        { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
        { id: 'user-3', name: 'Mike Chen', email: 'mike@company.com', avatar: 'https://avatar.vercel.sh/mike', status: 'away' },
      ],
      createdBy: { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
      createdAt: new Date(Date.now() - 604800000),
      lastMessage: {
        id: 'msg-2',
        chatId: 'chat-2',
        sender: { id: 'user-3', name: 'Mike Chen', email: 'mike@company.com', avatar: 'https://avatar.vercel.sh/mike', status: 'away' },
        content: 'Design is ready for review',
        timestamp: new Date(Date.now() - 7200000),
        status: 'delivered',
      },
      unreadCount: 2,
      isPinned: true,
      isArchived: false,
    },
    {
      id: 'chat-3',
      type: 'channel',
      name: 'general',
      description: 'General announcements and discussions',
      members: [
        this.currentUser,
        { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
        { id: 'user-4', name: 'Lisa Admin', email: 'lisa@company.com', avatar: 'https://avatar.vercel.sh/lisa', status: 'offline' },
      ],
      createdBy: { id: 'user-4', name: 'Lisa Admin', email: 'lisa@company.com', avatar: 'https://avatar.vercel.sh/lisa', status: 'offline' },
      createdAt: new Date(Date.now() - 1209600000),
      unreadCount: 5,
      isPinned: true,
      isArchived: false,
    },
    {
      id: 'chat-4',
      type: 'department',
      name: 'Engineering',
      description: 'Engineering department discussions',
      members: [
        this.currentUser,
        { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
        { id: 'user-3', name: 'Mike Chen', email: 'mike@company.com', avatar: 'https://avatar.vercel.sh/mike', status: 'away' },
      ],
      createdBy: { id: 'user-4', name: 'Lisa Admin', email: 'lisa@company.com', avatar: 'https://avatar.vercel.sh/lisa', status: 'offline' },
      createdAt: new Date(Date.now() - 2592000000),
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
    },
  ];

  private mockMessages: Message[] = [
    {
      id: 'msg-100',
      chatId: 'chat-1',
      sender: this.currentUser,
      content: 'Hi Sarah! How are you doing?',
      timestamp: new Date(Date.now() - 10800000),
      status: 'seen',
    },
    {
      id: 'msg-101',
      chatId: 'chat-1',
      sender: { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
      content: 'Great! I just finished the design mockups. Want to review them?',
      timestamp: new Date(Date.now() - 9000000),
      status: 'seen',
      attachments: [{
        id: 'att-1',
        name: 'design-mockups.pdf',
        type: 'pdf',
        size: 2400000,
        url: '/assets/mockup.pdf',
        uploadedAt: new Date(Date.now() - 9000000),
      }],
    },
    {
      id: 'msg-102',
      chatId: 'chat-1',
      sender: this.currentUser,
      content: 'Absolutely! Let me check them out 👀',
      timestamp: new Date(Date.now() - 7200000),
      status: 'seen',
      reactions: [{
        emoji: '👍',
        users: [{ id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' }],
      }],
    },
    {
      id: 'msg-103',
      chatId: 'chat-1',
      sender: { id: 'user-2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://avatar.vercel.sh/sarah', status: 'online' },
      content: 'Let\'s sync up tomorrow!',
      timestamp: new Date(Date.now() - 3600000),
      status: 'seen',
    },
  ];

  async getChats(): Promise<Chat[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockChats);
      }, 500);
    });
  }

  async getChat(chatId: string): Promise<Chat | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockChats.find(c => c.id === chatId) || null);
      }, 300);
    });
  }

  async getMessages(chatId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockMessages.filter(m => m.chatId === chatId));
      }, 500);
    });
  }

  async sendMessage(chatId: string, content: string): Promise<Message> {
    const message: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      sender: this.currentUser,
      content,
      timestamp: new Date(),
      status: 'sent',
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockMessages.push(message);
        message.status = 'delivered';
        resolve(message);
      }, 300);
    });
  }

  async editMessage(messageId: string, content: string): Promise<Message | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const message = this.mockMessages.find(m => m.id === messageId);
        if (message) {
          message.content = content;
          message.editedAt = new Date();
          resolve(message);
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  async deleteMessage(messageId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.mockMessages.findIndex(m => m.id === messageId);
        if (index !== -1) {
          this.mockMessages.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 200);
    });
  }

  async createChat(type: ChatType, name: string, members: User[]): Promise<Chat> {
    const chat: Chat = {
      id: `chat-${Date.now()}`,
      type,
      name,
      members,
      createdBy: this.currentUser,
      createdAt: new Date(),
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockChats.push(chat);
        resolve(chat);
      }, 300);
    });
  }

  async addReaction(messageId: string, emoji: string): Promise<Message | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const message = this.mockMessages.find(m => m.id === messageId);
        if (message) {
          if (!message.reactions) {
            message.reactions = [];
          }
          const existingReaction = message.reactions.find(r => r.emoji === emoji);
          if (existingReaction && !existingReaction.users.find(u => u.id === this.currentUser.id)) {
            existingReaction.users.push(this.currentUser);
          } else if (!existingReaction) {
            message.reactions.push({
              emoji,
              users: [this.currentUser],
            });
          }
          resolve(message);
        } else {
          resolve(null);
        }
      }, 150);
    });
  }

  async pinMessage(messageId: string): Promise<Message | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const message = this.mockMessages.find(m => m.id === messageId);
        if (message) {
          message.isPinned = !message.isPinned;
          resolve(message);
        } else {
          resolve(null);
        }
      }, 150);
    });
  }

  async archiveChat(chatId: string): Promise<Chat | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chat = this.mockChats.find(c => c.id === chatId);
        if (chat) {
          chat.isArchived = !chat.isArchived;
          resolve(chat);
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  async pinChat(chatId: string): Promise<Chat | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chat = this.mockChats.find(c => c.id === chatId);
        if (chat) {
          chat.isPinned = !chat.isPinned;
          resolve(chat);
        } else {
          resolve(null);
        }
      }, 200);
    });
  }

  async searchMessages(chatId: string, query: string): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = this.mockMessages.filter(
          m => m.chatId === chatId && m.content.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
}

export const messagingService = new MessagingService();
