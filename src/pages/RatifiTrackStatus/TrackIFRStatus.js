import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import WizardForm from "../components/forms/WizardForm";
import { Button, Icon, RSelect } from "../../components/Component";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, Spinner, Alert } from "reactstrap";
import TabsPage from "../components/Tabs";
import i18n from "../../i18n";
import NumberSpinner from "../components/forms/NumberSpinner";
import useJharkhandData from "../../hooks/useJharkhandData";
import http from "../../services/APICentral";
import { set } from "react-hook-form";
import TabsPageIFR from "../components/TabsIFR";

const FormStepper = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeIconTab, setActiveIconTab] = useState("5");
  const [apiLoader, setAPILoader] = useState(false);
  const [activeAltTab, setActiveAltTab] = useState("9");
  const [verticalTab, setVerticalTab] = useState("1");
  const [verticalIconTab, setVerticalIconTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
  const toggleAltTab = (alttab) => {
    if (activeAltTab !== alttab) setActiveAltTab(alttab);
  };

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classNames({ active: activeIconTab === "5" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleIconTab("5");
            }}
          >
            <Icon name="user" /> <span>Personal</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeIconTab === "6" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleIconTab("6");
            }}
          >
            <Icon name="lock-alt" /> <span>Security</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeIconTab === "7" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleIconTab("7");
            }}
          >
            <Icon name="bell" /> <span>Notifications</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag="a"
            href="#tab"
            className={classnames({ active: activeIconTab === "8" })}
            onClick={(ev) => {
              ev.preventDefault();
              toggleIconTab("8");
            }}
          >
            <Icon name="link" /> <span>Connect</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeIconTab}>
        <TabPane tabId="1">
          <p> Some text for tab 1 </p>
        </TabPane>
        <TabPane tabId="2">
          <p> Some text for tab 2 </p>
        </TabPane>
        <TabPane tabId="3">
          <p> Some text for tab 3 </p>
        </TabPane>
        <TabPane tabId="4">
          <p> Some text for tab 4 </p>
        </TabPane>
      </TabContent>
    </>
  );
};

const TrackStatus = () => {
  const { t } = useTranslation();
  const [level, setLevel] = useState();
  useEffect(() => {
    i18n.changeLanguage("hi");
    const val = JSON.parse(localStorage.getItem("rfc-ac"));
    setLevel(val);
  }, []);
  const district = localStorage.getItem("district");
  console.log("userrrrrrrrrr------------------->>>>>>>>>>>>", localStorage.getItem("district"));
  const [states, panchayatToVillageMapping] = useJharkhandData();

  // const [dropdownOpen,setDropdownOpen]=useState(false);
  // const [dropdownToggle,
  const [block, setBlock] = useState();
  const [gramSabha, setGramSabha] = useState();
  const [panchayat, setPanchayat] = useState();
  const [trackStatusClicked, setT] = useState(false);
  const [trackIFRClicked, setTrackIFRClicked] = useState(false);
  const [ifrData, setIFRData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latestClaimId, setLatestClaimId] = useState("");
  const [data, setData] = useState(null);
  console.log("data===============>>>>>>>>>>>", data);

  const onClickIFRData = (data) => {
    setIFRData(data);
    setTrackIFRClicked(true);
  };
  //   console.log(typeof(ifrData[2].IFRclaims))
  return (
    <React.Fragment>
      <Head title="Track Status" />
      <Content>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h6>
            {t("IFR Status")} ({level?.authLevel}){" "}
          </h6>
          <Alert className="alert-icon" color="light">
            <Icon name="alert-circle" />
            <h6> {level?.authLevel} </h6>
          </Alert>
        </div>

        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <label className="mt-2">{t("tehsil/block")}</label>
          <RSelect
            className="my-1"
            options={states[0]?.Districts?.length && states[0]?.Districts[0]?.Tehsils}
            // className="w-130px"
            placeholder={`Select  ${t("tehsil/block")} (Block)`}
            onChange={(e) => {
              setBlock(e.label);
            }}
          />
          <label className="mt-2">{t("Panchayat")}</label>
          <RSelect
            options={
              states
                ?.filter((item) => item.label === t("Jharkhand"))
                ?.map((item) => {
                  return item.Districts;
                })[0]
                ?.filter((item) => item.label === t("Samdega"))
                ?.map((item) => {
                  return item.Tehsils;
                })[0]
                ?.filter((item) => item.label === t(block))
                ?.map((item) => {
                  return item.Panchayats;
                })[0]
            }
            // className="w-130px"
            placeholder={`Select  ${t("panchayat")}`}
            onChange={(e) => setPanchayat(e.label)}
          />

          <label className="mt-2">{t("FRC")}</label>

          <RSelect
            getOptionValue={(option) => option?.label}
            options={
              panchayat === "बरकाडुएल"
                ? [
                    {
                      label: t("Badkaduel"),
                      value: "1",
                    },
                    {
                      label: t("Barerpa"),
                      value: "2",
                    },
                    {
                      label: t("Chhotkaduel"),
                      value: "3",
                    },
                    {
                      label: t("Kudrum"),
                      value: "4",
                    },
                    {
                      label: t("Lamgarh"),
                      value: "5",
                    },
                    {
                      label: t("Maimsora"),
                      value: "6",
                    },
                    {
                      label: t("Navagaon"),
                      value: "7",
                    },
                  ]
                : panchayatToVillageMapping[panchayat]
                ? panchayatToVillageMapping[panchayat]
                : []
            }
            // className="w-130px"
            placeholder={`Select  ${t("gram sabha")}`}
            onChange={(e) => setGramSabha(e.label)}
          />

          <Button
            disabled={loading || !gramSabha}
            color="secondary"
            className="center my-1"
            onClick={() => {
              setLoading(true);
              setIFRData(null)
              // fetch claims of that gramsabha/frc

              http
                .post("/get-ifr-claims", {
                  district: localStorage.getItem("district"),
                  tehsil: block,
                  panchayat: panchayat,
                  village: gramSabha,
                })
                .then(({ data }) => {
                  console.log("actual data---------------->>>>>>>>", JSON.stringify(data));
                  if (data?.length > 0) {
                    // alert(JSON.stringify(data))
                    console.log("setting data....");
                    setData(data);
                  } else {
                    setData(null);
                    setLatestClaimId("x");
                  }
                })
                .catch((error) => {
                  alert("FAiled");
                  console.log(error);
                })
                .finally((f) => {
                  setLoading(false);
                  setT(true);
                });
            }}
          >
            {t("Track Status")} &nbsp;
            {loading && <Spinner size="sm" color="light" />}
          </Button>
        </div>

        {Boolean(trackStatusClicked && loading === false) ? (
          <div>
            {/* <TabsPage gramSabha={gramSabha} latestClaimId={latestClaimId} /> */}
            {data ? (
              data.map((item) => {
                return <Button onClick={() => setLatestClaimId(item._id)}>{item.name}</Button>;
              })
            ) : (
              <center>
                <p style={{backgroundColor:'#dbdfea', color:'black',padding:'10px'}}>
              No IFR Claims Found!!
                    </p>
              </center>
            )}
          </div>
        ) : loading ? (
          <div className="d-flex center text-align-center mt-4  flex-1 justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : null}
        {
            <TabsPageIFR gramSabha={gramSabha} latestClaimId={latestClaimId} />
        }
      
      </Content>
    </React.Fragment>
  );
};

export default TrackStatus;
