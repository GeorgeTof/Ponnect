import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';

export interface User {
  id: string; 
  age?: number;
  nickname?: string;
  specialization?: string;
  university?: string;
}

const USER_COLLECTION = 'users';

const UserService = {
  // Get all users
  get: async (): Promise<User[]> => {
    const querySnapshot = await getDocs(collection(db, USER_COLLECTION));

    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as User; 
      users.push({ ...data }); 
    });

    return users;
  },

  // Get a user by ID
  getById: async (id: string): Promise<User | undefined> => {
    const documentSnapshot = await getDoc(doc(db, USER_COLLECTION, id));
    if (documentSnapshot.exists()) {
      return { id: documentSnapshot.id, ...documentSnapshot.data() } as User;
    }
    return undefined;
  },

  // Insert a new user
  insert: async (user: Omit<User, 'id'>): Promise<User> => { 
    const docRef = await addDoc(collection(db, USER_COLLECTION), user);
    return { id: docRef.id, ...user } as User; 
  },

  // Update an existing user
  update: async (id: string, user: Partial<Omit<User, 'id'>>) => { 
    const docRef = doc(db, USER_COLLECTION, id);
    await updateDoc(docRef, user);
  },

  // Delete a user
  delete: async (id: string) => {
    const docRef = doc(db, USER_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

export default UserService;