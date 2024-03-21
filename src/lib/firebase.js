import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBZy91rYuOLkWJwFdHX4Nem2_1o-f6Ve64",
    authDomain: "brambles02.firebaseapp.com",
    projectId: "brambles02",
    storageBucket: "brambles02.appspot.com",
    messagingSenderId: "112306892703",
    appId: "1:112306892703:web:6648cc4448aff70f2e17aa",
    measurementId: "G-Z5TGNYTGJW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }