// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDF1V5y-0p5s4PSRHeU2M9THM8jEunErI",
  authDomain: "ecommerce-dress.firebaseapp.com",
  projectId: "ecommerce-dress",
  storageBucket: "ecommerce-dress.appspot.com",
  messagingSenderId: "965146305847",
  appId: "1:965146305847:web:d4a4d9742b4ecbb96766b2",
  measurementId: "G-ZWDJNTE4LJ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Storage
const storage = getStorage(app)

export { storage, app }
