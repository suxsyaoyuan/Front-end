// routes.js
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import NeedAuth from "../components/NeedAuth";
import StudentPage from "../pages/StudentPage";

const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: 'profile',
        element: <NeedAuth><ProfilePage /></NeedAuth>,
    },
    {
        path: 'auth-form',
        element: <AuthPage />,
    },
    {
        path: 'student',
        element: <NeedAuth><StudentPage /></NeedAuth>,
    },
];

export default routes;
