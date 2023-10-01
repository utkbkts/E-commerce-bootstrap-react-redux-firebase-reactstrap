import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/Firebase";

const Usegetdata = (collectionname) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const collectionref = collection(db, collectionname);

  useEffect(() => {
    const getdata = async () => {
      await onSnapshot(collectionref,(snapshot)=>{
        setdata(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
     
    };
    getdata()
  }, []);

  return {data};
};
export default Usegetdata;
