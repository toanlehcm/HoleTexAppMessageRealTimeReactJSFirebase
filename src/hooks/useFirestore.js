import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/config';
import { query, collection, orderBy, where, onSnapshot } from "firebase/firestore";

function useFirestore(collectionString, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(db, collectionString), orderBy('createAt'));

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data.
        setDocuments([]);
        return;
      }

      // collectionRef = collectionRef.where(
      //   condition.fieldName,
      //   condition.operator,
      //   condition.compareValue
      // );

      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    // const unsubscribe = collectionRef.onSnapshot((snapshot) => {
    //   const documnets = snapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id
    //   }));

    //   setDocuments(documnets);
    // });

    // Set up the listener
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionString, condition])

  return documents;
}

export default useFirestore;