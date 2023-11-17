import classes from '../assets/Cart.module.css';
import React, { useContext,useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';
const Cart = props =>{
    const [isCheckOut,SetIsCheckOut] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const handleCartItemAdd = (item) =>{
        cartCtx.addItem({...item,amount: 1});
    }
    const handleCartItemRemove = (id)=>{
        cartCtx.removeItem(id);
    }
    const handleSubmit = async (userData) =>{
       setIsSubmitting(true);
        await fetch('https://harsh-594b9-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };
    const cartItems=(<ul className={classes['cart-items']}>{cartCtx.items.map((item)=>(
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
        onRemove={handleCartItemRemove.bind(null,item.id)}
        onAdd={handleCartItemAdd.bind(null,item)}/>
    ))}
    </ul>);
    const handleClick= () =>{
        SetIsCheckOut(true);
    }
    const modalActions = (
        <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && (<button className={classes.button} onClick = {handleClick}>Order</button>)}
            </div>
    );
    const cartModalContent = (
        <React.Fragment>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckOut && (
            <Checkout onConfirm={handleSubmit} onCancel={props.onClose} />
          )}
          {!isCheckOut && modalActions}
        </React.Fragment>
      );
      const isSubmittingModalContent = <p>Sending your order....</p>
    const didSubmitModal = (
        <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
      </React.Fragment>
    );
    
    return(
        
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModal}
        </Modal>
    );
};
export default Cart;