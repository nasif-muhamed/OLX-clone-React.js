
// FirebaseContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth' // npm installed firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import { getAuth, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";


const envfile = process.env
const firebaseConfig = {
    apiKey: envfile.REACT_APP_FIRBASE_API_KEY,
    authDomain: envfile.REACT_APP_AUTHDOMAIN,
    projectId: envfile.REACT_APP_PROJECTID,
    storageBucket: envfile.REACT_APP_STORAGEBUCKET,
    messagingSenderId: envfile.REACT_APP_MESSAGINGSENDERID,
    appId: envfile.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();


export const FirebaseContext = createContext()

export function FirebaseProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); // add loading state
    console.log('inside firebaseprov:', user)

    function googleSignIn() {
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                // Add user to Firestore if they’re signing in for the first time
                return setDoc(doc(db, "users", user.uid), {
                    id: user.uid,
                    username: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber || ""
                }, { merge: true });
            })
            .catch((error) => {
                console.error("Error during Google sign-in:", error);
                throw error;
            });
    }

    function signUp(email, password, phone, username) {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // Use Promise.all to run both operations concurrently
            return Promise.all([
                updateProfile(userCredential.user, { displayName: username }),
                setDoc(doc(db, 'users', userCredential.user.uid), {
                    id: userCredential.user.uid,
                    username: username,
                    phone: phone
                })
            ]);
        })
        .then(() => {
            console.log('User signed up and profile updated successfully');
        })
        .catch(error => {
            console.error('Error during sign up:', error);
            throw error
        });
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log('inside onAuthStateChanged:', currentUser)
        });

        return () => {
            unSubscribe();
        }
    })


    return (
        <FirebaseContext.Provider value={{ signUp, logIn, googleSignIn, logOut, user, loading  }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    return useContext(FirebaseContext);
};

export const storeProduct = async (userId, title, category, description, price, location, phone) => {
    console.log(userId, title, category, description, price, location, phone)
    await addDoc(collection(db, 'products'), {
        userId: userId,
        title: title,
        category: category,
        description: description,
        price: parseFloat(price),
        location: location,
        phone: phone,
        createdAt: new Date(),
    })
}

export const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot
}

export const fetchProduct = async (productId) => {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    let productObject = {};
    let seller = ''
    if (docSnap.exists()){
        productObject = docSnap.data()
        const userRef = doc(db, 'users', productObject.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()){
            seller = userSnap.data().username
        }
    }
     
    return [productObject, seller]
  };
