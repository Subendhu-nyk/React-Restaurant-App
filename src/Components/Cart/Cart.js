import React, { useState,useContext,useEffect } from "react";
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
const Cart=props=>{
  const cartCtx=useContext(CartContext)

  const [total, setTotal] = useState(0);

  
  // useEffect(() => {
  //   let sum = cartCtx.items.reduce((accumulator, item) => {      
  //     return accumulator + (item.amount * item.quantity); 
  //   }, 0);

  //   setTotal(sum);
  // }, [cartCtx.items]);

  useEffect(() => {
    const mergedItems = cartCtx.items.reduce((accumulator, item) => {
      const existingItem = accumulator.find((mergedItem) => mergedItem.name === item.name);

      if (existingItem) {        
        existingItem.quantity += item.quantity;
       
      } else {        
        accumulator.push({ ...item });
      }

      return accumulator;
    }, []);

    let sum = mergedItems.reduce((accumulator, item) => {
      return accumulator + (item.amount * item.quantity);
    }, 0);

    setTotal(sum);
  }, [cartCtx.items]);
  

const cartItemRemoveHandler=id=>{
  const itemToRemove = cartCtx.items.find((item) => item.id === id);
  if (itemToRemove) {
    // Decrease the quantity by 1 (if it's greater than 0)
    if (itemToRemove.quantity > 0) {
      itemToRemove.quantity -= 1;
      setTotal((prevTotal) => prevTotal - itemToRemove.amount);
    }
    
    
  }
}


const cartItemAddHandler=id=>{
  const itemToAdd = cartCtx.items.find((item) => item.id === id);
  if (itemToAdd) {
    // Decrease the quantity by 1 (if it's greater than 0)
    if (itemToAdd) {
      itemToAdd.quantity =Number(itemToAdd.quantity) +1;
      setTotal((prevTotal) => prevTotal + itemToAdd.amount);
    }
  }
}

const cartItems = (
    <ul className={classes['cart-items']}>      
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} quantity={item.quantity} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item.id)}/>
        // <li>Item Name:{item.name} Quantity:{item.quantity}</li>
      ))}
    </ul>
  );
  let totalAmount= `$${total.toFixed(2)}`
    return (<Modal onClose={props.onClose}>
        {cartItems}    
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button}>Order</button>
    </div>
    </Modal>
)}

export default Cart;