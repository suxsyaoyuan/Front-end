import React, { memo } from "react";
import PropTypes from "prop-types";

import { HeaderWrapper } from "./style";

const ThemeHeaderRCM2 = memo(function (props) {
  const { title, keywords, keywordClick } = props;

  return (
    <HeaderWrapper>
      <h3 className="title">{title}</h3>
      <div className="keyword">
        {keywords.map((item, index) => {
          return (
            <div className="item" key={item}>
              <span className="link" onClick={(e) => keywordClick(item)}>
                {item}
              </span>
              <span className="divider">|</span>
            </div>
          );
        })}
      </div>
    </HeaderWrapper>
  );
});

ThemeHeaderRCM2.defaultProps = {
  keywords: [],
};

ThemeHeaderRCM2.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array,
};

export default ThemeHeaderRCM2;
