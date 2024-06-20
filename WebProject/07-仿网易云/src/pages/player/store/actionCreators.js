import * as actionTypes from "./constants";

import {
  getSongDetail,
  getLyric,
  getSimiPlaylist,
  getSimiSong,
} from "@/services/player";
import { parseLyric } from "@/utils/lrc-parse";

export const changeCurrentSongAction = (song) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  song,
});

export const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index,
});

export const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList: playList,
});

export const changeLyricsAction = (lyrics) => ({
  type: actionTypes.CHANGE_LYRICS,
  lyrics,
});

export const changeSimiPlaylistAction = (res) => ({
  type: actionTypes.CHANGE_SIMI_PLAYLIST,
  simiPlaylist: res.playlists,
});

export const changeSimiSongsAction = (res) => ({
  type: actionTypes.CHANGE_SIMI_SONGS,
  simiSongs: res.songs,
});

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index,
});

// 首次加载Action
export const changeFirstLoad = (isFirstLoad) => ({
  type: actionTypes.CHANGE_FIRST_LOAD,
  isLoad: isFirstLoad,
});

export const changePlaySequenceAction = (currentSequence) => {
  if (currentSequence === 3) currentSequence = 0;
  return {
    type: actionTypes.CHANGE_PLAY_SEQUENCE,
    sequence: currentSequence,
  };
};

export const changePlaySongAction = (tag) => {
  return (dispatch, getState) => {
    // 1.获取当前的index
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    const playSequence = getState().getIn(["player", "playSequence"]);
    const playList = getState().getIn(["player", "playList"]);

    // 2.判断当前播放列表
    switch (playSequence) {
      case 1:
        currentSongIndex = Math.floor(Math.random() * playList.length);
        break;
      default:
        currentSongIndex += tag;
        if (currentSongIndex === playList.length) currentSongIndex = 0;
        if (currentSongIndex === -1) currentSongIndex = playList.length - 1;
    }

    // 3.处理修改数据
    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongIndexAction(currentSongIndex));
    dispatch(changeCurrentSongAction(currentSong));

    // 获取当前的歌词,并且解析
    getLyric(currentSong.id).then((res) => {
      const lrcString = res.lrc.lyric;
      const lyrics = parseLyric(lrcString);
      dispatch(changeLyricsAction(lyrics));
    });
  };
};

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 1.判断是否歌曲存在playList中
    const playList = getState().getIn(["player", "playList"]);

    const songIndex = playList.findIndex((song) => song.id === ids);
    if (songIndex !== -1) {
      // 找到数据
      const currentSong = playList[songIndex];
      dispatch(changeCurrentSongIndexAction(songIndex));
      dispatch(changeCurrentSongAction(currentSong));
    } else {
      // 未找到数据
      getSongDetail(ids).then((res) => {
        const song = res.songs && res.songs[0];
        if (!song) return;
        // 1.添加到playList中
        const newPlayList = [...playList];
        newPlayList.push(song);
        dispatch(changePlayListAction(newPlayList));
        // 2.改变当前index
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        dispatch(changeCurrentSongAction(song));
      });
    }

    // 获取当前的歌词,并且解析
    getLyric(ids).then((res) => {
      const lrcString = res.lrc.lyric;
      const lyrics = parseLyric(lrcString);
      dispatch(changeLyricsAction(lyrics));
    });
  };
};

export const getSimiPlaylistAction = () => {
  return (dispatch, getState) => {
    const id = getState().getIn(["player", "currentSong"]).id;
    if (!id) return;

    getSimiPlaylist(id).then((res) => {
      dispatch(changeSimiPlaylistAction(res));
    });
  };
};

export const getSimiSongAction = () => {
  return (dispatch, getState) => {
    const id = getState().getIn(["player", "currentSong"]).id;
    if (!id) return;

    getSimiSong(id).then((res) => {
      dispatch(changeSimiSongsAction(res));
    });
  };
};

// 新增的播放整个榜单的Action
export const playRankingListAction = (playlist) => {
  return (dispatch) => {
    if (playlist.length === 0) return;

    // 1.设置播放列表
    dispatch(changePlayListAction(playlist));

    // 2.设置当前播放歌曲为播放列表中的第一首歌
    const firstSong = playlist[0];
    dispatch(changeCurrentSongIndexAction(0));
    dispatch(changeCurrentSongAction(firstSong));

    // 3.获取并设置歌词
    getLyric(firstSong.id).then((res) => {
      const lrcString = res.lrc.lyric;
      const lyrics = parseLyric(lrcString);
      dispatch(changeLyricsAction(lyrics));
    });
  };
};
