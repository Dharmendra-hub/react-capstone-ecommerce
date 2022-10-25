import { useContext } from 'react';
import { CartContext } from '../../../context/cart.context';

import CheckoutItem from '../../checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>

                <div className='header-block'>
                    <span>Description</span>
                </div>

                <div className='header-block'>
                    <span>Quantity</span>
                </div>

                <div className='header-block'>
                    <span>Price</span>
                </div>

                <div className='header-block'>
                    <span>Remove</span>
                </div>

            </div>
            <h2>Checkout Page</h2>

            {
                cartItems.map((cartItem) => {
                    //const { id, name, quantity } = CheckoutItem;
                    return (
                        // <div key={id}>
                        //     <h2>{name}</h2>
                        //     <span>{quantity}</span>
                        //     <span onClick={() => removeItemToCart(cartItem)}>-</span>
                        //     <span onClick={() => addItemToCart(cartItem)}>+</span>
                        // </div>
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
            <span className='total'>Total: ${cartTotal}</span>

        </div>
    )
}
export default Checkout;