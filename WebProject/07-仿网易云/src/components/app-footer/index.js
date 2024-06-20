import React, { memo } from "react";
import { footerLinks, footerImages } from "@/common/local-data";
import { AppFooterWrapper } from "./style";

export default memo(function HYAppFooter() {
  return (
    <AppFooterWrapper>
      <div className="wrap-v2 content">
        <div className="footertop">
          {footerImages.map((item) => {
            return (
              <li className="item" key={item.link}>
                <a
                  className="link"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                </a>
                <span className="title">{item.title}</span>
              </li>
            );
          })}
        </div>
        <div className="footerbottom">
          <div className="link">
            {footerLinks.map((item) => {
              return (
                <div key={item.title}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  <span className="line">|</span>
                </div>
              );
            })}
          </div>
          <div className="report">
            <span>廉政举报</span>
            <span>
              不良信息举报邮箱:
              <a
                href="mailto:51jubao@service.netease.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                51jubao@service.netease.com
              </a>
            </span>
            <span>客服热线：95163298</span>
          </div>
          <div className="info">
            <span>互联网宗教信息服务许可证：浙（2022）0000120</span>
            <span>增值电信业务经营许可证：浙B2-20150198 粤B2-20090191-18</span>
            <a
              href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
              rel="noopener noreferrer"
              target="_blank"
            >
              工业和信息化部备案管理系统网站
            </a>
          </div>
          <div className="copyright">
            <span>网易公司版权所有©1997-2024</span>
            <span>
              杭州乐读科技有限公司运营：
              <a
                href="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/32300744195/95ef/ee4a/a6ec/c561df43b2bdbf560e3517cd6f529150.png"
                rel="noopener noreferrer"
                target="_blank"
              >
                浙网文[2021] 1186-054号
              </a>
            </span>
            <span className="police-logo"></span>
            <span>浙公网安备 33010802013307号</span>
          </div>
        </div>
      </div>
    </AppFooterWrapper>
  );
});
