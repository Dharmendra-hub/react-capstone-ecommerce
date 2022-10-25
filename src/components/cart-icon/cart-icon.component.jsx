import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen,cartTotalCount } = useContext(CartContext);
    const toggeleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <div className='cart-icon-container' onClick={toggeleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{ cartTotalCount}</span>
        </div>
    )
}
export default CartIcon;