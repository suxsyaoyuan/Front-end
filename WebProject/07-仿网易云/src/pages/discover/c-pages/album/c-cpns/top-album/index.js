import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getTopAlbumsAction } from "../../store/actionCreators";

import ThemeHeaderRCM2 from "@/components/theme-header-rcm2";
import AlbumCover from "@/components/album-cover";
import MPagination from "@/components/pagination";
import { TopAlbumWrapper } from "./style";
import { AlbumkeywordsMapping } from "@/common/local-data";

export default memo(function HYTopAlbum() {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const area = params.get("area");

  const { topAlbums, total } = useSelector(
    (state) => ({
      topAlbums: state.getIn(["album", "topAlbums"]),
      total: state.getIn(["album", "topTotal"]),
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getTopAlbumsAction(1, area));
  }, [dispatch, area]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(getTopAlbumsAction(page, area));
  };

  const keywordClick = useCallback(
    (keyword) => {
      const englishName = AlbumkeywordsMapping[keyword];
      history.push(`/discover/album/?area=${englishName}`);
    },
    [history]
  );

  return (
    <TopAlbumWrapper>
      <ThemeHeaderRCM2
        title="全部新碟"
        keywords={Object.keys(AlbumkeywordsMapping)}
        keywordClick={keywordClick}
      />
      <div className="album-list">
        {topAlbums &&
          topAlbums.map((item, index) => (
            <AlbumCover
              size={"130px"}
              width={"153px"}
              bgp={"-845px"}
              key={item.id}
              info={item}
            />
          ))}
      </div>
      <MPagination
        currentPage={currentPage}
        total={total}
        pageSize={30}
        onPageChange={onPageChange}
      />
    </TopAlbumWrapper>
  );
});
