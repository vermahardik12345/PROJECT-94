import firebase from 'firebase'
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDXQ9YfTCMvpwTiWTQBIutQM2Cpl4lnuKc",
    authDomain: "book-santa-71f87.firebaseapp.com",
    projectId: "book-santa-71f87",
    storageBucket: "book-santa-71f87.appspot.com",
    messagingSenderId: "261766815706",
    appId: "1:261766815706:web:aba493d90e232ad3bf6ae3"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
