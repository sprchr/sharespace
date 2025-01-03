import { Community } from '../types';

export const exampleCommunities: Community[] = [
  {
    id: '1',
    name: 'Outdoor Enthusiasts',
    description: 'A community for sharing outdoor and camping equipment',
    isPrivate: false,
    createdBy: '1',
    createdAt: new Date(),
    members: ['1']
  },
  {
    id: '2',
    name: 'Urban Gardeners',
    description: 'Share gardening tools and knowledge with fellow plant lovers',
    isPrivate: true,
    createdBy: '1',
    createdAt: new Date(),
    members: ['1']
  }
];