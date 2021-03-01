import React,{useState} from "react";
import { Card , Tooltip} from "antd";
import {showAverage} from '../../functions/rating'
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import bydefault from "../../images/default.png";
import { Link } from "react-router-dom";
import _ from "lodash"
import {useSelector, useDispatch} from 'react-redux'

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const {user,cart,drawer} = useSelector((state)=>({...state}))
  // destructure
  const { images, title, description, slug ,price } = product;
  const [tooltip,setTooltip] = useState("Click to add")
  const handleAddToCart = () => {
    
    //^cart array 
    let cart = []
    if(typeof window !== "undefined")
    {
       //^get existing
      if(localStorage.getItem("cart")){
        cart =JSON.parse(localStorage.getItem("cart"))
      }
      //^ to cart
      cart.push({
        ...product,
        count:1,
      })
      //^[ {},..{}..]
      let unique=_.uniqWith(cart,_.isEqual)
      //^remove duplicates

      //^save to local
      localStorage.setItem("cart",JSON.stringify(unique))
     dispatch({
       type: "ADD_TO_CART",
       payload: unique
     })

       // show cart items in side drawer
       dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

    }

    //^showing tooltip ----> added
   setTooltip("Added!")


  }




  return (
    <>
    {product && product.ratings && product.ratings.length > 0
      ? showAverage(product)
       : <div className="text-center pt-1 pb-3">No ratings Yet</div>}
    <Card
    hoverable
      cover={
        <img
          src={images && images.length ? images[0].url : bydefault}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <Tooltip 
        placement="top"
        color={'lime'}
        title={tooltip}>
          <a onClick={handleAddToCart} disabled={product.quantity<1}>
            <ShoppingCartOutlined className="text-danger" /> <br />
            {product.quantity <1 ? " Out Of Stock" : "Add to Cart"} 
          </a>
        </Tooltip>,
      ]}
    >
      <Meta
        title={`${title}- ₹${price}`}

        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
    </>
  );
};

export default ProductCard;
