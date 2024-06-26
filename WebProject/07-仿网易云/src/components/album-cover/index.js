import React, { memo } from "react";
import { Link } from "react-router-dom";
import { getSizeImage } from "@/utils/format-utils";
import { AlbumWrapper } from "./style";

export default memo(function AlbumCover(props) {
  const { info, size = "100px", width = "118px", bgp = "-570px" } = props;

  return (
    <AlbumWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, 150)} alt="" />
        <i className="play sprite_icon"></i>
        <Link to={`album/detail?id=${info.id}`} className="cover sprite_cover">
          {info.name}
        </Link>
      </div>
      <div className="album-info">
        <div className="name">{info.name}</div>
        <div className="artist">{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  );
});
