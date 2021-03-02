import React,{useState} from "react";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { Card, Tabs , Tooltip} from "antd";
import {showAverage} from '../../functions/rating'
import {useSelector, useDispatch} from 'react-redux'
import bydefault from "../../images/default.png";
import {toast} from 'react-toastify'
import _ from "lodash"
import {addToWishList} from '../../functions/user'
import ProductListItems from "./ProductListItems";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import {useHistory} from 'react-router-dom'
const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id ,slug} = product;
  const [tooltip,setTooltip] = useState("Click to add")
  const dispatch = useDispatch()
  const {user,cart} = useSelector((state)=>({...state}))
  let history = useHistory()
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
    
     dispatch({
      type: "SET_VISIBLE",
      payload: true,
    }) 

    }

    //^showing tooltip ----> added
   setTooltip("Added!")


  }



  const handleAddToWishList =(e) => {
   e.preventDefault();
   if(user && user.token){
    addToWishList(product._id,user.token)
    .then((res) => {
      console.log('added to wishlist',res.data)
      toast.success("Added to Wishlist")
      history.push("/user/wishlist")
    })
    
}else{
    history.push({
        pathname:"/login",
        state:{ from:`/product/${slug}`}

    })
}

  

  }


  return (
    <>
      <div className="col-md-7 ">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={<img src={bydefault} className="mb-3 card-image" />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>

          <TabPane tab="More" key="2">
            Call us on XXXX XXXX XXX to learn more about the product..
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="p-3 mb-2 bg-info text-white">{title}</h1>

        {product && product.ratings && product.ratings.length > 0
           ? showAverage(product)
            : <div className="text-center pt-1 pb-3">"No ratings Yet"</div>}

        
        <Card
          hoverable
          actions={[
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
            </a>
          </Tooltip>,
            <a onClick={handleAddToWishList}>
              <HeartOutlined /> <br />
              Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                isSelecteable={true}
                starRatedColor="red"
                changeRating={onStarClick}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
