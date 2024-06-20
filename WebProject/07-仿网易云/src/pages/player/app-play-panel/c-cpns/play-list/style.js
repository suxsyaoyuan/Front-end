import styled from "styled-components";

export const PlayListWrapper = styled.div`
  position: relative;
  width: 553px;
  padding: 2px;

  .play-item {
    padding: 0 8px 0 25px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    line-height: 28px;
    color: #ccc;

    &.active {
      color: #fff;
      background-color: #000;

      ::before {
        content: "";
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${require("@/assets/img/playlist_sprite.png")}) -182px 0;
      }
    }
    &:hover {
      .control-and-singer {
        display: flex;
      }
      cursor: pointer;
      color: #fff;
      background-color: #000;
      }
    }

    .control-and-singer {
      display: none;
      margin-right: 5px;

      .anticon-delete,
      .anticon-download,
      .anticon-like,
      .anticon-github {
        opacity: 0;
        color: #ccc;
        font-size: 14px;
        margin: 2px;
      }

      .anticon-delete:hover,
      .anticon-download:hover,
      span:hover,
      .anticon-like:hover,
      .anticon-github:hover {
        color: #fff;
      }
    }
    &:hover .anticon-delete,
    &:hover .anticon-download,
    &:hover .anticon-like,
    &:hover .anticon-github {
      opacity: 1;
    }

    .right {
      display: flex;
      align-items: center;

      .singer {
        width: 80px;
      }

      .duration {
        width: 45px;
      }

      .link {
        margin-left: 20px;
        width: 14px;
        height: 16px;
        background-position: -100px 0;
      }
    }
  }
`;
