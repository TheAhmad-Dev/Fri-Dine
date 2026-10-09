import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { carouselImages } from "../store/restaurants.js"; // ✅ Correct
import { db } from "./firebaseconfig.js";

const uploadCarousel = async () => {
  try {
    const carouselRef = collection(db, "carousel");
    const snapshot = await getDocs(carouselRef);

    if (!snapshot.empty) {
      console.log("⚠️ Carousel already exists");
      return;
    }

    console.log("📤 Uploading carousel images...");

    for (let i = 0; i < carouselImages.length; i++) {
      const docRef = doc(carouselRef, `carousel_${i + 1}`);

      await setDoc(docRef, {
        ...carouselImages[i],
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Carousel uploaded:", i + 1);
    }
  } catch (error) {
    console.log("❌ Carousel upload error:", error);
  }
};

export default uploadCarousel;
