import React, { useEffect, useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import SalesStatistics from "../components/partials/default/SalesStatistics";
import OrderStatistics from "../components/partials/default/OrderStatistics";
import StoreStatistics from "../components/partials/default/StoreStatistics";
import RecentOrders from "../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../components/partials/default/top-products/TopProducts";
import DataCard from "../components/partials/default/DataCard";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
  BlockDes,
} from "../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../components/partials/charts/default/DefaultCharts";
import http from "../services/APICentral";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Homepage = () => {
  const {t}=useTranslation();
  const [sm, updateSm] = useState(false);
  const [apiLoader,setAPILoader]=useState(false);


const [data,setData]=useState({

});


  useEffect(()=>{

    const userId=localStorage.getItem('userId');
    const token=localStorage.getItem('rfc-token')
    if(!token){
      window.location.replace('/auth-login')
    }
    setAPILoader(true);
      http.get(`/meta/home-page?id=${userId}`)
      .then(({data})=>{

        console.log(data)
        if(data.success){
          setData(data.data)
          localStorage.setItem("tehsil",data.data.user.state)
          localStorage.setItem("district",data.data.user.district)
          // console.log(data.data.user.state)
        }
        setAPILoader(false);
      })
      .catch(error=>{

      })
    
  },[])


useEffect(()=>{

  const isAdmin=localStorage.getItem('rfc-token');
  if(isAdmin===true){
    window.location.assign('/track-users')
  }

},[])








  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Dashboard
              </BlockTitle>
              <BlockDes className="text-soft"><p>Overview | Data Records using JharFRA Mobile App</p></BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
             
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        {/* <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle> */}
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="light">
                        <Icon name="help" />
                        <span>Helpdesk</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

      { true ?   <h2 style={{color:'green'}}>Coming Soon</h2> :<Block>
          
          <Row className="g-gs">
            <Col xxl="3" sm="6">
              <DataCard
                title={t("Total FRC")}
                // percentChange={"4.63"}
                // up={true}
                // chart={<DefaultOrderChart />}
                amount={data?.total_frc}
              />
            </Col>
            <Col xxl="3" sm="6">
            <DataCard
                title={t("Total Gram Sabha")}
                // percentChange={"4.63"}
                // up={true}
                // chart={<DefaultOrderChart />}
                amount={data?.total_gramsabha}
              />
            </Col>
           <Col xxl="3" sm="6">
            <DataCard
                title={t("Total Claims Completed by FRC")}
                // percentChange={"4.63"}
                // up={true}
                // chart={<DefaultOrderChart />}
                amount={data?.claimsCompletedByFRC}
              />
            </Col> 
            <Col xxl="3" sm="6">
            <DataCard
                title={t("No. of claims approved by SDLC")}
                // percentChange={"4.63"}
                // up={true}
                // chart={<DefaultOrderChart />}
                amount={data?.claimsApprovedBySDLC}
              />
            </Col>
            {/* <Col xxl="6">
              <SalesStatistics />
            </Col> */}
            <Col xxl="3" md="6">
              <OrderStatistics data={data}/>
            </Col>
            <Col xxl="3" md="6">
              <StoreStatistics data={data} />
            </Col>
            {/* <Col xxl="8">
              <RecentOrders />
            </Col> */}
            {/* <Col xxl="4" md="8" lg="6">
              <TopProducts />
            </Col> */}
          </Row>
        </Block>}
      </Content>
    </React.Fragment>
  );
};
export default Homepage;
