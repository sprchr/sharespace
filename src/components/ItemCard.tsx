import React from 'react';
import { Calendar, DollarSign, Share2 } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onShare?: () => void;
}

export function ItemCard({ item, onShare }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {item.isFree ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              <div className="flex items-center text-blue-600">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>{item.pricePerDay}/day</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-sm ${
            item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {item.status}
          </span>
          
          {onShare && (
            <button
              onClick={onShare}
              className="text-gray-600 hover:text-gray-900"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}