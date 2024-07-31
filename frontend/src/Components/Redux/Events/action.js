  
  import axios from "axios";
import { EVENTS_ERROR, EVENTS_REQUEST, FETCH_EVENTS_DATA } from "./actionTypes";
  
  const getEvensRequest = () => {
    return { type: EVENTS_REQUEST };
  };
  const getEventsError = () => {
    return { type: EVENTS_ERROR };
  };
  
  // FETCH ALL DATA
  export const fetchEventsData = () => (dispatch) => {
    dispatch(getEvensRequest());
    axios
      .get(`http://localhost:8080/events`)
      .then((res) => {
        const reverseData = res.data.reverse();
        dispatch({ type: FETCH_EVENTS_DATA, payload: reverseData });
      })
      .catch((err) => {
        dispatch(getEventsError());
      });
  };
  
  // SORTING
//   export const sortbyPrice = (order) => (dispatch) => {
//     dispatch(getProductsRequest());
//     setTimeout(() => {
//       dispatch({ type: SORT_BY_PRICE, payload: order });
//     }, 1000);
//   };
  
  // FILTRING
//   export const filterbyTitle = (title, page) => async (dispatch) => {
//     dispatch(getProductsRequest());
//     axios
//       .get(`https://pear-naughty-clam.cyclic.app/iphone?limit=8&page=${page}`)
//       .then((res) => {
//         let data = res.data.data;
//         dispatch({ type: FILTER_BY_TITLE, payload: { data, title } });
//       })
//       .catch((err) => {
//         dispatch(getProductsError());
//       });
//   };
  
//   export const addToWishlist = (token, data) => async (dispatch) => {
//     try {
//       let res = await axios({
//         method: "POST",
//         url: "https://pear-naughty-clam.cyclic.app/wishlist/createproduct",
//         headers: {
//           token,
//         },
//         data,
//       });
//       dispatch({ type: ADD_TO_WISHLIST, payload: res.data });
//       return res.data.msg;
//     } catch (err) {
//       console.log(err);
//       return err.data.msg;
//     }
//   };
  
//   export const fetchwishlistData = (token) => async (dispatch) => {
//     dispatch(getProductsRequest());
//     try {
//       let responce = await axios({
//         method: "GET",
//         url: "https://pear-naughty-clam.cyclic.app/wishlist",
//         headers: {
//           token,
//         },
//       });
//       dispatch({ type: FETCH_WISHLIST_DATA, payload: responce.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   export const removeWishlistItem = (token, id) => async (dispatch) => {
//     try {
//       let responce = await axios({
//         method: "DELETE",
//         url: `https://pear-naughty-clam.cyclic.app/wishlist/delete/${id}`,
//         headers: {
//           token,
//         },
//       });
//       dispatch({ type: REMOVE_FROM_WISHLIST, payload: id });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   export const singleProduct = (id) => async (dispatch) => {
//     dispatch(getProductsRequest());
//     const response = await axios.get(
//       `https://pear-naughty-clam.cyclic.app/iphone/${id}`
//     );
  
//     dispatch({ type: PRODUCT_DETAILS, payload: response.data });
//   };
  
  // Cart Products
  
//   export const addToCart = (token, data) => async (dispatch) => {
//     try {
//       let res = await axios({
//         method: "POST",
//         url: "https://pear-naughty-clam.cyclic.app/cart/createproduct",
//         headers: {
//           token,
//         },
//         data,
//       });
//       dispatch({ type: ADD_TO_CART, payload: res.data });
//       return res.data.msg;
//     } catch (err) {
//       console.log(err);
//       return err.data.msg;
//     }
//   };
  
//   export const fetchCartData = (token) => async (dispatch) => {
//     dispatch(getProductsRequest());
//     try {
//       let responce = await axios({
//         method: "GET",
//         url: "https://pear-naughty-clam.cyclic.app/cart",
//         headers: {
//           token,
//         },
//       });
//       dispatch({ type: FETCH_CART_DATA, payload: responce.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   export const removeToCart = (token, id) => async (dispatch) => {
//     try {
//       let responce = await axios({
//         method: "DELETE",
//         url: `https://pear-naughty-clam.cyclic.app/cart/delete/${id}`,
//         headers: {
//           token,
//         },
//       });
//       dispatch({ type: REMOVE_TO_CART, payload: id });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   export const changeQty = (token, id, item) => async (dispatch) => {
//     try {
//       let responce = await axios({
//         method: "PATCH",
//         url: `https://pear-naughty-clam.cyclic.app/cart/update/${id}`,
//         headers: {
//           token,
//         },
//         item,
//       });
//       dispatch({ type: CHANGE_CART_QTY, payload: responce.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };