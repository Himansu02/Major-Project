
import { initializeApp } from "firebase/app";
import {getDatabase,set,ref,get,child} from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzF5_QEoT0V-9ywrearESi7z3pJt-zEEY",
  authDomain: "moisture-app-4116c.firebaseapp.com",
  projectId: "moisture-app-4116c",
  storageBucket: "moisture-app-4116c.appspot.com",
  messagingSenderId: "529552805027",
  appId: "1:529552805027:web:a7ad0606e64b5aad3e8316"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db=getDatabase()
const dbRef=ref(db)

export const saveToken = async (userId,token)=>{
    const values=(await get(child(dbRef, `userToken/${userId}/`))).val();
    const payload={...values,token};
    set(ref(db,`userToken/${userId}/`),payload)
}