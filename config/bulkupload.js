import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { restaurants } from "../store/restaurants.js";
import { db } from "./firebaseconfig.js";

const restaurantData = restaurants;

/**
 * Upload restaurant data to Firebase Firestore
 * Only uploads if collection is empty to prevent duplicates
 */
const uploaddata = async () => {
  try {
    // Check if data already exists
    const restaurantsRef = collection(db, "restaurants");
    const snapshot = await getDocs(restaurantsRef);


    
    // Har bar isko comment kr k upload krna hai 
    if (!snapshot.empty) {
      console.log("⚠️ Data already exists in Firebase. Skipping upload.");
      console.log(`Found ${snapshot.size} restaurants in database.`);
      return { success: true, message: "Data already exists", count: snapshot.size };
    }

    console.log("📤 Starting data upload to Firebase...");
    
    // Upload each restaurant
    for (let i = 0; i < restaurantData.length; i++) {
      const restaurant = restaurantData[i];
      const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await setDoc(docRef, {
        ...restaurant,
        createdAt: new Date().toISOString(),
        restaurantId: `restaurant_${i + 1}`
      });
      
      console.log(`✅ Uploaded: ${restaurant.name} (${docRef.id})`);
    }
    
    console.log(`🎉 Successfully uploaded ${restaurantData.length} restaurants!`);
    return { success: true, message: "Upload successful", count: restaurantData.length };
    
  } catch (error) {
    console.error("❌ Error uploading data:", error.message);
    return { success: false, message: error.message };
  }
};

export default uploaddata;
