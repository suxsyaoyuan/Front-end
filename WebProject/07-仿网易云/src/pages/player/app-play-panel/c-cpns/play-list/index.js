import React, { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import { getSongDetailAction } from "@/pages/player/store";

import classNames from "classnames";
import {
  DownloadOutlined,
  DeleteOutlined,
  GithubOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { formatMinuteSecond } from "@/utils/format-utils";
import { PlayListWrapper } from "./style";

export default memo(function PlayList() {
  const { playList, currentSongIndex } = useSelector(
    (state) => ({
      playList: state.getIn(["player", "playList"]),
      currentSongIndex: state.getIn(["player", "currentSongIndex"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const playMusic = (item) => {
    dispatch(getSongDetailAction(item.id));
  };

  return (
    <PlayListWrapper>
      {playList &&
        playList.map((item, index) => {
          return (
            <div
              key={item.id}
              className={classNames("play-item", {
                active: currentSongIndex === index,
              })}
              onClick={(e) => playMusic(playList)}
            >
              <div className="left">{item.name}</div>
              <div className="right">
                <div className="control-and-singer">
                  <LikeOutlined />
                  <GithubOutlined />
                  <DownloadOutlined />
                  <DeleteOutlined />
                </div>
                <span className="singer">{item.ar[0].name}</span>
                <span className="duration">{formatMinuteSecond(item.dt)}</span>
                <span className="sprite_playlist link"></span>
              </div>
            </div>
          );
        })}
    </PlayListWrapper>
  );
});
