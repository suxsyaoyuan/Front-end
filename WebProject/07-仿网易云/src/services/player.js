import request from "./axios";

export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids,
    },
  });
}

export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}

export function getSimiPlaylist(id) {
  return request({
    url: "/simi/playlist",
    params: {
      id,
    },
  });
}

export function getSimiSong(id) {
  return request({
    url: "/simi/song",
    params: {
      id,
    },
  });
}

// 相似歌曲
export function getSimilarSong(id) {
  return request({
    url: "/simi/song",
    params: {
      id,
    },
  });
}

// 包含这首歌的歌单
export function getSimilarAlbum(id) {
  return request({
    url: "/simi/playlist",
    params: {
      id,
    },
  });
}

// 歌曲评论
export function getSongComment(id, limit = 20, offset) {
  return request({
    url: "/comment/music",
    params: {
      id,
      limit,
      offset,
      timestamp: new Date().getTime(),
    },
  });
}
