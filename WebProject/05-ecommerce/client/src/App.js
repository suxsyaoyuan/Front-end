import React from 'react';
import { Route, Routes } from "react-router-dom";
import routes from './router/routes';
import Layout from './components/Layout';
import './App.scss'

function App() {
  return <Layout>
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  </Layout>
}

export default App;