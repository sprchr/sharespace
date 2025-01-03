import React, { useState, useMemo } from 'react';
import { ItemCard } from '../components/ItemCard';
import { SearchBar } from '../components/SearchBar';
import { exampleItems } from '../data/exampleItems';

export function Items() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return exampleItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div>
      <div className="flex flex-col space-y-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Items</h2>
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search items by name or description..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onShare={() => console.log('Share item:', item.id)}
          />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
}