import request from "./axios";

export function getArtistList(area, type, initial) {
  let url = "/artist/list";
  let params = { limit: 100 };
  if (area === -1 && type === 1) {
    url = "/top/artists";
  } else {
    if (area === -1) {
      params = { limit: 100, cat: 5001 };
    } else {
      params = {
        type,
        area,
        initial,
        limit: 100,
      };
    }
  }

  console.log("url:", url, "params:", params);

  return request({
    url,
    params,
  });
}

// 歌手详情
export function getArtistDetail(id) {
  return request({
    url: "/artist/detail",
    params: {
      id,
    },
  });
}

// 歌手热门50首
export function getArtistSong(id) {
  return request({
    url: "/artist/top/song",
    params: {
      id,
    },
  });
}

// 歌手mv
export function getArtistMovie(id) {
  return request({
    url: "/artist/mv",
    params: {
      id,
    },
  });
}

// 歌手描述
export function getArtistDesc(id) {
  return request({
    url: "/artist/desc",
    params: {
      id,
    },
  });
}

// 歌手描述
export function getArtistAlbum(id, limit, offset) {
  return request({
    url: "/artist/album",
    params: {
      id,
      limit,
      offset,
    },
  });
}
