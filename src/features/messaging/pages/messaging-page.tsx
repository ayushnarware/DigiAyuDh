'use client';

import { useState } from 'react';
import { Search, Plus, Phone, Video, Settings, Send, Paperclip, Smile, MoreVertical, Pin, Archive, Check, CheckCheck, Clock } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: { type: string; url: string; name: string }[];
  reactions?: { emoji: string; count: number }[];
  edited?: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  type: 'private' | 'group' | 'channel';
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  members?: string[];
  isArchived: boolean;
  isPinned: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'John Doe',
    type: 'private',
    lastMessage: 'See you tomorrow!',
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 2,
    isArchived: false,
    isPinned: true,
  },
  {
    id: '2',
    name: 'Development Team',
    type: 'group',
    lastMessage: 'Sprint review is at 2 PM',
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 0,
    isArchived: false,
    isPinned: false,
    members: ['John', 'Jane', 'Bob', 'Alice'],
  },
  {
    id: '3',
    name: '#announcements',
    type: 'channel',
    lastMessage: 'New office hours starting next week',
    lastMessageTime: new Date(Date.now() - 86400000),
    unreadCount: 5,
    isArchived: false,
    isPinned: false,
  },
  {
    id: '4',
    name: 'Project Alpha',
    type: 'group',
    lastMessage: 'Design mockups are ready for review',
    lastMessageTime: new Date(Date.now() - 172800000),
    unreadCount: 1,
    isArchived: false,
    isPinned: false,
    members: ['Jane', 'Bob'],
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'user1',
    senderName: 'You',
    content: 'Hi! How are you doing?',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
  },
  {
    id: '2',
    senderId: 'user2',
    senderName: 'John Doe',
    content: 'Hey! I\'m good, thanks for asking! How about you?',
    timestamp: new Date(Date.now() - 3400000),
    status: 'read',
  },
  {
    id: '3',
    senderId: 'user1',
    senderName: 'You',
    content: 'All good here! Ready for tomorrow\'s meeting?',
    timestamp: new Date(Date.now() - 3200000),
    status: 'read',
  },
  {
    id: '4',
    senderId: 'user2',
    senderName: 'John Doe',
    content: 'Yes, I\'ve prepared the presentation. See you tomorrow!',
    timestamp: new Date(Date.now() - 3100000),
    status: 'delivered',
  },
  {
    id: '5',
    senderId: 'user1',
    senderName: 'You',
    content: 'Perfect! See you tomorrow!',
    timestamp: new Date(Date.now() - 3000000),
    status: 'sent',
  },
];

function ChatListItem({ chat, isSelected, onClick }: { chat: Chat; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-colors ${
        isSelected ? 'bg-purple-100 dark:bg-purple-900/30' : 'hover:bg-accent'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium truncate">{chat.name}</p>
            {chat.isPinned && <Pin className="w-4 h-4 text-amber-500 flex-shrink-0" />}
          </div>
          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
        </div>
        {chat.unreadCount > 0 && (
          <Badge className="ml-2 flex-shrink-0">{chat.unreadCount}</Badge>
        )}
      </div>
    </button>
  );
}

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'bg-purple-600 text-white' : 'bg-muted'} rounded-lg p-3`}>
        {!isOwn && <p className="text-xs font-semibold mb-1">{message.senderName}</p>}
        <p className="text-sm break-words">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-1">
            {message.attachments.map((att) => (
              <a
                key={att.url}
                href={att.url}
                className="block text-xs underline hover:opacity-80"
              >
                📎 {att.name}
              </a>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-2 mt-2 text-xs opacity-70">
          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {isOwn && (
            <>
              {message.status === 'sent' && <Check className="w-4 h-4" />}
              {message.status === 'delivered' && <CheckCheck className="w-4 h-4" />}
              {message.status === 'read' && <CheckCheck className="w-4 h-4 text-blue-400" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MessagingChat({ chat }: { chat: Chat }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: String(messages.length + 1),
      senderId: 'user1',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate delivery and read status
    setTimeout(() => {
      setMessages((msgs) =>
        msgs.map((m) =>
          m.id === message.id ? { ...m, status: 'delivered' as const } : m
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((msgs) =>
        msgs.map((m) =>
          m.id === message.id ? { ...m, status: 'read' as const } : m
        )
      );
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
          <div>
            <p className="font-semibold">{chat.name}</p>
            <p className="text-xs text-muted-foreground">
              {chat.type === 'group' ? `${chat.members?.length || 0} members` : 'Active now'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Phone className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'user1'}
          />
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            {chat.type === 'private' ? `${(chat as any).name} is typing...` : 'Someone is typing...'}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4 space-y-3">
        <div className="flex items-end gap-2">
          <Button size="icon" variant="ghost">
            <Paperclip className="w-5 h-5" />
          </Button>
          <textarea
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (!isTyping && e.target.value) setIsTyping(true);
            }}
            onBlur={() => setIsTyping(false)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message... (Shift+Enter for new line)"
            className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-h-24"
            rows={1}
          />
          <Button size="icon" variant="ghost">
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePin = (chatId: string) => {
    setChats(chats.map((c) =>
      c.id === chatId ? { ...c, isPinned: !c.isPinned } : c
    ));
  };

  const toggleArchive = (chatId: string) => {
    setChats(chats.map((c) =>
      c.id === chatId ? { ...c, isArchived: !c.isArchived } : c
    ));
  };

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
    return (b.lastMessageTime?.getTime() || 0) - (a.lastMessageTime?.getTime() || 0);
  });

  const pinnedChats = sortedChats.filter((c) => c.isPinned && !c.isArchived);
  const otherChats = sortedChats.filter((c) => !c.isPinned && !c.isArchived);

  return (
    <PortalLayout navItems={[]} portalName="Messaging">
      <div className="h-screen flex gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Messages</h2>
              <Button size="icon" variant="ghost">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {pinnedChats.length > 0 && (
              <>
                <p className="text-xs font-semibold text-muted-foreground px-2 py-2">PINNED</p>
                {pinnedChats.map((chat) => (
                  <div key={chat.id} className="group relative">
                    <ChatListItem
                      chat={chat}
                      isSelected={selectedChat?.id === chat.id}
                      onClick={() => setSelectedChat(chat)}
                    />
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleArchive(chat.id)}
                        className="h-8 w-8"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {otherChats.length > 0 && (
              <>
                <p className="text-xs font-semibold text-muted-foreground px-2 py-2">CHATS</p>
                {otherChats.map((chat) => (
                  <div key={chat.id} className="group relative">
                    <ChatListItem
                      chat={chat}
                      isSelected={selectedChat?.id === chat.id}
                      onClick={() => setSelectedChat(chat)}
                    />
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => togglePin(chat.id)}
                        className="h-8 w-8"
                      >
                        <Pin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat ? (
          <div className="hidden md:flex flex-1 flex-col">
            <MessagingChat chat={selectedChat} />
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
