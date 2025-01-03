import React from 'react';
import { ItemCard } from '../components/ItemCard';
import { CommunityCard } from '../components/CommunityCard';
import { exampleItems } from '../data/exampleItems';
import { exampleCommunities } from '../data/exampleCommunities';

export function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exampleCommunities.map(community => (
            <CommunityCard
              key={community.id}
              community={community}
              onJoin={() => console.log('Join community:', community.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onShare={() => console.log('Share item:', item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}