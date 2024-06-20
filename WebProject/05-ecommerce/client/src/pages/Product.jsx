import React, { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch'
import { addToCart, removeItem, resetCart } from '../redux/cartReducer';
import './Product.scss'

const Product = () => {
    const id = useParams().id;
    const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
    const [selectedImg, setSelectedImg] = useState("img");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    return (
        <div className='product'>
            {error ? (
                <h1>something went wrong!</h1>
            ) : loading ? "loading" :
                /*     `useFetch` 钩子是异步的，它需要一些时间来从服务器获取数据。在数据返回之前，`data` 变量会是初始值`null`。获取到数据后才会更新为服务器返回的data值，进而导致组件的重新渲染。所以我们不能在返回jsx前将title,price等数据从data.attributes中解构出来，只有当loading为false，也就是数据请求完毕后，才能使用data中的数据 */
                (<>
                    <div className="left">
                        <div className="images">
                            <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url}
                                alt=""
                                onClick={() => { setSelectedImg("img") }}
                            />
                            <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url}
                                alt=""
                                onClick={() => { setSelectedImg("img2") }}
                            />
                        </div>

                        <div className="mainImg">
                            <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.[selectedImg]?.data?.attributes?.url}
                                // [selectedImg]
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="right">
                        <h1>{data?.attributes?.title}</h1>
                        <span className='price'>${data?.attributes?.price}</span>
                        <p>{data?.attributes?.desc}</p>

                        <div className="quantity">
                            <button onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}>-</button>
                            {quantity}
                            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        </div>

                        <button
                            className="add"
                            onClick={() => {
                                dispatch(addToCart({
                                    id: data?.id,
                                    title: data?.attributes?.title,
                                    desc: data?.attributes?.desc,
                                    price: data?.attributes?.price,
                                    img: data?.attributes?.img?.data?.attributes?.url,
                                    quantity,
                                }));
                            }}
                        >
                            <AddShoppingCartIcon />加入购物车
                        </button>

                        <div className="links">
                            <div className="item">
                                <FavoriteBorderIcon />ADD TO WISH LIST
                            </div>
                            <div className="item">
                                <BalanceIcon />ADD TO WISH LIST
                            </div>
                        </div>
                        <div className="info">
                            <span>Vendor:Polp</span>
                            <span>T-shirt</span>
                            <span>Tag:</span>

                        </div>
                        <hr />

                        <div className="details">
                            <span>Vendor:Polp</span>
                            <hr />
                            <span>T-shirt</span>
                            <hr />
                            <span>FAQ</span>
                        </div>
                    </div>
                </>
                )}
        </div>
    )
}

export default Product;