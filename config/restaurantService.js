import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebaseconfig.js";

/**
 * Fetch all restaurants from Firebase
 */
export const fetchAllRestaurants = async () => {
  try {
    const restaurantsRef = collection(db, "restaurants");
    const snapshot = await getDocs(restaurantsRef);
    
    if (snapshot.empty) {
      console.log("⚠️ No restaurants found in database");
      return [];
    }
    
    const restaurants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Fetched ${restaurants.length} restaurants from Firebase`);
    return restaurants;
    
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error.message);
    throw error;
  }
};

/**
 * Fetch a single restaurant by ID
 */
export const fetchRestaurantById = async (restaurantId) => {
  try {
    const docRef = doc(db, "restaurants", restaurantId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("⚠️ Restaurant not found");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching restaurant:", error.message);
    throw error;
  }
};

/**
 * Search restaurants by name
 */
export const searchRestaurants = async (searchTerm) => {
  try {
    const restaurantsRef = collection(db, "restaurants");
    const snapshot = await getDocs(restaurantsRef);
    
    const restaurants = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return restaurants;
  } catch (error) {
    console.error("❌ Error searching restaurants:", error.message);
    throw error;
  }
};
