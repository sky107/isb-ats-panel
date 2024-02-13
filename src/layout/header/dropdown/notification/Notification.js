import React, { useEffect,useState } from "react";
import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import http from "../../../../services/APICentral";
import dayjs from "dayjs";
import moment from "moment/moment";

const NotificationItem = (props) => {
  const { icon, iconStyle, text, time, id } = props;
  return (
    <div className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon">
        <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
      </div>
      <div className="nk-notification-content">
        <div className="nk-notification-text">{text}</div>
        <div className="d-flex" style={{flex:1,width:'100%',justifyContent:'space-between'}}>
        <div className="nk-notification-time">{moment(time).fromNow()} &nbsp; &nbsp; &nbsp;</div>
        <div className="nk-notification-time">{   moment(time).format('DD/MM/YYYY HH:mm A')  }</div>
        </div>
      </div>
    </div>
  );
};

const Notification = () => {


// 
const [ndata,setNData]=useState([]);
const [loading,setLoading]=useState(false);
const userId=localStorage.getItem('userId');

// useEffect(()=>{

//   http.get(`/fetch-notifications?id=${userId}`)
//   .then(({data})=>{

//     console.log('--->',data)
//     if(data?.success){
//       setNData(data?.data || [])
//     }else{
//       setNData([])
//     }
    

//   }).catch(error=>{


//   })


// },[])









  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div className="icon-status icon-status-info">
          <Icon name="bell" />
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">{data.title}</span>
          {/* <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            Mark All as Read
          </a> */}
        </div>
        <div className="dropdown-body">
          <div className="nk-notification">
            {ndata.map((item) => {
              return (
                <NotificationItem
                  key={item._id}
                  id={item._id}
                  icon={item.icon}
                  iconStyle={item.iconStyle}
                  text={item.message}
                  time={item.createdAt}
                />
              );
            })}
          </div>
        </div>
        {/* <div className="dropdown-foot center">
          <a href="#viewall" onClick={(ev) => ev.preventDefault()}>
            View All
          </a>
        </div> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
