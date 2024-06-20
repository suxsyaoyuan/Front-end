import React, { memo } from "react";

import PlayHeader from "./c-cpns/play-header";
import PlayList from "./c-cpns/play-list";
import LyricPanel from "./c-cpns/lyric-panel";
import { PanelWrapper } from "./style";

export default memo(function AppPlayList() {
  return (
    <PanelWrapper>
      <PlayHeader />
      <div className="main">
        <PlayList />
        <LyricPanel />
      </div>
    </PanelWrapper>
  );
});
