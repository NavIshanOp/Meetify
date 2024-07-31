export const config = {
    logoCount: 5,
    firebaseConfig: {
        apiKey: "AIzaSyCJPxL7iWjAyEKPmzSTY-jEvEkRYO6YwW4",
        authDomain: "meetify-ceeb1.firebaseapp.com",
        projectId: "meetify-ceeb1",
        storageBucket: "meetify-ceeb1.appspot.com",
        messagingSenderId: "202635270484",
        appId: "1:202635270484:web:03e561bea73e483eb010c1"
        },
    servers: {
        iceServers: [
            {
            urls: ['stun:stun1.l.google.com:19302',
                   'stun:stun2.l.google.com:19302'],
            },
        ],
        iceCandidatePoolSize: 10,
    },
    DEV: "development" === 'development',
}

