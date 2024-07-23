import React from 'react';
import firebaseApp, { db } from './config';
import { query, collection } from "firebase/firestore";

export const addDocument = (collectionString, data) => {
  // const query = db.collection(collection);
  const queryData = query(collection(db, collectionString));

  queryData.add({
    ...data,
    createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
  });
};

// Crate keyword for displayname, using fo search.
export const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createkeywords = (name) => {
    const arrName = [];
    let curName = '';

    name.split().forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });

    return arrName;
  }

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0); // goi ham de quy

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createkeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
}