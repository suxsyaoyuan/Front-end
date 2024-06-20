import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

const imageSrc = "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function Categories() {
    return (
        <div className='categories'>
            <div className="col">
                <div className="row">
                    <img src={imageSrc} alt="" className="img" />
                    <button className='link'>
                        <Link to="/products/1">
                            Sale
                        </Link>
                    </button>
                </div>
                <div className="row">
                    <img src={imageSrc} alt="" className="img" />
                    <button className='link'>
                        <Link to="/products/1">
                            Sale
                        </Link>
                    </button>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <img src={imageSrc} alt="" className="img" />
                    <button className='link'>
                        <Link to="/products/1">
                            Sale
                        </Link>
                    </button>
                </div>
            </div>
            <div className="col col-l">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <img src={imageSrc} alt="" className="img" />
                            <button className='link'>
                                <Link to="/products/1">
                                    Sale
                                </Link>
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <img src={imageSrc} alt="" className="img" />
                            <button className='link'>
                                <Link to="/products/1">
                                    Sale
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <img src={imageSrc} alt="" className="img" />
                    <button className='link'>
                        <Link to="/products/1">
                            Sale
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}