import { Item } from '../types';

export const exampleItems: Item[] = [
  {
    id: '1',
    title: 'Mountain Bike',
    description: 'Professional mountain bike, perfect for weekend adventures',
    imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 15,
    isFree: false,
    ownerId: '1',
    communityId: '1',
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Camping Tent',
    description: '4-person tent, waterproof and easy to set up',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
    pricePerDay: null,
    isFree: true,
    ownerId: '1',
    communityId: '1',
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Professional Camera',
    description: 'Sony A7III with 24-70mm lens, perfect for photography enthusiasts',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 25,
    isFree: false,
    ownerId: '1',
    communityId: '2',
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Garden Tools Set',
    description: 'Complete set including spade, fork, and pruning shears',
    imageUrl: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3aa?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 8,
    isFree: false,
    ownerId: '1',
    communityId: '2',
    status: 'borrowed',
    createdAt: new Date()
  },
  {
    id: '5',
    title: 'Portable Generator',
    description: 'Quiet 2000W inverter generator, great for camping or backup power',
    imageUrl: 'https://images.unsplash.com/photo-1518631031670-66edaa0d4c6f?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 30,
    isFree: false,
    ownerId: '1',
    communityId: '1',
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '6',
    title: 'Board Games Collection',
    description: 'Collection of popular board games including Catan, Ticket to Ride, and Pandemic',
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800',
    pricePerDay: null,
    isFree: true,
    ownerId: '1',
    communityId: '2',
    status: 'available',
    createdAt: new Date()
  }
];