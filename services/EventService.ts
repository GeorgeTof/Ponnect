import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';

export interface Event {
  id: string;
  admin: string;
  location: string;
  nrMembers: number;
  members: string[];
  time: string; 
  date: string; 
}

const EVENT_COLLECTION = 'events';

const EventService = {
  // Get all events
  get: async (): Promise<Event[]> => {
    const querySnapshot = await getDocs(collection(db, EVENT_COLLECTION));
    const events: Event[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as Omit<Event, 'id'>;
      events.push({ ...data, id: docSnap.id });
    });
    return events;
  },

  // Get an event by ID
  getById: async (id: string): Promise<Event | undefined> => {
    const documentSnapshot = await getDoc(doc(db, EVENT_COLLECTION, id));
    if (documentSnapshot.exists()) {
      return { id: documentSnapshot.id, ...documentSnapshot.data() } as Event;
    }
    return undefined;
  },

  // Insert a new event
  insert: async (event: Omit<Event, 'id'>): Promise<Event> => {
    const docRef = await addDoc(collection(db, EVENT_COLLECTION), event);
    return { id: docRef.id, ...event } as Event;
  },

  // Update an existing event
  update: async (id: string, event: Partial<Omit<Event, 'id'>>) => {
    const docRef = doc(db, EVENT_COLLECTION, id);
    await updateDoc(docRef, event);
  },

  // Delete an event
  delete: async (id: string) => {
    const docRef = doc(db, EVENT_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

export default EventService;
