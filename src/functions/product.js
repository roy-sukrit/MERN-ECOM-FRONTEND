import axios from "axios";

//^create product
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product,{
    headers: {
      authtoken,
    },
  });




  //^get products by count 
export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);


  export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`, {
    headers: {
      authtoken,
    },
  });


    //^get products by slug 
export const getProduct = async (slug) =>
await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);


//^update product
export const updateProduct = async (slug,product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product,{
    headers: {
      authtoken,
    },
  });


  //^get  product on sort , limit , date
export const getProducts = async (sort,order,page) =>
await axios.post(`${process.env.REACT_APP_API}/products`, {
  sort,
  order,
  page
}
);


//^total products count 
export const getproductsCount = async () =>
await axios.get(`${process.env.REACT_APP_API}/products/total`);


//^product star rating
export const setStarRating = async (productId,star,authtoken) =>{
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
  }


  //^total products count 
export const getRelated = async (productId) =>
await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);



  //^total products count 
  export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`,arg);