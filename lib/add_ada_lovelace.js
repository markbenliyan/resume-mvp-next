import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase.js';

try {
  const docRef = await addDoc(collection(db, 'users'), {
    first: 'Alan',
    middle: 'Mathison',
    last: 'Turing',
    born: 1912,
  });

  console.log('Document written with ID: ', docRef.id);
} catch (e) {
  console.error('Error adding document: ', e);
}
