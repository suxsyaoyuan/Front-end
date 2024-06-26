import React, { useRef, useState } from 'react';
import { useLoginMutation, useRegisterMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../store/reducer/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    // 引入注册的api
    const [regFn, { error: regError }] = useRegisterMutation();
    const [loginFn, { error: loginError }] = useLoginMutation();

    const usernameInp = useRef();  //创建个对象接收
    const pwdInp = useRef();
    const emailInp = useRef();

    // 获取dispatch
    const dispatch = useDispatch();

    // 获取Navigate
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("authForm-->", location.state.preLocation);

    const from = location.state?.preLocation?.pathname || "/";

    const submitHandler = (e) => {
        e.preventDefault(); // 取消默认行为 不让表单自己提交

        // 获取用户输入的内容
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;

        // 处理登录功能 与服务器交互
        if (isLoginForm) {
            // console.log('登录 -->', username, password);
            loginFn({
                identifier: username,
                password
            }).then(res => {
                if (!res.error) {
                    dispatch(login(
                        {
                            token: res.data.jwt,
                            user: res.data.user
                        }
                    ));
                    // 登录成功后，需要向系统中添加一个标识，标记用户的登录状态
                    // 登录状态（布尔值，token(jwt)，用户信息）
                    // 跳转页面到之前的目录
                    navigate(from, { replace: true });
                }
            });
        } else {
            const email = emailInp.current.value;
            //console.log('注册 -->', username, password, email);
            regFn({
                username,
                password,
                email
            }).then(res => {
                if (!res.error) {
                    // 注册成功
                    setIsLoginForm(true);
                }
            });
        }

    };

    return (
        <div>
            <p style={{ color: 'red' }}>
                {regError && "用户名或电子邮件重复"}
            </p>
            <p style={{ color: 'red' }}>
                {loginError && "用户名或密码错误"}
            </p>

            <h2>{isLoginForm ? "登录" : "注册"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"} />
                </div>
                {
                    !isLoginForm &&
                    <div>
                        <input ref={emailInp} type="email" placeholder={"电子邮件"} />
                    </div>
                }
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"} />
                </div>
                <div>
                    <button>{isLoginForm ? "登录" : "注册"}</button>
                    <a href="#" onClick={
                        event => {
                            event.preventDefault();
                            setIsLoginForm(prevState => !prevState); //在登陆和注册之间切换
                        }
                    }>
                        {
                            isLoginForm ?
                                "没有账号？点击注册" :
                                "已有账号？点击登录"}
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
