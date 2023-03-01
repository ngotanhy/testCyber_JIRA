import React, { useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../redux/configStore';
import { getUserApi } from "../redux/Reducers/userReducer";


export default function UseCheckEmail() {
    const dispatch = useDispatch<AppDispatch>();
    const timeRef:any = React.useRef()
      const { arrUser } = useSelector((state: RootState)=>state.userAdminReducer)
      const [isExitEmail,setIsValid] = useState(true)
  
      useEffect(()=>{
          dispatch(getUserApi())
      },[])
    const handleCheckEmail = (e: any)=>{
        // const timeRef.current: number; 
       clearTimeout(timeRef.current)
       timeRef.current = setTimeout(()=>{
         const result = arrUser.find((item)=>{
           return e.target.value === item.email 
          })
          if(result){
               setIsValid(false) 
          }else {
              setIsValid(true)
          }
      },300)
    }
    return {
      isExitEmail,
      handleCheckEmail
    }
  }
  