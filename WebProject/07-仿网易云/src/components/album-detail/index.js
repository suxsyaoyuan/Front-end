import React, { memo } from "react";

import { AlbumDetailWrapper } from "./style";
import AlbumHeader from "./c-cpns/album-header";
import AlbumMain from "./c-cpns/album-main";
import AlbumRight from "./c-cpns/album-right";

export default memo(function AlbumDetail() {
  return (
    <AlbumDetailWrapper className="wrap-v2 wrap-back">
      <div className="left wrap-v3">
        <AlbumHeader />
        <AlbumMain />
      </div>
      <div className="right wrap-v4">
        <AlbumRight />
      </div>
    </AlbumDetailWrapper>
  );
});
