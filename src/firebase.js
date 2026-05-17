import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAllppLpvPsgSfV72KONEn_t1NCoowd6xo",
  authDomain: "ifix-computers-a2ede.firebaseapp.com",
  projectId: "ifix-computers-a2ede",
  storageBucket: "ifix-computers-a2ede.firebasestorage.app",
  messagingSenderId: "1059142863613",
  appId: "1:1059142863613:web:3e28f6e99ac70663400c94"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)