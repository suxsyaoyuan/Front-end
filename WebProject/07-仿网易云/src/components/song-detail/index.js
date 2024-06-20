import React, { memo } from "react";
import { PlayerWrapper } from "./style";
import SongHeader from "../song-detail/song-header";
import SongMain from "../song-detail/song-main";
import SoneRight from "../song-detail/song-right";

export default memo(function SongDetail() {
  return (
    <PlayerWrapper className="wrap-v2 wrap-back">
      <div className="left">
        <SongHeader />
        <SongMain />
      </div>
      <div className="right">
        <SoneRight />
      </div>
    </PlayerWrapper>
  );
});
