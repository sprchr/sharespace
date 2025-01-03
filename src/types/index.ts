import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: Date | Timestamp;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date | Timestamp;
  members: string[];
}

export interface Item {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  pricePerDay: number | null;
  isFree: boolean;
  ownerId: string;
  communityId: string;
  status: 'available' | 'borrowed';
  createdAt: Date | Timestamp;
}

export interface ItemRequest {
  id: string;
  itemId: string;
  requesterId: string;
  startDate: Date | Timestamp;
  endDate: Date | Timestamp;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date | Timestamp;
}