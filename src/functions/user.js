import axios from 'axios'

export const userCart = async (cart,authtoken) =>
 await axios.post(
`${process.env.REACT_APP_API}/user/cart`,
 { cart },
 {
     headers : {
        authtoken,
    }
}
);



export const getUserCart = async (authtoken) =>
 await axios.get(
`${process.env.REACT_APP_API}/user/cart`,
 {
     headers : {
        authtoken,
    }
}
);


export const emptyUserCart = async (authtoken) =>
 await axios.delete(
`${process.env.REACT_APP_API}/user/cart`,
 {
     headers : {
        authtoken,
    }
}
);


export const saveUserAddress = async (authtoken,address) =>
 await axios.post(
`${process.env.REACT_APP_API}/user/address`,
 { address },
 {
     headers : {
        authtoken,
    }
}
);


//apply coupon

export const applyCoupon = async (authtoken,coupon) =>
 await axios.post(
`${process.env.REACT_APP_API}/user/cart/coupon`,
 { coupon },
 {
     headers : {
        authtoken,
    }
}
);


// create order
export const createOrder = async (stripeResponse,authtoken) =>
 await axios.post(
`${process.env.REACT_APP_API}/user/order`,
 { stripeResponse },
 {
     headers : {
        authtoken,
    }
}
);



export const getUserOrders = async (authtoken) =>
 await axios.get(
`${process.env.REACT_APP_API}/user/orders`,
 {
     headers : {
        authtoken,
    }
}
);



export const getWishList = async (authtoken) =>
 await axios.get(
`${process.env.REACT_APP_API}/user/wishlist`,
 {
     headers : {
        authtoken,
    }
}
);

export const removeWishList = async (productId,authtoken) =>
 await axios.put(
`${process.env.REACT_APP_API}/user/wishlist/${productId}`,{},
 {
     headers : {
        authtoken,
    }
}
);


export const addToWishList = async (productId,authtoken) =>
 await axios.post(
`${process.env.REACT_APP_API}/user/wishlist`,{productId},
 {
     headers : {
        authtoken,
    }
}
);


//cash on delivery

export const createCashOrderForUser = async (authtoken,COD,coupon) =>
 await axios.post(
`${process.env.REACT_APP_API}/user/cash-order`,{ couponApplied : coupon , COD},
 {
     headers : {
        authtoken,
    }
}
);