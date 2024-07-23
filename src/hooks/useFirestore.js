import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/config';
import { query, collection, orderBy, where, onSnapshot, getDocs } from "firebase/firestore";

function useFirestore(collectionName, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    let queryWhere;

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data.
        setDocuments([]);
        return;
      }

      queryWhere = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createAt')
      );
    } else {
      queryWhere = query(collectionRef, orderBy('createAt'));
    }

    const querySnapshot = getDocs(queryWhere);

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