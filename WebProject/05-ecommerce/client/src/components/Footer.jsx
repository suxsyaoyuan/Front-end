import React from 'react'
import './Footer.scss'

export default function Footer() {
    return (
        <div className="footer">
            <div className="top">
                <div className="item">
                    <h1>Categories</h1>
                    <span>Women</span>
                    <span>Men</span>
                    <span>Children</span>
                </div>
                <div className="item">
                    <h1>Links</h1>
                    <span>FAQ</span>
                    <span>stores</span>
                    <span>Cookies</span>
                </div>
                <div className="item">
                    <h1>About</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et.</span>

                </div>
                <div className="item">
                    <h1>Contact</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore.Loremn ipsum dolor.</span>

                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <span className="logo">LAMASTORE</span>
                    <span className="copyright">@Copyright 2023 All Rights Reserved</span>
                </div>
                <div className="right">
                    <img src="/img/2.png" alt="" />
                </div>
            </div>
        </div>
    )
}
