import styled from "styled-components";

export const AppFooterWrapper = styled.div`
  height: 172px;
  background-color: #f2f2f2;
  color: #666;
  border-top: 1px solid #d3d3d3;
  .content {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */

    .footertop {
      display: flex;
      justify-content: center;
      gap: 50px;
      margin: 33px 0;

      .item {
        .link {
          display: block;
          width: 50px;
          height: 50px;
          margin: 0 -5px;
          background-size: 220px 220px;
          background-image: url(${require("@/assets/img/foot_enter_new2.png")});
        }
        :nth-child(1) .link {
          background-position: -170px -5px;
          &:hover {
            background-position: -5px -115px;
          }
        }
        :nth-child(2) .link {
          background-position: -5px -170px;
          &:hover {
            background-position: -60px -170px;
          }
        }
        :nth-child(3) .link {
          background-position: -5px -60px;
          &:hover {
            background-position: -115px -5px;
          }
        }
        :nth-child(4) .link {
          background-size: 44px 44px;
          background-image: url(${require("@/assets/img/xStudio.png")});
          background-repeat: no-repeat;
          &:hover {
            background-image: url(${require("@/assets/img/xStudioHover.png")});
          }
        }
        :nth-child(5) .link {
          background-position: -60px -60px;
          &:hover {
            background-position: -115px -5px;
          }
        }
        :nth-child(6) .link {
          background-position: -115px -115px;
          &:hover {
            background-position: -5px -5px;
          }
        }
        :nth-child(7) .link {
          background-size: 44px 44px;
          background-repeat: no-repeat;
          background-image: url(${require("@/assets/img/cloudSong.png")});
          &:hover {
            background-image: url(${require("@/assets/img/cloudSongHover.png")});
          }
        }
        :nth-child(8) .link {
          background-position: -170px -115px;
          &:hover {
            background-position: -60px -115px;
          }
        }

        .title {
          display: block;
          width: 100px;
          margin-top: 10px;
          margin-left: -27.5px;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .footerbottom {
      line-height: 24px;
      padding: 60px 0;

      .link {
        display: flex;
        justify-content: center;

        a {
          color: #999;
        }

        .line {
          margin: 0 10px;
          color: #999;
        }
      }

      .copyright,
      .report,
      .info {
        display: flex;
        justify-content: center;
        span {
          margin-right: 15px;
        }
      }
      .police-logo {
        background: url(${require("@/assets/img/police.png")}) no-repeat;
        width: 14px;
        height: 14px;
        background-size: cover;
        margin-top: 4px;
      }

      .copyright span:nth-child(3) {
        margin-right: 4px;
      }

      .info a {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
