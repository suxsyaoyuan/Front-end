import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { message } from "antd";

import {
  getSizeImage,
  getPlayUrl,
  formatMinuteSecond,
} from "@/utils/format-utils";
import {
  getSongDetailAction,
  changeCurrentLyricIndexAction,
  changePlaySequenceAction,
  changePlaySongAction,
} from "../store/actionCreators";

import AppPlayPanel from "../app-play-panel";
import { Slider } from "antd";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";

export default memo(function AppPlaybar() {
  // props and state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  // redux hooks
  const {
    currentSong,
    currentLyrics,
    currentLyricIndex,
    playList,
    playSequence,
  } = useSelector(
    (state) => ({
      currentSong: state.getIn(["player", "currentSong"]),
      currentLyrics: state.getIn(["player", "currentLyrics"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
      playList: state.getIn(["player", "playList"]),
      playSequence: state.getIn(["player", "playSequence"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const songId = currentSong && currentSong.id;
  // other hooks
  const audioRef = useRef();
  useEffect(() => {
    dispatch(getSongDetailAction(2158973221));
  }, [dispatch]);

  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id);
    audioRef.current
      .play()
      .then((res) => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
      });
    setDuration(currentSong.dt);
  }, [currentSong]);

  // 其他业务
  const play = useCallback(() => {
    setIsPlaying(!isPlaying);
    isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play().catch((err) => {
          setIsPlaying(false);
        });
  }, [isPlaying]);

  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime);
      setProgress(((currentTime * 1000) / duration) * 100);
    }

    let lrcLength = currentLyrics.length;
    let i = 0;
    for (; i < lrcLength; i++) {
      const lrcTime = currentLyrics[i].time;
      if (currentTime * 1000 < lrcTime) {
        break;
      }
    }
    const finalIndex = i - 1;
    if (finalIndex !== currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(finalIndex));
      message.open({
        content: currentLyrics[finalIndex]?.content,
        key: "lyric",
        duration: 0,
        className: "lyric-message",
      });
    }
  };

  const timeEnded = () => {
    if (playSequence === 2 || playList.length === 1) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changePlaySongAction(1));
    }
  };

  const sliderChange = useCallback(
    (value) => {
      setProgress(value);
      const time = ((value / 100.0) * duration) / 1000;
      setCurrentTime(time);
      setIsChanging(true);
    },
    [duration]
  );

  const sliderAfterChange = useCallback(
    (value) => {
      const time = ((value / 100.0) * duration) / 1000;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
      setIsChanging(false);

      if (!isPlaying) {
        play();
      }
    },
    [duration, isPlaying, play]
  );

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_playbar btn prev"
            onClick={(e) => dispatch(changePlaySongAction(-1))}
          ></button>
          <button
            className="sprite_playbar btn play"
            onClick={(e) => play()}
          ></button>
          <button
            className="sprite_playbar btn next"
            onClick={(e) => dispatch(changePlaySongAction(1))}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <a href={`song/detail?ids=${songId}`} className="mask player-bar">
              <img src={getSizeImage(currentSong?.al?.picUrl, 34)} alt="" />
            </a>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar[0].name}</span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">
                  {formatMinuteSecond(currentTime * 1000)}
                </span>
                <span className="divider">/</span>
                <span className="total-time">
                  {formatMinuteSecond(duration)}
                </span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={playSequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button
              className="sprite_playbar btn loop"
              onClick={(e) =>
                dispatch(changePlaySequenceAction(playSequence + 1))
              }
            ></button>
            <button
              className="sprite_playbar btn playlist"
              onClick={(e) => setShowPanel(!showPanel)}
            >
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={timeEnded} />
      {showPanel && <AppPlayPanel />}
    </PlaybarWrapper>
  );
});
