import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";
// import { shallowEqual, useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { headerLinks } from "@/common/local-data";
import { Modal } from "antd";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AppHeaderWrapper, HeaderLeft, HeaderRight } from "./style";
// import ThemeLogin from "@/components/theme-login";

export default memo(function AppHeader() {
  // redux hook
  // const dispatch = useDispatch();
  // const { isLogin } = useSelector(
  //   (state) => ({
  //     isLogin: state.getIn(["loginState", "isLogin"]),
  //     profile: state.getIn(["loginState", "profile"]),
  //   }),
  //   shallowEqual
  // );

  const showItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="sprite_01 icon"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      );
    }
  };

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
    <AppHeaderWrapper>
      <div className="wrap-v1 content">
        <HeaderLeft>
          <a className="logo sprite_01" href="#/">
            网易云音乐
          </a>
          <div className="select-list">
            {headerLinks.map((item, index) => {
              return (
                <div className={classnames("select-item")} key={item.title}>
                  {showItem(item, index)}
                </div>
              );
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <a
            className="center"
            href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter"
            target="_blank"
            rel="noopener noreferrer"
          >
            创作者中心
          </a>
          <div className="login" onClick={showModal}>
            登录
          </div>
          <Modal
            title="登录"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            mask={false}
          ></Modal>
        </HeaderRight>
      </div>
    </AppHeaderWrapper>
  );
});
