import React from "react";
import { Card } from "reactstrap";
import { DefaultOrderStatistics } from "../charts/default/DefaultCharts";
import { useTranslation } from "react-i18next";

const OrderStatistics = (props) => {
  const {data}=props;
  const {t}=useTranslation();
  return (
    <Card className="card-full overflow-hidden">
      <div className="nk-ecwg nk-ecwg7 h-100">
        <div className="card-inner flex-grow-1">
          <div className="card-title-group mb-4">
            <div className="card-title">
              <h6 className="title">{t('Claims Statistics')}</h6>
            </div>
          </div>
          <div className="nk-ecwg7-ck">
            <DefaultOrderStatistics data={{
  labels: ["FRC Completed", "SDLC Approved", "Canclled"],
  dataUnit: "People",
  legend: false,
  datasets: [
    {
      borderColor: "#fff",
      backgroundColor: ["#0fac81",  "#816bff"],
      data: [data?.claimsCompletedByFRC,  data?.claimsApprovedBySDLC],
    },
  ],
}} />
          </div>
          <ul className="nk-ecwg7-legends">
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#0fac81" }}></span>
                <span>FRC Completed</span>
              </div>
            </li>
            <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#816bff" }}></span>
                <span>SDLC Approved</span>
              </div>
            </li>
            {/* <li>
              <div className="title">
                <span className="dot dot-lg sq" style={{ background: "#e85347" }}></span>
                <span>Canclled</span>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    </Card>
  );
};
export default OrderStatistics;
