import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, app } from '../../lib/firebase'; // your Firebase config
import { useStore }  from '../store';
import { useEffect } from 'react';



export default function App({ Component, pageProps }: AppProps) {
  const auth = getAuth(app);
  const { resume } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in

        // Check if resume document already exists
        const resumeDocRef = doc(db, 'resumes', user.uid);
        const resumeDocSnapshot = await getDoc(resumeDocRef);

        if (!resumeDocSnapshot.exists()) {
          // Resume document does not exist, create a new one
          await setDoc(resumeDocRef, {
            userId: user.uid,
            content: resume,
            // add other default resume fields here
          });
        }
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, [auth, resume]);  // Empty dependency array ensures this runs once on component mount

  return <Component {...pageProps} />
}
