import React, { memo } from "react";
import { getSizeImage } from "@/utils/format-utils";

import { ItemWrapper } from "./style";
import { Divider } from "antd";

export default memo(function ArtistItemV1(props) {
  const { info, index } = props;

  return (
    <ItemWrapper>
      {index < 10 && (
        <div className="image">
          <img src={getSizeImage(info.img1v1Url, 130)} alt="" />
        </div>
      )}
      <div className="info">
        <span className="name">{info.name}</span>
        <i className="sprite_icon2 icon"></i>
      </div>
      {index === 9 && <Divider dashed />}
    </ItemWrapper>
  );
});
