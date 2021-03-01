import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount ,removeProduct} from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
// import { CloudFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const handleRemove = (slug) => {
    let answer=window.confirm("Delete?") 
  if(answer){
    // console.log("delete", slug)
    removeProduct(slug ,user.token )
    .then(res => {
      loadAllProducts();
      // console.log("delete---> " ,res.data)
      // console.log("delete title ---> " ,res.data.title)

      toast.success(`${res.data.title} is deleted!`)


    })
    .catch(err => {
      if (err.response.status === 400)
       toast.error(err.response.data);
    })
  }
  }

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                 product={product}
                 handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;