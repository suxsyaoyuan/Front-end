import React, { memo, useState } from "react";
// import { changeIsVisible } from "@/components/theme-login/store";
// import { useDispatch, useSelector } from "react-redux";
import { UserLoginWrapper } from "./style";

import { Modal } from "antd";

export default memo(function HYUserLogin() {
  // const dispatch = useDispatch();

  // const { isLogin } = useSelector((state) => ({
  //   isLogin: state.getIn(["loginState", "isLogin"]),
  //   profile: state.getIn(["loginState", "profile"]),
  //   cookie: state.getIn(["loginState", "cookie"]),
  // }));

  // const handleLogin = () => {
  //   if (!isLogin) dispatch(changeIsVisible(true));
  // };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <UserLoginWrapper className="sprite_02">
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <button className="sprite_02" onClick={showModal}>
        用户登录
      </button>
      <Modal
        title="登录"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false}
      ></Modal>
    </UserLoginWrapper>
  );
});
