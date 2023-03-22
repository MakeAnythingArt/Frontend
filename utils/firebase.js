import { initializeApp } from 'firebase/app';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCbyR5n2H8C1Mzt5Zcl5gV1Qj5nGUe5h34',
  authDomain: 'make-anything-art.firebaseapp.com',
  projectId: 'make-anything-art',
  storageBucket: 'make-anything-art.appspot.com',
  messagingSenderId: '139115334154',
  appId: '1:139115334154:web:bc2576f6955d4df09f6df3',
  measurementId: 'G-R95TH50WT2',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('user_birthday');
facebookProvider.setCustomParameters({
  display: 'popup',
});

const signInWithGoogle = async (callback) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    callback(user.accessToken, null);
  } catch (err) {
    callback(null, err.message);
  }
};

const signInWithFacebook = async (callback) => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    callback(user.accessToken, null);
  } catch (err) {
    callback(null, err.message);
  }
};

export { signInWithGoogle, signInWithFacebook };
