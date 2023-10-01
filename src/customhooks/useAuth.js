import React, { useEffect, useState } from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../firebase/Firebase"
const useAuth = () => {
    const [currentuser,setcurrentuser]=useState({})

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setcurrentuser(user)
            }else{
                setcurrentuser(null)
            }
        })
    },[])
  return {
    currentuser
  }
}

export default useAuth
