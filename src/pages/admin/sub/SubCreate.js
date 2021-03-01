import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createSub,
  getSubs,
  removeSub,
} from "../../../functions/sub";

import { getCategories} from "../../../functions/category";
import CategoryForm from '../../../components/forms/CategoryForm'
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/forms/LocalSearch'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subs, setSubs] = useState([]);

  //^search filter Step 1
  const [keyword,setkeyword]=useState('');

  useEffect(() => {
    loadCategories();
    loadSubs()
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSubs = () =>
    getSubs().then((c) => setSubs(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name ,parent:category}, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        // loadSubs();
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
        //   loadCategories();
        loadSubs();
        
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  //^step 4 search filter


  const searched = (keyword) => (c)=> c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create Sub-Category</h4>
          )}
          <div class="form-group">
              <label >Parent Category</label>
              <select 
               name="category"
               className="form-control"
               onChange={e=>setCategory(e.target.value)}>
                  {/*getting id inside value*/}
                  <option>Select</option>
                  {categories.length>0 && categories.map((c)=>(
                      <option
                       key={c._id}
                      value={c._id}

                      >{c.name}</option>
                  ))}

              </select>
          </div>

          <CategoryForm 
          handleSubmit={handleSubmit}
         name={name}
         setName={setName}
         />
         {/*Step2 search bar */}
         <LocalSearch
          keyword={keyword}
          setkeyword={setkeyword}
          />
          
          {subs.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}

          

     
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
