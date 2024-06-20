import React, { memo } from "react";

import TopBanner from "./c-cpns/top-banner";
import HotRecommend from "./c-cpns/hot-recommend";
import HYNewAlbum from "./c-cpns/new-album";
import RankingList from "./c-cpns/ranking-list";
import HYUserLogin from "./c-cpns/user-login";
import HYSettleSinger from "./c-cpns/settle-singer";
import HYHotRadio from "./c-cpns/hot-radio";
import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

export default memo(function Recommend() {
  return (
    <RecommendWraper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <HYNewAlbum />
          <RankingList />
        </RecommendLeft>
        <RecommendRight>
          <HYUserLogin />
          <HYSettleSinger />
          <HYHotRadio />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  );
});
