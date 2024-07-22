import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/config';

function useFirestore(collection, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createAt');

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data.
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documnets = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));

      setDocuments(documnets);
    });

    return () => unsubscribe();
  }, [collection, condition])

  return documents;
}

export default useFirestore;