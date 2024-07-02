import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';


const app = firebase.initializeApp({
  apiKey: "AIzaSyBAnraXy2rg-nkqKDzHvMt567ebxkYDpo4",
  authDomain: "auctioneer-67d42.firebaseapp.com",
  projectId: "auctioneer-67d42",
  storageBucket: "auctioneer-67d42.appspot.com",
  messagingSenderId: "708166117192",
  appId: "1:708166117192:web:4c615ec7dff617fe1d357d"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();