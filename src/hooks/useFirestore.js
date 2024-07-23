import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/config';
import { query, collection, orderBy, where, onSnapshot } from "firebase/firestore";

function useFirestore(collectionName, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(db, collectionName), orderBy('createAt'));

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data.
        setDocuments([]);
        return;
      }

      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    // Set up the listener
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log('snapshot', snapshot);
      // console.log('snapshot.docs', snapshot.docs);
      // console.log('documents', documents);

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionName, condition])

  return documents;
}

export default useFirestore;