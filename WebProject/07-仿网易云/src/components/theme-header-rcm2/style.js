import styled from "styled-components";

export const HeaderWrapper = styled.div`
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  padding: 0 10px 5px 0px;
  background-position: -225px -156px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 24px;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  }

  .keyword {
    display: flex;

    .item {
      .divider {
        margin: 0 15px;
        color: #ccc;
      }
    }
  }
`;
