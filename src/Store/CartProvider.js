import { useState } from "react"
import CartContext from "./CartContext"


const CartProvider=props=>{
        const [items,updateItems]=useState([])

    const addItemToCartHandler=item=>{
       updateItems([...items,item])
       console.log("inside addItemCartHandler",cartContext)
    }

    const removeItemFromCartHandler=id=>{

    }

    const cartContext={        
        items:items,
        totalAmount:0,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    };
return <CartContext.Provider value={cartContext}>
    {console.log("inside CartContext.provider",cartContext)}
    {props.children}
</CartContext.Provider>
}

export default CartProvider