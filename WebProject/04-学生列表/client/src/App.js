// App.js 主入口文件
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './router/routes';
import useAutoLogout from './hooks/useAutoLogout';

const App = () => {
    useAutoLogout();
    return (
        <Layout>
            <Routes>
                {/* 动态地为每个路由配置创建了对应的 <Route> 组件 */}
                {routes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                ))}
            </Routes>
        </Layout>
    );
};

export default App;
