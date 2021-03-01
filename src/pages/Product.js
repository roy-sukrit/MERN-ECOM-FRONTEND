import React , {useState, useEffect} from 'react'
import {getProduct, setStarRating, getRelated} from './../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import {useSelector} from 'react-redux'
import { getTimeProps } from 'antd/lib/date-picker/generatePicker'
import ProductCard from '../components/cards/ProductCard'
import {Link} from 'react-router-dom'
const Product = ({match}) => {
    const[product,setProduct] = useState({})
    const[related,setRelated] = useState([])

    const {slug} = match.params;
    const[star,setStar] = useState(0);
    const{ user} = useSelector((state)=> ({...state}));

    useEffect(() => {
        loadSingleProduct();
        
    }, [slug])


    useEffect(() => {
        if (product.ratings && user) {
          let existingRatingObject = product.ratings.find(
            (ele) => ele.postedBy == user._id
          );
          existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
      });

    const loadSingleProduct = () => {
    getProduct(slug).then(res=>{
        setProduct(res.data)
        //^related
        getRelated(res.data._id).then(res =>{setRelated(res.data);} )
    })}



   const onStarClick = (newRating,name) => {
    setStar(newRating)
        console.log('NEW RATE',newRating,'name',name)

    setStarRating(name,newRating,user.token).then(res =>{
        loadSingleProduct();
        //^to show updated rating in real time
    })
}
    return (
        <div className="contianer-fluid">
        <div className="row p-4">

        <SingleProduct product={product}  star={star} onStarClick={onStarClick}/>
        </div>

        <div className="row ">
        <div className="col text-center pt-5 pb-5">
        <hr/>
        <h4>Related Products
        </h4>
        <hr/>
        </div>
        </div>
           <div className="row pb-5">
           {
               related.length ? related.map((r)=>
               <div className="col md-4 pxcd -5" key={r._id}><ProductCard product={r}/></div>
               )
               :
               <div className="text-center col">No Products found</div>          
            
           }
           </div>
        </div>
    )
}

export default Product;
