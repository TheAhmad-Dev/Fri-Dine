import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { slots } from "../store/restaurants";
import { db } from "./firebaseconfig";

const uploadSlotsOnce = async () => {
  try {
    const flagRef = doc(db, "system", "slotsUploaded");
    const flagSnap = await getDoc(flagRef);

    if (flagSnap.exists()) {
      console.log("🚫 Slots already uploaded");
      return;
    }

    console.log("📤 Uploading slots...");

    const ref = collection(db, "slots");

    for (let i = 0; i < slots.length; i++) {
      await setDoc(doc(ref, `slot_${i + 1}`), {
        ...slots[i],
        slotId: `slot_${i + 1}`,
        createdAt: new Date(),
      });
    }

    await setDoc(flagRef, {
      uploaded: true,
      uploadedAt: new Date(),
    });

    console.log("🎉 Slots upload complete");
  } catch (err) {
    console.error("❌ Slot upload error:", err);
  }
};

export default uploadSlotsOnce;