import React from 'react';
import { Users, Lock, Unlock } from 'lucide-react';
import { Community } from '../types';

interface CommunityCardProps {
  community: Community;
  onJoin?: () => void;
}

export function CommunityCard({ community, onJoin }: CommunityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold text-gray-900">{community.name}</h3>
            {community.is_private ? (
              <Lock className="w-4 h-4 text-gray-500" />
            ) : (
              <Unlock className="w-4 h-4 text-gray-500" />
            )}
          </div>
          <p className="mt-2 text-gray-600">{community.description}</p>
        </div>
        
        {onJoin && (
          <button
            onClick={onJoin}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Join Community
          </button>
        )}
      </div>
      
      <div className="mt-4 flex items-center text-gray-500 text-sm">
        <Users className="w-4 h-4 mr-2" />
        <span>Private Community</span>
      </div>
    </div>
  );
}