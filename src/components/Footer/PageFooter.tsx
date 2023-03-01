import { Col, Divider, Row, Layout } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const { Footer } = Layout;

export default function PageFooter() {
  return (
    <div className="" id="pageFooter">
      <Footer className=" text-center">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div>
              <ul className="text-left list-none p-0 ml-10">
                <h1 className="mb-2.5 font-bold text-base text-gray-800 ">GIỚI THIỆU</h1>
                <li className="mb-2.5">
                  <NavLink className="{{no-underline}}" to="/">
                    Phương thức hoạt động của UTHBooking
                  </NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Trang tin tức</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Nhà đầu tư</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">UTHBooking plus</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">UTHBooking luxe</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">HotelTonight</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">UTHBooking for Work</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Nhờ có host, mọi điều đều có thể</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Cơ hội nghề nghiệp</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Thư của nhà sáng lập</NavLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <ul className="text-left list-none p-0 ml-10">
                <h5 className="mb-2.5 font-bold text-base text-gray-800">CỘNG ĐỒNG</h5>
                <li className="mb-2.5">
                  <NavLink to="/">Sự đa dạng và cảm giác thân thuộc</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">
                    Tiện nghi phù hợp cho người khuyết tật
                  </NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Đối tác liên kết UTHBooking</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Chỗ ở cho tuyến đầu</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Lượt giới thiệu của khách</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">UTHBooking.org</NavLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <ul className="text-left list-none p-0 ml-5">
                <h5 className="mb-2.5 font-bold text-base text-gray-800">ĐÓN TIẾP KHÁCH</h5>
                <li className="mb-2.5">
                  <NavLink to="/">Cho thuê nhà</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Tổ chức trải nghiệm trực tuyến</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Tổ chức trải nghiệm</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Đón tiếp khách có trách nhiệm</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Trung tâm tài nguyên</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Trung tâm cộng đồng</NavLink>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <ul className="text-left list-none p-0 ">
                <h5 className="mb-2.5 font-bold text-base text-gray-800">HỖ TRỢ</h5>
                <li className="mb-2.5">
                  <NavLink to="/">
                    Biện pháp ứng phó với đại dịch COVID-19 
                  </NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Trung tâm trợ giúp</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Các tùy chọn hủy</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Hỗ trợ khu dân cư</NavLink>
                </li>
                <li className="mb-2.5">
                  <NavLink to="/">Tin cậy và an toàn</NavLink>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div className="text-left">
              <ul className="w-100 text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:text-white ml-10">
                <li className="list-none mr-6 float-left">
                  @2022 UTHBooking, Inc. All rights reserved
                </li>
                <li className="mr-6 float-left">Quyền riêng tư</li>
                <li className="mr-6 float-left">Điều khoản</li>
                <li className="mr-6 float-left">Sơ đồ trang web</li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            {/* <div>col-6</div> */}
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="text-left">
              <ul className="w-50 text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:text-white list-none ">
                <li className="mr-6 ml-4 float-left ">
                  <NavLink to="/">
                    <i className="fa-brands fa-facebook-f text-xl"></i>
                  </NavLink>
                </li>
                <li className="mr-6 ml-4 float-left">
                  <NavLink  to="/">
                    <i className="fa-brands fa-twitter text-xl"></i>
                  </NavLink>
                </li>
                <li className="mr-6 ml-4 float-left ">
                  <NavLink to="/">
                    <i className="fa-brands fa-instagram  text-xl"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Footer>
    </div>
  );
}
