import React ,{ createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null); //created a context and initialised with none
//In your example, ShopContext is created using createContext() and exported. This context can then be used to share data related to shopping throughout your React application. Components that need access to this shopping-related data can subscribe to ShopContext using the Consumer component or useContext hook, and the data will automatically update when the context changes.
const getDefaultCart = ()=>{
    let cart = {};
    for(let index=0; index<300+1;index++){
        cart[index]=0;
    }
    return cart;
}
const ShopContextProvider = (props)=>{

    //getting product from database
    const[all_product,setAll_Product] = useState([]);

    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    //fetching product from api
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',

                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',

                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = ()=>{
        let totalamount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item)) //string value item so converted to number
                totalamount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalamount;
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }


    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart}; //added functions in context value to access them from different pages
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;