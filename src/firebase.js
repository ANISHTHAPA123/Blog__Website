
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// const firebaseApp=firebase.initializeApp({
//     apiKey: "AIzaSyD3FpuTh-GvL0gNTsMiOk97vlvd_0UbXRs",
//     authDomain: "instagram-clone-5a301.firebaseapp.com",
//     databaseURL: "https://instagram-clone-5a301-default-rtdb.firebaseio.com",
//     projectId: "instagram-clone-5a301",
//     storageBucket: "instagram-clone-5a301.appspot.com",
//     messagingSenderId: "876868596388",
//     appId: "1:876868596388:web:a555ffd6168a1089c5ec31",
//     measurementId: "G-L1WQ3FKHNK"

// });
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyD3FpuTh-GvL0gNTsMiOk97vlvd_0UbXRs",
    authDomain: "instagram-clone-5a301.firebaseapp.com",
    databaseURL: "https://instagram-clone-5a301-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-5a301",
    storageBucket: "instagram-clone-5a301.appspot.com",
    messagingSenderId: "876868596388",
    appId: "1:876868596388:web:a555ffd6168a1089c5ec31",
    measurementId: "G-L1WQ3FKHNK"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();
export { db,auth,storage};
