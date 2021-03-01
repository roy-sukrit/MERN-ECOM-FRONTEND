import axios from "axios";

//& All the CRUD func for category function middleware - category.js

//^get list of categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

//^get slug category
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

//^remove category based on slug
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

  //^update category baseg on slug
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category ,{
    headers: {
      authtoken,
    },
  });


  //^create new category
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });


  //^get parent category

  export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
