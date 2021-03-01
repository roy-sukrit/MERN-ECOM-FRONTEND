import React,{useState,useEffect} from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Order from '../../components/order/Order'
import {getOrders, orderStatusUpdate}  from '../../functions/admin'

const AdminDashboard = () => {
  const[orders,setOrders] = useState([])
  const dispatch= useDispatch()
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
   loadOrders()
  }, [])
 
  const loadOrders = () => {
    getOrders(user.token)
    .then((res)=>{
      console.log("orders",JSON.stringify(res.data,null,4));
      setOrders(res.data)
    })
  }
 
  const handleStatusChange = (orderId,orderStatus) => {
    orderStatusUpdate(orderId,orderStatus,user.token).then(res => {
      toast.success("Status Updated successfully!")
      loadOrders();
    })
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <Order orders={orders} handleStatusChange={handleStatusChange}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
