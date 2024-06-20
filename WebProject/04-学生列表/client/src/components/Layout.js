// 模板 不处理细节
import React from 'react';
import MainMenu from "./MainMenu";


const Layout = props => {
    return (
        <div>
            <MainMenu />
            <hr />
            {props.children}
            {/* 交给app.js处理 */}
        </div>
    );
};

export default Layout;
