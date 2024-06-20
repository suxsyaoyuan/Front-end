import * as actionTypes from "./constants";

import { getHotAlbums, getTopAlbums } from "@/services/album.js";

const changeHotAlbumsAction = (res) => ({
  type: actionTypes.CHANGE_HOT_ALBUMS,
  hotAlbums: res.albums,
});

const changeTopAlbumAction = (res) => ({
  type: actionTypes.CHANGE_TOP_ALBUMS,
  topAlbums: res.albums,
});

const changeTopTotalAction = (total) => ({
  type: actionTypes.CHANGE_TOP_TOTAL,
  total: total,
});

export const getHotAlbumsAction = () => {
  return (dispatch) => {
    getHotAlbums().then((res) => {
      dispatch(changeHotAlbumsAction(res));
    });
  };
};

export const getTopAlbumsAction = (page, area = "ALL") => {
  return (dispatch) => {
    getTopAlbums(area, 30, (page - 1) * 30).then((res) => {
      // console.log(res);
      dispatch(changeTopAlbumAction(res));
      dispatch(changeTopTotalAction(res.total));
    });
  };
};
