const firebaseConfig = {
    apiKey: "AIzaSyDQ_Ee9_x4qHCjdVj1WEcj3nCinrvtjmT4",
    authDomain: "todo-app-b9d5b.firebaseapp.com",
    projectId: "todo-app-b9d5b",
    storageBucket: "todo-app-b9d5b.appspot.com",
    messagingSenderId: "894433725562",
    appId: "1:894433725562:web:b6a57985a464a95e0abfc3",
    measurementId: "G-97NREZ77C2"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();