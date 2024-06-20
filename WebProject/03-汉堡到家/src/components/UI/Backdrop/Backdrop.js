import React from 'react';
import classes from './Backdrop.module.css'
import ReactDOM from 'react-dom';

const backdropRoot = document.getElementById('backdrop-root')

const Backdrop = (props) => {
    // 通过ReactDOM中的createPortal()方法，可以在渲染元素时将元素渲染到网页中的指定位置。
    return ReactDOM.createPortal(<div
        {...props}
        className={`${classes.Backdrop} ${props.className}`}>
        {props.children}
    </div>, backdropRoot);
}

export default Backdrop;