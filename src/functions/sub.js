import axios from "axios";

//& All the CRUD func for category function middleware - category.js

//^get subs of categories
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

//^get slug category
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

//^remove category based on slug
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

  //^update category baseg on slug
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,sub ,{
    headers: {
      authtoken,
    },
  });


  //^create new category
export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
