import {combineReducers} from 'redux';

let initialStore = {
    loginData: {credentials: [], isAuth: false, currentUser: {}},
    restaurantData: [],
    userOrderHistory: [],
    totalSales: 0,
    restaurantSalesData:[]
};

const authReducer = (state = initialStore.loginData, action) => {
    switch (action.type) {
        case "SIGNUP":
            return {...state, credentials: [...state.credentials, action.data]};
        case "LOGIN":
            let user = state.credentials.filter(el => el.username === action.data.username && el.password === action.data.password);
            return {...state, isAuth: user.length === 0?false:true, currentUser: user.length === 0?{}:user[0]};
        case "SIGNOUT_USER":
            return {...state, currentUser: {}, isAuth:false};
        default:
            return state;
    }
};

const restaurantReducer = (state = initialStore.restaurantData, action) => {
    switch(action.type) {
        case "FETCH_DATA":
            let newState = [...state, ...action.data];
            newState = newState.map((e,i) => {
                let ele = e;
                ele.id = (i+1);
                return ele;
            });
            return newState;
        case "ADD_RES":
            let newRes = action.data;
            newRes.id = state.length+1;
            return [...state, newRes];
        default:
            return state;
    }
};

const userHistoryReducer = (state = initialStore.userOrderHistory, action) => {
    switch(action.type) {
        case "PLACE_ORDER":
            let obj = state.filter((e) => e.username === action.uname);
            if (obj.length === 0) {
                return [...state, action.data];
            }
            else {
                return state.map(e => e.username === action.uname?{...e, orders: [...e.orders, action.data.orders[0]]}:e);
            }
        default:
            return state;
    }
}

const salesAmountReducer = (state = initialStore.totalSales, action) => {
    switch (action.type) {
        case "CAL_TOTAL":
            return state+action.payload;
        default:
            return state;
    }
}

const resSalesReducer = (state = initialStore.restaurantSalesData, action) => {
    switch (action.type) {
        case "ADD_RES_SALES":
            if (state.length === 0) {
                return [...state, action.data];
            }
            else {
                let filteredArr = state.filter((item) => item.resName === action.data.resName);
                if (filteredArr.length === 0) {
                    return [...state, action.data];
                }
                else {
                    let newArr = state.map((e) => {
                        if (e.resName === action.data.resName) {
                            for (let i = 0; i < action.data.items.length; i++) {
                                let filteredItems = e.items.filter(el => el.name === action.data.items[i].name);
                                if (filteredItems.length === 0) {
                                    e.items = [...e.items, action.data.items[i]];
                                }
                                else {
                                    let newItems = e.items.map(ele => {
                                        if (ele.name === action.data.items[i].name) {
                                            return {...ele, quantity:ele.quantity + action.data.items[i].quantity};
                                        }
                                        else {
                                            return ele;
                                        }
                                    });
                                    e.items = newItems;
                                }
                            }
                            e.total = e.total+action.data.total;
                        }
                        return e;
                    });
                    return newArr;
                }
            }
    
        default:
            return state;
    }
}

let reducer = combineReducers({
    loginData: authReducer,
    restaurantData: restaurantReducer,
    userOrderHistory: userHistoryReducer,
    totalSales: salesAmountReducer,
    restaurantSalesData: resSalesReducer
});

export default reducer;