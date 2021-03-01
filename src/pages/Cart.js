import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import {userCart} from '../functions/user'

const Cart = ({history}) => {
    const dispatch=useDispatch();
    const {user, cart}=useSelector((state)=>({...state}));
    // console.log("cart",cart);\

    //^ accumulator(return values of cb) + currentvalue ----->  state val +  
    const getTotal = () => {
     return cart.reduce((currentValue, nextValue)=> {
       return currentValue + nextValue.count * nextValue.price
     },0)
    }

    const saveOrderToDb =() => {
        // console.log("CART",JSON.stringify(cart,null,4))
        userCart(cart, user.token)
        .then(res =>{
            console.log("CART POST",res)
            if(res.data.ok) history.push("/checkout")
        
        })
        .catch(err=>console.log("cart save error", err))
       
    }
    const saveCashOrderToDb =() => {
        // console.log("CART",JSON.stringify(cart,null,4))
        dispatch({
            type:'COD',
            payload:true
        })
        userCart(cart, user.token)
        .then(res =>{
            console.log("CART POST",res)
            if(res.data.ok) history.push("/checkout")
        
        })
        .catch(err=>console.log("cart save error", err))
       
    }


    const showCartItems = () => (

        <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
           </tr>
        </thead>
        {cart.map((p) => (
            <ProductCardInCheckout key={p._id} p={p} />
          ))}
    </table>
    )

    return (
        <div className="container-fluid pt-2">
        <div className="row">
        <div className="col-md-8">
        <h4>Cart /{cart.length} Product(s)</h4>

        {!cart.length ? (<p>No products in cart. <Link to="/shop">
        Continue Shopping</Link></p> )
    :
    (
        showCartItems()
    )}
        </div>
        <div className="col-md-4">
        <h4>Order Summary</h4>
        <hr/>
        <p>Products</p>
        {cart.map((c,i)=>
            <div key={i}>
            <p>{c.title} x {c.count} = ₹{c.price * c.count}
            </p>
            </div>
            
            )}

        <hr/>
        Total : <b className="text-danger ">₹{getTotal()}</b>
        <hr/>
        {

            user ? (
                <>
                <button onClick={saveOrderToDb} disabled={!cart.length}
                className="btn btn-primary btn-sm m2-2"
                >Proceed To checkout</button>
                <br/>
                <button onClick={saveCashOrderToDb} disabled={!cart.length}
                className="btn btn-primary btn-sm m2-2"
                >Pay Cash On Delivery</button>
                </>
            )
            :
           ( 
               <button  className="btn btn-primary btn-sm m2-2">
               <Link to={{
                    pathname:"/login",
                    state: { from : "cart"},
                }}>
                Login To checkout
                </Link></button>
                
                )
        }
        </div>
        
        </div>

        </div>
       
    )
}

export default Cart
