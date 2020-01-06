import axios from 'axios';

export const signupUser = (obj) => ({type: "SIGNUP", data: obj});
export const loginUser = (obj) => ({type: "LOGIN", data: obj});
export const fetchDataArr = (dataArr) => ({type: "FETCH_DATA", data: dataArr});
export const placeOrder = (obj, uname) => ({type: "PLACE_ORDER", data: obj, uname: uname});
export const signoutUser = () => ({type: "SIGNOUT_USER"});
export const addRestaurant = (obj) => ({type: "ADD_RES", data: obj});
export const calTotal = (price) => ({type: "CAL_TOTAL", payload: price});
export const addRestaurantSales = (obj) => ({type: "ADD_RES_SALES", data: obj});

export const fetchData = () => {
    return dispatch => {
        return axios.get('/restaurant.json').then(res => {
            return dispatch(fetchDataArr(res.data.items));
        });
    };
};