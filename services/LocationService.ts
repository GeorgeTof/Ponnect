import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';

export interface Location {
  id?: string; // Optional because new documents won't have an ID until created
  name: string;
  description: string;
  type: string;
}

const LOCATION_COLLECTION = 'locations';

const LocationService = {
  // Get all locations
  get: async (): Promise<Location[]> => {
    const querySnapshot = await getDocs(collection(db, LOCATION_COLLECTION));

    const locations: Location[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Location;
      locations.push({ ...data, id: doc.id });
    });

    return locations;
  },

  // Get a location by ID
  getById: async (id: string): Promise<Location | undefined> => {
    const documentSnapshot = await getDoc(doc(db, LOCATION_COLLECTION, id));
    if (documentSnapshot.exists()) {
      return { id: documentSnapshot.id, ...documentSnapshot.data() } as Location;
    }
    return undefined;
  },

  // Insert a new location
  insert: async (location: Location) => {
    const docRef = await addDoc(collection(db, LOCATION_COLLECTION), location);
    return docRef;
  },

  // Update an existing location
  update: async (id: string, location: Partial<Location>) => {
    const docRef = doc(db, LOCATION_COLLECTION, id);
    await updateDoc(docRef, location);
  },

  // Delete a location
  delete: async (id: string) => {
    const docRef = doc(db, LOCATION_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

export default LocationService;
