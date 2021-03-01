import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter
} from "../functions/product";
import Star from '../components/forms/Star'
import {getCategories} from '../functions/category.js'
import {getSubs} from '../functions/sub.js'

import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider,InputNumber ,Checkbox, Radio} from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok,setOk] = useState(false)
  const [star,setStar] = useState('')
  const [subs,setSubs] = useState([])
  const [sub,setSub] = useState('')
  const [brands, setBrands] = useState(['Microsoft','Samsung','Apple','ASUS','Lenovo'])
  const [brand, setBrand] = useState('')
  const [colors,setColors] = useState(['Black','Brown','Silver','White','Blue'])
  const [color,setColor] = useState("")
  const [shipping,setShipping] = useState(" ")
  //^sidebar
  const [categories,setCategories] = useState([])
  //^ check backend
  const [categoryIds,setCategoryIds] = useState([])

  let dispatch = useDispatch()
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    //^get all categories
    getCategories().then(res=>setCategories(res.data))
    //^get subs
    getSubs().then((res)=> setSubs(res.data))

  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };


  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if(!text){
        loadAllProducts()
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);


  //4 Categories in list of checkbox
  const showCategories = () => categories.map((c)=>
  <div key={c._id}>
  <Checkbox
  onChange={handleCheck}
  value={c._id}
  checked={categoryIds.includes(c._id)}
  name="category"
   className="pb-2 pl-1 pr-4">
   {c.name}
   </Checkbox>
   <br/>
  </div>
  )


  const handleCheck = (e) => {
    //^reset text 
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    //^reset price ,star
      setPrice([0,0])
      setStar("")
      setSub('')
      setBrand("")
      setColor("")
      setShipping("");




  // console.log("Category selected", e.target.value)
  //^check uncheck challenge in state , no duplicates
  let inTheState = [...categoryIds]
  let justChecked = e.target.value
  let foundInTheState = inTheState.indexOf(justChecked)

  //^not found -1 else index
  if(foundInTheState === -1){
  inTheState.push(justChecked)
  }
  else{
    inTheState.splice(foundInTheState,1)
  }
  setCategoryIds(inTheState)
  // console.log("in state category",inTheState)

  fetchProducts({category:inTheState})

  }


  const handleSlider = (value) => {
    //^reset text
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

  //^ Reset Category,price ,stars 
  setCategoryIds([])
    setPrice(value);
    setSub('')
    setBrand("")
    setColor("")
    setShipping("");



    setStar("")
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

//^Star
const showStars = () => (
  <div className="pr-4 pl-4 pb-2">
  <Star starClick={handleStarClick} numberOfStars={5} />
  <Star starClick={handleStarClick} numberOfStars={4} />
  <Star starClick={handleStarClick} numberOfStars={3} />
  <Star starClick={handleStarClick} numberOfStars={2} />
  <Star starClick={handleStarClick} numberOfStars={1} />
  </div>
)

const handleStarClick = (num) =>{
  // console.log("STAR",num)
    //^reset text
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0,0])
    setSub('')
    setBrand("")
    setColor("")
    setShipping("");



    setCategoryIds([])
    setStar(num)
    fetchProducts({ stars: num });


}

//^ products by sub
const showSubs = () =>
subs.map((sub) => (
  <div
    key={sub._id}
    onClick={() => handleSub(sub)}
    className="p-1 m-1 badge badge-secondary"
    style={{ cursor: "pointer" }}
  >
    {sub.name}
  </div>
));

const handleSub = (sub) => {
console.log("SUB", sub);
setSub(sub);
setColor("")

dispatch({
  type: "SEARCH_QUERY",
  payload: { text: "" },
});
setPrice([0, 0]);
setBrand("")
setCategoryIds([]);
setStar("");
setShipping("");

fetchProducts({ sub });
};

//^brands
const showBrands = () => brands.map((b) =>
 <Radio
 key={b}
  value={b}
  checked={b === brand}
  onChange={handleBrand}
  className="pb-1 pl-4 pr-5"
  >
  {b}
  </Radio>
)
const handleBrand = (e) => {
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setPrice([0, 0]);
  setCategoryIds([]);
  setStar("");
  setColor("")
  setShipping("");

  setBrand(e.target.value)
  fetchProducts({ brand: e.target.value });

  // console.log("BRAND",e.target.value)
}

//^colors

const showColors = () => colors.map((c) =>
 <Radio
 key={c}
  value={c}
  checked={c === color}
  onChange={handleColor}
  className="pb-1 pl-4 pr-5"
  >
  {c}
  </Radio>
)
 
const handleColor = (e) => {
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setPrice([0, 0]);
  setCategoryIds([]);
  setStar("");
  setBrand("")
  setShipping("");

  setColor(e.target.value)
  setShipping("")
  fetchProducts({ color: e.target.value });

  // console.log("BRAND",e.target.value)
} 

//^Shipping
const showShipping = () => (
  <>
    <Checkbox
      className="pb-2 pl-4 pr-4"
      onChange={handleShippingchange}
      value="Yes"
      checked={shipping === "Yes"}
    >Yes
    </Checkbox>

    <Checkbox
      className="pb-2 pl-4 pr-4"
      onChange={handleShippingchange}
      value="No"
      checked={shipping === "No"}
    >No
    </Checkbox>
  </>
);

const handleShippingchange = (e) => {
  setSub("");
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setPrice([0, 0]);
  setCategoryIds([]);
  setStar("");
  setBrand("");
  setColor("");
  setShipping(e.target.value);
  fetchProducts({ shipping: e.target.value });
};


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr/>
          <Menu defaultOpenKeys={["1", "2","3","4","5","6","7"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price : ₹
            {/*    <InputNumber
                  min={0}
                  defaultValue={0}
                  max={99999}
                  className="ml-2 font-weight-bold "
                  readonly
                  value={price[1]}
            /> */}
                 
                </span>
              }
            >
              <div>
              
              <Slider
              className="ml-4 mr-4"
              tipFormatter={(v) => `$${v}`}
              range
              value={price}
              onChange={handleSlider}
              max="99999"
            />
              </div>
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Category     
                 
                </span>
              }
            >
              <div style={{marginTop:"10px"}}>
              {showCategories()}

              
           
              </div>
            </SubMenu>

         {/* stars */}
         <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "10px" }}>{showStars()}</div>
            </SubMenu>

            
         {/* subs */}

         <SubMenu
         key="4"
         title={
           <span className="h6">
             <DownSquareOutlined /> Sub Categories
           </span>
         }
       >
         <div style={{ maringTop: "10px" }} className="pl-4 pr-4">
           {showSubs()}
         </div>
       </SubMenu>

       <SubMenu
       key="5"
       title={
         <span className="h6">
           <DownSquareOutlined /> Brands
         </span>
       }
     >
       <div style={{ maringTop: "10px" }} className="pl-4 pr-4">
         {showBrands()}
       </div>
     </SubMenu>
     <SubMenu
       key="6"
       title={
         <span className="h6">
           <DownSquareOutlined /> Colors
         </span>
       }
     >
       <div style={{ maringTop: "10px" }} className="pl-4 pr-4">
        {showColors()}
       </div>
     </SubMenu>

     <SubMenu
     key="7"
     title={
       <span className="h6">
         <DownSquareOutlined /> Shipping
       </span>
     }
   >
     <div style={{ maringTop: "10px" }} className="pl-4 pr-4">
     {showShipping()} 
     </div>
   </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
