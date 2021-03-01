import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import {createOrUpdateUser} from '../../functions/auth'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user}=useSelector((state)=>({...state}));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation

    if(!email||!password){
        toast.error("Email & Password Required!")
        return;
    }

    if(password.length<6){
        toast.error(" Password Must have at least 6 characters!")
        return;
    }

    
   try{
    const result=await auth.signInWithEmailLink(
        email,
        window.location.href
    )
    console.log("RESULT",result);
    console.log("CHECK",result.user.emailVerified)

    if(result.user.emailVerified){
        //remove email from local
        window.localStorage.removeItem("emailForRegistration")

        //get user token JWT from auth firebase
        let user =auth.currentUser
        console.log("user--->",user)
        
        //user password
        await user.updatePassword(password);
        const idTokenResult=await user.getIdTokenResult()
        console.log("token--->",idTokenResult)
        //redux store


         //^Backend token
      createOrUpdateUser(idTokenResult.token)
      .then(
        (res)=>{
          //^on refresh only id and email persists so server req required app.js
          console.log("res------>",res)
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name:res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role:res.data.role,
              _id:res.data._id,
            },
          });
        
        })      
      .catch(err=>console.log(err))    

        //redirect
        history.push('/')

    }

}
    
    catch(error){
        console.log(error);
        toast.error(error.message);

    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
