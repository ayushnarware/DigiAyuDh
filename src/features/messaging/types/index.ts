export type MessageStatus = 'sent' | 'delivered' | 'seen';
export type ChatType = 'private' | 'group' | 'department' | 'project' | 'team' | 'channel';
export type FileType = 'image' | 'video' | 'pdf' | 'document' | 'audio' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  chatId: string;
  sender: User;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  editedAt?: Date;
  reactions?: MessageReaction[];
  replies?: Message[];
  attachments?: MessageAttachment[];
  mentions?: string[];
  isForwarded?: boolean;
  originalMessage?: Message;
  isPinned?: boolean;
}

export interface MessageReaction {
  emoji: string;
  users: User[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  type: FileType;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
}

export interface Chat {
  id: string;
  type: ChatType;
  name: string;
  avatar?: string;
  description?: string;
  members: User[];
  createdBy: User;
  createdAt: Date;
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  settings?: ChatSettings;
}

export interface ChatSettings {
  muteNotifications: boolean;
  muteUntil?: Date;
  autoArchiveAfterInactive?: boolean;
  defaultNotificationLevel: 'all' | 'mentions' | 'none';
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  members: User[];
  createdBy: User;
  createdAt: Date;
  icon?: string;
  isFavorite: boolean;
}

export interface DirectMessage {
  id: string;
  participants: User[];
  messages: Message[];
  createdAt: Date;
  isArchived: boolean;
}

export interface VoiceCall {
  id: string;
  initiator: User;
  participants: User[];
  startedAt: Date;
  duration?: number;
  status: 'ringing' | 'active' | 'ended';
  recordingUrl?: string;
}

export interface VideoCall extends VoiceCall {
  screenShareActive: boolean;
  screenShareUser?: User;
}

export interface TypingIndicator {
  userId: string;
  chatId: string;
  timestamp: Date;
}

export interface UnreadMessage {
  chatId: string;
  count: number;
  lastMessage: Message;
}
