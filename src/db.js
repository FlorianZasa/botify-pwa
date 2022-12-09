import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANxIKzjNVJ-sZKYZ6VxLpMifuZ4tpA6Xw",
  authDomain: "robat-1c1a8.firebaseapp.com",
  databaseURL: "https://robat-1c1a8.firebaseio.com",
  projectId: "robat-1c1a8",
  storageBucket: "robat-1c1a8.appspot.com",
  messagingSenderId: "343068274490",
  appId: "1:343068274490:web:3756bfea112481a587ea03",
  measurementId: "G-R065CS48NG"
};


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();