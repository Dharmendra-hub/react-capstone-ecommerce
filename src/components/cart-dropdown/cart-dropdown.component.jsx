import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';




const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    console.log(cartItems);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                <div className='cart-iems'>
                    {/* shorthand for return */}
                    {cartItems.map(item => (<CartItem key={item.id} cartItem={item} />))} 
                </div>
                <Button>Checkout</Button>
            </div>
        </div>
    )
}
export default CartDropdown;