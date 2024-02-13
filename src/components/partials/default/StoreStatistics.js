import React from "react";
import { Card } from "reactstrap";
import { Icon } from "../../Component";
import { useTranslation } from "react-i18next";

const StoreStatistics = (props) => {
  const {data}=props;
  const {t}=useTranslation();
  return (
    <Card className="h-100">
      <div className="card-inner">
        <div className="card-title-group mb-2">
          <div className="card-title">
            <h6 className="title">{t('Your Profile')}</h6>
          </div>
        </div>
        <ul className="nk-store-statistics">
          <li className="item">
            <div className="info">
              <div className="title">{data?.user?.authLevel} | {data?.user?.postLevel} </div>
              <div className="count">{data?.user?.name}</div>
            </div>
            <Icon name="bag" className="bg-primary-dim"></Icon>
          </li>
          <li className="item">
            <div className="info">
              <div className="title">{data?.user?.state} </div>
              <div className="count">{data?.user?.district} </div>
            </div>
            <Icon name="users" className="bg-info-dim"></Icon>
          </li>
          <li className="item">
            <div className="info">
              <div className="title">Tehsil - {data?.user?.tehsil}</div>
              <div className="count">Panchayat - {data?.user?.panchayat}</div>
            </div>
            <Icon name="box" className="bg-pink-dim"></Icon>
          </li>
          <li className="item">
            <div className="info">
              <div className="title">Village - {data?.user?.village}</div>
              <div className="count">Mobile Number - {data?.user?.mobile}</div>
            </div>
            <Icon name="server" className="bg-purple-dim"></Icon>
          </li>
        </ul>
      </div>
    </Card>
  );
};
export default StoreStatistics;
