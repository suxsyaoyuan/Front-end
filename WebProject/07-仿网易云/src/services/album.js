import request from "./axios";

export function getHotAlbums() {
  return request({
    url: "/album/newest",
  });
}

export function getTopAlbums(area = "ALL", limit, offset = 0) {
  return request({
    url: "/album/new",
    params: {
      area,
      // ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
      limit,
      offset,
    },
  });
}

// 专辑详情
export function getAlbumDetail(id) {
  return request({
    url: "/album",
    params: {
      id,
    },
  });
}

// 专辑评论
export function getAlbumComment(id, limit, offset, before) {
  return request({
    url: "/comment/album",
    params: {
      id,
      limit,
      offset,
      before,
    },
  });
}
