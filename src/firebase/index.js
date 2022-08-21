import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDkLmEW1K7bvsLGfGkIGV5SIxJKtcNRR-c",
    authDomain: "reactblog451.firebaseapp.com",
    databaseURL: "https://reactblog451-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactblog451",
    storageBucket: "gs://reactblog451.appspot.com/",
    messagingSenderId: "687026256178",
    appId: "1:687026256178:web:38ff57f025e5f492ba7f2b",
    measurementId: "G-HHJMGGV6SF"
  };

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);