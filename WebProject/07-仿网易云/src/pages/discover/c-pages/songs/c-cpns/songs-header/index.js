import React, { useState, memo } from "react";
import { useSelector, shallowEqual } from "react-redux";

import SongsCategory from "../songs-category";
import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style";

export default memo(function SongsHeader() {
  // hooks
  const [showCategory, setShowCategory] = useState(false);

  // redux
  const { currentCategory } = useSelector(
    (state) => ({
      currentCategory: state.getIn(["songs", "currentCategory"]),
    }),
    shallowEqual
  );

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span className="title">
          {currentCategory ? currentCategory : "全部"}
        </span>
        <button
          className="select"
          onClick={(e) => setShowCategory(!showCategory)}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {showCategory ? <SongsCategory /> : null}
      </HeaderLeft>
      <HeaderRight>
        <button className="hot">热门</button>
      </HeaderRight>
    </HeaderWrapper>
  );
});
