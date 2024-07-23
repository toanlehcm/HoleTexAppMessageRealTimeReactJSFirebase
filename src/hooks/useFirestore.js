import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/config';
import { query, collection, orderBy, where, onSnapshot, getDocs } from "firebase/firestore";

function useFirestore(collectionName, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(
      collection(db, collectionName),
      orderBy('createdAt')
    );

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data.
        setDocuments([]);
        return;
      }

      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
      );
    }

    // Set up the listener
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionName, condition])

  return documents;
}

export default useFirestore;