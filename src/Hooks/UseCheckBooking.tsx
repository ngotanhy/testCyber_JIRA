import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/configStore";
import { getBookingApi } from "../redux/Reducers/bookingRoomReducer";
import { useAppSelector } from "./HooksRedux";

export default function UseCheckBooking() {
<<<<<<< HEAD
  const dispatch = useDispatch<AppDispatch>();
  const { roombookingList } = useAppSelector((state) => state.bookingReducer);
  const [isExit, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getBookingApi());
  },[]);

  const handleCheckBooKing = (idRoom: number, checkIn: any, checkOut: any) => {
    const result = roombookingList.find((item) => {
      return (
        item.maPhong === idRoom &&
        item.ngayDen === checkIn &&
        item.ngayDi === checkOut
      );
    });
    let check= true;
    if (result) {
      check = false;
    } 
    return setIsValid(check)
  };

  return [isExit, handleCheckBooKing];
}
=======
    const dispatch = useDispatch<AppDispatch>();
    const timeRef:any = React.useRef()
      const { roombookingList } = useSelector((state: RootState)=>state.bookingReducer)
      const [isExit,setIsValid] = useState(true)
  
      useEffect(()=>{
          dispatch(getBookingApi())
      },[])
    const handleCheckBooKing = (e: any)=>{
        // const timeRef.current: number; 
       clearTimeout(timeRef.current)
       timeRef.current = setTimeout(()=>{
         const result = roombookingList.find((item)=>{
           return e.target.value === item.ngayDi && e.target.value === item.ngayDen && e.target.value === item.id
          })
          if(result){
               setIsValid(false) 
          }else {
              setIsValid(true)
          }
      },300)
    }
    return {
      isExit,
      handleCheckBooKing
    }
  }
  
>>>>>>> Text-Merge
