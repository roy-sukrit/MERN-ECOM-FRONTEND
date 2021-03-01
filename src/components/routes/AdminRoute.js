import React,{useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import {currentAdmin} from '../../functions/auth'

const AdminRoute = ({children,...rest}) => {
  const {user} =useSelector((state)=>({...state}))
  const[ok,setOk] = useState(false);

  useEffect(() => {
      if(user && user.token){
       currentAdmin(user.token)
       .then(res=>{
           console.log("CURRENT ADMIN",res)
           setOk(true);
    
    })
       .catch(err=>{
           console.log("ERROR ADMIN",err)
           setOk(false);
       })
      }
     
  }, [user])

  //^empty obj can also give value sp && , animation(loading)
  return ok ? 
  <Route {...rest} />
  : 
  <h1 className="text-danger">
  <LoadingToRedirect/>
  </h1>
  
 }
export default AdminRoute;