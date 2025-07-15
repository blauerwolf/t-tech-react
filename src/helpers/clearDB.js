import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearCollection(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map((docSnapshot) =>
    deleteDoc(doc(db, collectionName, docSnapshot.id))
  );

  await Promise.all(deletePromises);
  console.log(`✅ Colección "${collectionName}" borrada.`);
}

clearCollection("productos")
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error al borrar documentos:", err);
    process.exit(1);
  });
