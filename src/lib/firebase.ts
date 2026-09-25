import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0529346104",
  appId: "1:60515091269:web:01b1545b6c0a3c778ab42c",
  apiKey: "AIzaSyCgYJNppITISE3Db6pwaIPrOcehZ6o74_s",
  authDomain: "gen-lang-client-0529346104.firebaseapp.com",
  // Note: the original config didn't have a regular databaseURL, but we can pass firestoreDatabaseId if needed
  // by initializing firestore specifically.
  // Actually, standard firebase JS SDK will pick up default database.
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
// We pass the explicit databaseId from config if needed, otherwise default.
export const db = getFirestore(app, "ai-studio-sutafricaspiritu-4c65ed42-ad01-4f3c-b092-4a5a8bd3ac14");
