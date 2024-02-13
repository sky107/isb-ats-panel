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
import axios from "axios";

const FormStepper = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeIconTab, setActiveIconTab] = useState("5");
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

  const [states, panchayatToVillageMapping] = useJharkhandData();

  // const [dropdownOpen,setDropdownOpen]=useState(false);
  // const [dropdownToggle,
  const [block, setBlock] = useState();
  const [gramSabha, setGramSabha] = useState();
  const [panchayat, setPanchayat] = useState();
  const [trackStatusClicked, setT] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestClaimId, setLatestClaimId] = useState("");
  const [locationData, setLocationData] = useState({});

  // useEffect(() => {
  //   const d = JSON.parse(localStorage.getItem("rfc-location"));
  //   setLocationData(d);
  //   setBlock(d?.tehsil);
  //   setPanchayat(d?.panchayat);
  //   setGramSabha(d?.village);
  // }, []);

  const [district, setDistrict] = useState('Please select the district');
  const [districtData, setDistrictData] = useState([]);

  const [subdivison, setSubDivison] = useState(null);
  const [subdivisonData, setSubDivisonData] = useState([]);

  const [blockData, setBlockData] = useState([]);

  const [panchayatData, setPanchayatData] = useState([]);

  const [villageData, setVillageData] = useState([]);

  useEffect(() => {

    setDistrictData([]);
    setSubDivison([]);
    setBlockData([]);
    setPanchayatData([]);
    setVillageData([]);
    setLoading(true);

    axios
      .get("https://4kmtkz4pcv.us-east-1.awsapprunner.com/lgd")
      .then((res) => {
        console.warn(res?.data?.data);
        let dst = [];
        res?.data?.data?.forEach((item) => {
          dst.push({
            label: item["district name"],
            value: item["district name"],
          });
        });
        setDistrictData(dst);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(f=>{
        setLoading(false);
      })
  }, []);

  return (
    <React.Fragment>
      <Head title="Track Status" />
      <Content>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h6>
            {t("CFR & CR Status")} ({level?.authLevel}){" "}
          </h6>
          <Alert className="alert-icon" color="light">
            <Icon name="alert-circle" />
            <h6> {level?.authLevel} </h6>
          </Alert>
        </div>

        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          {Boolean(districtData?.length !== 0) && (
            <>
              <label className="mt-2">{t("district")}</label>
              <RSelect
                // isDisabled={locationData?.tehsil}
                value={{ label: district, value: district }}
                className="my-1"
                options={districtData}
                // className="w-130px"
                placeholder={`Select District`}
                onChange={(e) => {
                  setDistrict(e.label);
                  setSubDivison([]);
                  setBlockData([]);
                  setPanchayatData([]);
                  setVillageData([]);
                  const LAMBDA_URL = "https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=";
                  const qq = `SELECT distinct "subdivison" FROM jharfratable WHERE "district name" = '${e.label}'`;
                  const uu = LAMBDA_URL + encodeURIComponent(qq);
                  setLoading(true);
                  axios
                    .get(`https://4kmtkz4pcv.us-east-1.awsapprunner.com/lgd?q=${uu}`)
                    .then((res) => {
                      console.warn(res?.data?.data);
                      let sd = [];
                      res?.data?.data?.forEach((item) => {
                        sd.push({
                          label: item["subdivison"],
                          value: item["subdivison"],
                        });
                      });
                      setSubDivisonData(sd);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .finally(f=>{
                      setLoading(false);
                    })
                }}
              />
            </>
          )}

          {Boolean(subdivisonData?.length !== 0) && (
            <>
              <label className="mt-2">{t("Subdivison")}</label>
              <RSelect
                // isDisabled={locationData?.tehsil}
                // value={{label:locationData?.tehsil,value:locationData?.tehsil}}
                className="my-1"
                options={subdivisonData}
                // className="w-130px"
                placeholder={`Select Subdivison`}
                onChange={(e) => {
                  setSubDivison(e.label);
                  setBlockData([]);
                  setPanchayatData([]);
                  setVillageData([]);

                  const LAMBDA_URL = "https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=";
                  const qq = `SELECT distinct "block name" FROM jharfratable WHERE "district name" = '${district}' AND "subdivison" = '${e.label}'  `;
                  const uu = LAMBDA_URL + encodeURIComponent(qq);

                  setLoading(true);
                  axios
                    .get(`https://4kmtkz4pcv.us-east-1.awsapprunner.com/lgd?q=${uu}`)
                    .then((res) => {
                      console.warn(res?.data?.data);
                      let bd = [];
                      res?.data?.data?.forEach((item) => {
                        bd.push({
                          label: item["block name"],
                          value: item["block name"],
                        });
                      });
                      setBlockData(bd);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .finally(f=>{
                      setLoading(false);
                    })
                }}
              />
            </>
          )}

          {Boolean(blockData?.length !== 0) && (
            <>
              {" "}
              <label className="mt-2">{t("tehsil/block")}</label>
              <RSelect
                // isDisabled={locationData?.tehsil}
                value={{ label: block, value: block }}
                className="my-1"
                options={blockData}
                // className="w-130px"
                placeholder={`Select  ${t("tehsil/block")} (Block)`}
                onChange={(e) => {
                  setBlock(e.label);

                  // setSubDivison([]);
                  // setBlockData([]);
                  setPanchayatData([]);
                  setVillageData([]);
                  // call the panchayat

                  const LAMBDA_URL = "https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=";
                  // const qq = `SELECT distinct "block name" FROM jharfratable WHERE "district name" = '${district}' AND "subdivison" = '${e.label}'  `;
                  const qq = `SELECT distinct "local body name" FROM jharfratable WHERE "district name" = '${district}' AND "subdivison" = '${subdivison}' AND "block name" ='${e.label}'  `;

                  const uu = LAMBDA_URL + encodeURIComponent(qq);
                  setLoading(true);
                  axios
                    .get(`https://4kmtkz4pcv.us-east-1.awsapprunner.com/lgd?q=${uu}`)
                    .then((res) => {
                      console.warn(res?.data?.data);
                      let pd = [];
                      res?.data?.data?.forEach((item) => {
                        pd.push({
                          label: item["local body name"],
                          value: item["local body name"],
                        });
                      });
                      setPanchayatData(pd);
                    })
                    .catch((err) => {
                      console.log(err);
                    }).finally(f=>{
                      setLoading(false);
                    })
                }}
              />
            </>
          )}

          {Boolean(panchayatData?.length !== 0) && (
            <>
              {" "}
              <label className="mt-2">{t("Panchayat")}</label>
              <RSelect
                // isDisabled={locationData?.panchayat}
                value={{ label: panchayat, value: panchayat }}
                options={panchayatData}
                // className="w-130px"
                placeholder={`Select  ${t("panchayat")}`}
                onChange={(e) => {
                  setPanchayat(e.label);

                  // setPanchayatData([]);
                  setVillageData([]);

                  const LAMBDA_URL = "https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=";
                  // const qq = `SELECT distinct "block name" FROM jharfratable WHERE "district name" = '${district}' AND "subdivison" = '${e.label}'  `;
                  const qq = `SELECT distinct "village name" FROM jharfratable WHERE "district name" = '${district}' AND "subdivison" = '${subdivison}' AND "block name" ='${block}' AND "local body name"='${e.label}'`;

                  const uu = LAMBDA_URL + encodeURIComponent(qq);
                  setLoading(true);
                  axios
                    .get(`https://4kmtkz4pcv.us-east-1.awsapprunner.com/lgd?q=${uu}`)
                    .then((res) => {
                      console.warn(res?.data?.data);
                      let vd = [];
                      res?.data?.data?.forEach((item) => {
                        vd.push({
                          label: item["village name"],
                          value: item["village name"],
                        });
                      });
                      setVillageData(vd);
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                    .finally(f=>{
                      setLoading(false);
                    })
                    
                }}
              />{" "}
            </>
          )}

          {Boolean(villageData?.length !== 0) && (
            <>
              <label className="mt-2">{t("FRC")}</label>

              <RSelect
                value={{ label: gramSabha, value: gramSabha }}
                options={villageData}
                // className="w-130px"
                placeholder={`Select  ${t("gram sabha")}`}
                onChange={(e) => setGramSabha(e.label)}
              />
            </>
          )}

          <Button
            disabled={loading || !gramSabha}
            color="secondary"
            className="center my-1"
            onClick={() => {
              setLoading(true);

              // fetch claims of that gramsabha/frc

              http
                .post("/claims-by-frc", {
                  frc: gramSabha,
                })
                .then(({ data }) => {
                  // alert(JSON.stringify(data))
                  if((level?.authLevel==='डीएलसी') && (data?.data?.length>0) && (data?.data[data?.data?.length - 1]?.sdlcApproved === false)){
                    setLatestClaimId('y');
                  }else if (data?.data?.length > 0) {setLatestClaimId(data?.data[data?.data?.length - 1]?._id);}
                  else{ setLatestClaimId("x");}
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
            <TabsPage gramSabha={gramSabha} latestClaimId={latestClaimId} />
          </div>
        ) : loading ? (
          <div className="d-flex center text-align-center mt-4  flex-1 justify-content-center">
            <Spinner color="primary" />
          </div>
        ) : null}
      </Content>
    </React.Fragment>
  );
};

export default TrackStatus;