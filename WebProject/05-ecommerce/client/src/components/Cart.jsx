import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeItem, resetCart } from '../redux/cartReducer';

export default function Cart() {
    const products = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => (total += item.quantity * item.price));
        return total.toFixed(2);
    }
    return (
        <div className='cart'>
            <h1>Products in your cart</h1>
            {products?.map(item => (
                <div className='item' key={item.id}>
                    <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1>
                        <p>{item.desc?.substring(0, 100)}</p>
                    </div>
                    <div className="price">{item.quantity} × ${item.price}</div>
                    <DeleteOutlineIcon className='delete' onClick={() => dispatch(removeItem(item.id))} />
                </div>
            ))}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <div className="buttons-container">
                <span className="reset" onClick={() => dispatch(resetCart())}>Reset Card</span>
                <button>PROCEED TO CHECKOUT</button>
            </div>
        </div>
    )
}
