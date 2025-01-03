import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Community } from '../types';

export async function getCommunities(userId: string) {
  const communitiesRef = collection(db, 'communities');
  const q = query(
    communitiesRef,
    where('members', 'array-contains', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Community));
}

export async function createCommunity(data: Omit<Community, 'id' | 'createdAt'>) {
  const communitiesRef = collection(db, 'communities');
  const docRef = await addDoc(communitiesRef, {
    ...data,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}