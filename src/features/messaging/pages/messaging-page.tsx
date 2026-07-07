'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Plus, Settings, Search, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { messagingService } from '../services/messaging-service';
import type { Chat, Message } from '../types';

export default function MessagingPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);
      const loadedChats = await messagingService.getChats();
      setChats(loadedChats);
      if (loadedChats.length > 0) {
        await selectChat(loadedChats[0]);
      }
    } catch (error) {
      console.error('[v0] Failed to load chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectChat = async (chat: Chat) => {
    try {
      setSelectedChat(chat);
      const loadedMessages = await messagingService.getMessages(chat.id);
      setMessages(loadedMessages);
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error('[v0] Failed to load messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    try {
      const newMessage = await messagingService.sendMessage(selectedChat.id, messageInput);
      setMessages([...messages, newMessage]);
      setMessageInput('');
      scrollToBottom();
    } catch (error) {
      console.error('[v0] Failed to send message:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Chats List */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Messages</h2>
            <Button variant="ghost" size="icon" icon={<Plus className="size-4" />} />
          </div>
          <Input placeholder="Search messages..." icon={<Search className="size-4" />} />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={`p-4 border-b border-border cursor-pointer transition-colors ${
                selectedChat?.id === chat.id ? 'bg-accent' : 'hover:bg-muted'
              }`}
            >
              <div className="flex items-start gap-3">
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium truncate">{chat.name}</p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage?.content || 'No messages yet'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{selectedChat.name}</p>
                <p className="text-sm text-muted-foreground">{selectedChat.members.length} members</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" icon={<Phone className="size-4" />} title="Voice call" />
              <Button variant="ghost" size="icon" icon={<Video className="size-4" />} title="Video call" />
              <Button variant="ghost" size="icon" icon={<Settings className="size-4" />} title="Chat settings" />
              <Button variant="ghost" size="icon" icon={<MoreVertical className="size-4" />} title="More options" />
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === messagingService.getCurrentUser().id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender.id === messagingService.getCurrentUser().id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.status && (
                      <p className="text-xs opacity-50 mt-0.5">
                        {message.status === 'seen' && '✓✓'}
                        {message.status === 'delivered' && '✓'}
                        {message.status === 'sent' && '○'}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex gap-2 items-center">
              <Button variant="ghost" size="icon" icon={<Paperclip className="size-4" />} title="Attach file" />
              <Button variant="ghost" size="icon" icon={<Smile className="size-4" />} title="Add emoji" />
            </div>
            <div className="flex gap-2">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 resize-none p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />
              <Button
                variant="primary"
                size="icon"
                icon={<Send className="size-4" />}
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                title="Send message"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}
