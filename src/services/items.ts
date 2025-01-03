import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Item } from '../types';

export async function getItems(communityId: string) {
  const itemsRef = collection(db, 'items');
  const q = query(
    itemsRef,
    where('communityId', '==', communityId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
}

export async function createItem(data: Omit<Item, 'id' | 'createdAt'>) {
  const itemsRef = collection(db, 'items');
  const docRef = await addDoc(itemsRef, {
    ...data,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}