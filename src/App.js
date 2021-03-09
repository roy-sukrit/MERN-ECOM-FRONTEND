import React,{useEffect,lazy,Suspense} from "react";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import {auth} from './firebase'
import {useDispatch} from 'react-redux'
import {currentUser} from './functions/auth'
import { Spin, Space } from 'antd';


// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import Header from "./components/nav/Header";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from './pages/auth/ForgotPassword'
// import History from './pages/user/History'
// import CreateCouponPage from './pages/admin/coupon/CreateCoupon'
// import UserRoute from './components/routes/UserRoute'
// import AdminRoute from './components/routes/AdminRoute'
// import CategoryCreate from './pages/admin/category/CategoryCreate'
// import CategoryUpdate from './pages/admin/category/CategoryUpdate'
// import SubCreate from './pages/admin/sub/SubCreate'
// import SubUpdate from './pages/admin/sub/SubUpdate'
// import ProductCreate from './pages/admin/product/ProductCreate'
// import AllProducts from './pages/admin/product/AllProducts'
// import ProductUpdate from './pages/admin/product/ProductUpdate'
// import Product from './pages/Product'
// import Payment from './pages/Payment'
// import Password from './pages/user/Password'
// import Wishlist from './pages/user/Wishlist'
// import SideDrawer from './components/drawer/SideDrawer'
// import Cart from './pages/Cart'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import CategoryHome from './pages/category/CategoryHome'
// import SubHome from './pages/sub/SubHome'
// import Checkout from './pages/Checkout'
// import Shop from './pages/Shop'
<<<<<<< HEAD
// import Chatbot from "react-chatbot-kit";
// import ActionProvider from "./components/chatbot/ActionProvider";
// import MessageParser from "./components/chatbot/MessageParser";
// import config from "./components/chatbot/config";
=======

>>>>>>> be2a0e2a4fe624d9f272b20f04236a857467cacb
//using lazy
const Login = lazy(()=> import( "./pages/auth/Login"));
const Register = lazy(()=> import( "./pages/auth/Register"));
const Home = lazy(()=> import( "./pages/Home"));
const Header = lazy(()=> import( "./components/nav/Header"));
const RegisterComplete = lazy(()=> import( "./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(()=> import( './pages/auth/ForgotPassword'))
const History = lazy(()=> import( './pages/user/History'))
const CreateCouponPage = lazy(()=> import( './pages/admin/coupon/CreateCoupon'))
const UserRoute = lazy(()=> import( './components/routes/UserRoute'))
const AdminRoute = lazy(()=> import( './components/routes/AdminRoute'))
const CategoryCreate = lazy(()=> import( './pages/admin/category/CategoryCreate'))
const CategoryUpdate = lazy(()=> import( './pages/admin/category/CategoryUpdate'))
const SubCreate = lazy(()=> import( './pages/admin/sub/SubCreate'))
const SubUpdate = lazy(()=> import( './pages/admin/sub/SubUpdate'))
const ProductCreate = lazy(()=> import( './pages/admin/product/ProductCreate'))
const AllProducts = lazy(()=> import( './pages/admin/product/AllProducts'))
const ProductUpdate = lazy(()=> import( './pages/admin/product/ProductUpdate'))
const Product = lazy(()=> import( './pages/Product'))
const Payment = lazy(()=> import( './pages/Payment'))
const Password = lazy(()=> import( './pages/user/Password'))
const Wishlist = lazy(()=> import( './pages/user/Wishlist'))
const SideDrawer = lazy(()=> import( './components/drawer/SideDrawer'))
const Cart = lazy(()=> import( './pages/Cart'))
const AdminDashboard = lazy(()=> import( './pages/admin/AdminDashboard'))
const CategoryHome = lazy(()=> import( './pages/category/CategoryHome'))
const SubHome = lazy(()=> import( './pages/sub/SubHome'))
const Checkout = lazy(()=> import( './pages/Checkout'))
const Shop = lazy(()=> import( './pages/Shop'))


const App = () => {

  const dispatch=useDispatch()

  //check firebase and stop dispatch from further - memory leak


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if(user){
        //jwt
        const idTokenResult= await user.getIdTokenResult()
        console.log("user--->",user)
        console.log("token--->",idTokenResult)

        currentUser(idTokenResult.token)
        .then(
          (res)=>{
            //^on refresh only id and email persists so server req required app.js
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
      }
    })
    //stop after getting 

    return () => unsubscribe();
    
  }, [])

  return (
    <Suspense fallback={
      <div className="col text-center d-flex justify-content-center p-5 ">
      <br/>
      <div className="col p-200">
        <Space size="middle">   
            <Spin size="large" />
          </Space>
      </div>
      </div>}>
      <Header/>

      <div className="col  d-flex justify-content-around p-5 ">
<<<<<<< HEAD
 
=======
  
>>>>>>> be2a0e2a4fe624d9f272b20f04236a857467cacb
  </div>
  
    <SideDrawer />
  
    <ToastContainer />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/complete" component={RegisterComplete} />
      <Route exact path="/forgot/password" component={ForgotPassword} />
      <UserRoute exact path="/user/history" component={History} />

      <UserRoute exact path="/user/password" component={Password} />
      <UserRoute exact path="/user/wishlist" component={Wishlist} />
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
      <AdminRoute exact path="/admin/sub" component={SubCreate} />
      <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
      <AdminRoute exact path="/admin/product" component={ProductCreate} />
      <AdminRoute exact path="/admin/products" component={AllProducts} />
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
      <Route exact path="/product/:slug" component={Product} />
      <Route exact path="/category/:slug" component={CategoryHome} />
      <Route exact path="/sub/:slug" component={SubHome} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/cart" component={Cart} />
      <UserRoute exact path="/checkout" component={Checkout} />
      <UserRoute exact path="/payment" component={Payment} />

    </Switch>
    </Suspense>
  );
};

export default App;
