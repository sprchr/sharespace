import React, { useState, useMemo } from 'react';
import { CommunityCard } from '../components/CommunityCard';
import { SearchBar } from '../components/SearchBar';
import { exampleCommunities } from '../data/exampleCommunities';

export function Communities() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = useMemo(() => {
    return exampleCommunities.filter(community => 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Communities</h2>
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search communities by name or description..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommunities.map(community => (
          <CommunityCard
            key={community.id}
            community={community}
            onJoin={() => console.log('Join community:', community.id)}
          />
        ))}
      </div>

      {filteredCommunities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No communities found matching your search.</p>
        </div>
      )}
    </div>
  );
}