import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

//Add Cart Logic
const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if found,increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

//Remove Cart Item logic
const removeCartItem = (cartItems, cartItemToRemove) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //check if quanity is equal to 1, if it is remove that item from the cart
    //Filter method: filter gives a new array
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    //return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

//Clear
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removItemfromcart: () => { },
    clearItemFromCart: () => { },
    cartTotalCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

//REDUCER
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartTotalCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }

}

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartTotalCount, setCartTotalCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);    

    const [{ cartItems, isCartOpen, cartTotalCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // //One way to track cart as we have to check cartItems so useEffect will use it as its dependency
    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartTotalCount(newCartCount);
    // }, [cartItems]);

    // //Its better to use seperate useeffect 
    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);


    //Reducer function
    const updateCartItemsReducer = (newCartItems) => {

        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        // dispatch({
        //     type: CART_ACTION_TYPES.SET_CART_ITEMS,
        //     payload: {
        //         cartItems: newCartItems,
        //         cartTotal: newCartTotal,
        //         cartCount: newCartCount
        //     }
        // });


        //Using Smaill Utility
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            })
        );

    }

    const addItemToCart = (productToAdd) => {
        //setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch({ type: 'SET_IS_CART_OPEN', payload: bool });
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartTotalCount, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}