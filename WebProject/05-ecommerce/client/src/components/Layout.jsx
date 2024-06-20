import React from 'react';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import { Outlet } from 'react-router-dom';

const Layout = props => {
    return (
        <div className='app'>
            <Navbar />
            {/* 这里的{props.children}是一个占位符，用于接收在使用Layout组件时提供的内容。 */}
            {/* 位于<Layout>和</Layout>标签之间的所有内容都将作为props.children传递给Layout组件。这使你能够创建一个布局结构，其中有一个共同的结构（如导航栏和页脚），而每个页面的具体内容可以是不同的，并且可以在使用时动态提供。 */}
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout;
