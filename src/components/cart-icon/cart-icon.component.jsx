import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartTotalCount } = useContext(CartContext);
    const toggeleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggeleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount className='item-count'>{cartTotalCount}</ItemCount>
        </CartIconContainer>
    )
}
export default CartIcon;