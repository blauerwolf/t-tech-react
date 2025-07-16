// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDoc,
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password) {
  return new Promise((res, rej) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        res(user);
        // ...
      })
      .catch((error) => {
        console.error(error.code, error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        rej(error);
        // ..
      });
  });
}

auth.useDeviceLanguage();
export function logearG() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("test", result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      console.log("test error", error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function loginEmailPass(email, password) {
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        res(user);
      })
      .catch((error) => {
        console.error(error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        rej(error);
      });
  });
}


export async function crearProducto(name, image, price, description, category, rating) {
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      name,
      image,
      price,
      description,
      category,
      rating
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef; // devolvemos directamente el docRef
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // lanzamos el error para que quien llame a la función pueda manejarlo
  }
}


export async function obtenerProductos() {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
}

// Versión con paginación
export async function fetchProductos({ pageSize = 10, lastDoc = null }) {
  try {
    let q = query(
      collection(db, "productos"),
      orderBy("name"),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(
        collection(db, "productos"),
        orderBy("name"),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(q);

    const productos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
    console.log(productos);

    return { productos, lastDoc: newLastDoc };
  } catch (error) {
    console.error("Error al obtener productos paginados:", error);
    throw error;
  }
}


export async function obtenerProductoPorId(id) {
  try {
    const docRef = doc(db, "productos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("El producto no existe");
    }
  } catch (error) {
    console.error("Error al obtener el producto por id:", error);
    throw error;
  }
}

export async function obtenerCantidadProductos() {
  try {
    const snapshot = await getCountFromServer(collection(db, 'productos'));
    return snapshot.data().count;  // devuelve el número total
  } catch (error) {
    console.error('Error al contar productos:', error);
    throw error;
  }
}

export async function actualizarProducto(id, data) {
  try {
    const productRef = doc(db, "productos", id);
    await updateDoc(productRef, data);
    return true; // devolvemos true para indicar éxito (opcional)
  } catch (err) {
    console.error("Error al actualizar el producto: ", err);
    throw err;
  }
}

export async function eliminarProducto(id) {
  try {
    await deleteDoc(doc(db, "productos", id));
    return id;  // devolvemos el id eliminado
  } catch (err) {
    console.error("Error al eliminar el producto: ", err);
    throw err;  // lanzamos el error para manejarlo fuera
  }
}


export { auth, db };