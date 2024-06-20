import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getSizeImage } from "@/utils/format-utils";
import {
  getSongDetailAction,
  playRankingListAction,
} from "@/pages/player/store";

import { TopRankingWrapper } from "./style";

import { Modal } from "antd";

export default memo(function TopRanking(props) {
  // props and state
  const { info = {} } = props;
  const { tracks = [] } = info;

  // redux hooks
  const dispatch = useDispatch();

  // other handle
  const playMusic = (item) => {
    dispatch(getSongDetailAction(item.id));
  };

  const playRankingMusic = () => {
    if (tracks.length > 0) {
      dispatch(playRankingListAction(tracks));
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
    <TopRankingWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl)} alt="" />
          <a href="/discover/ranking" className="image_cover">
            ranking
          </a>
        </div>
        <div className="info">
          <a href="/todo">{info.name}</a>
          <div>
            <button
              className="btn play sprite_02"
              onClick={(e) => playRankingMusic()}
            ></button>
            <button
              className="btn favor sprite_02"
              onClick={showModal}
            ></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks &&
          tracks.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className="list-item">
                <div className="rank">{index + 1}</div>
                <div className="info">
                  <span className="name text-nowrap">
                    <Link to={`song/detail?ids=${item.id}`}>{item.name}</Link>
                  </span>
                  <div className="operate">
                    <button
                      className="btn sprite_02 play"
                      onClick={(e) => playMusic(item)}
                    ></button>
                    <button className="btn sprite_icon2 addto"></button>
                    <button
                      className="btn sprite_02 favor"
                      onClick={showModal}
                    ></button>
                  </div>
                  <Modal
                    title="登录"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    mask={false}
                  ></Modal>
                </div>
              </div>
            );
          })}
      </div>
      <div className="footer">
        <a href="/todo">查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  );
});
