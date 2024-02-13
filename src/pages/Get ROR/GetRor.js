import React, { useState } from "react";
import { Button, Icon, RSelect, Row, } from "../../components/Component";
import axios from "axios";
import { PDFDocument } from 'react-pdf';
import { jsPDF } from "jspdf";
import {Spinner,Container} from 'reactstrap'
import { saveAs } from "file-saver";
import Logo1 from './Logos/newJrEmblem.jpeg';
import Logo2 from './Logos/Jharkhand Campaign Logo.png';
import { Link } from "react-router-dom";
 

function GetRor() {
  const [districtName, setDistrictName] = useState(null);
  const [circleName, setCircleName] = useState(null);
  const [halkaName, setHalkaName] = useState(null);
  const [maujaName, setMaujaName] = useState(null);
  const [circleArray, setCircleArray] = useState([]);
  const [halkaArray, setHalkaArray] = useState([]);
  const [maujaArray, setMaujaArray] = useState([]);
  const [downloadData,setDownloadData] = useState(null)
  const [isLoading,setLoadingTrue] = useState(false);

  const districtData = [
    {
      label: "Bokaro",
      value: "Bokaro",
    },
    {
      label: "Chatra",
      value: "Chatra",
    },
    {
      label: "Deoghar",
      value: "Deoghar",
    },
    {
      label: "Dhanbad",
      value: "Dhanbad",
    },
    {
      label: "Dumka",
      value: "Dumka",
    },
    {
      label: "East Singhbum",
      value: "East Singhbum",
    },
    {
      label: "Garhwa",
      value: "Garhwa",
    },
    {
      label: "Giridih",
      value: "Giridih",
    },
    {
      label: "Godda",
      value: "Godda",
    },
    {
      label: "Gumla",
      value: "Gumla",
    },
    {
      label: "Hazaribagh",
      value: "Hazaribagh",
    },
    {
      label: "Jamtara",
      value: "Jamtara",
    },
    {
      label: "Khunti",
      value: "Khunti",
    },
    {
      label: "Koderma",
      value: "Koderma",
    },
    {
      label: "Latehar",
      value: "Latehar",
    },
    {
      label: "Lohardaga",
      value: "Lohardaga",
    },
    {
      label: "Pakur",
      value: "Pakur",
    },
    {
      label: "Palamu",
      value: "Palamu",
    },
    {
      label: "Ramgarh",
      value: "Ramgarh",
    },
    {
      label: "Ranchi",
      value: "Ranchi",
    },
    {
      label: "Sahebganj",
      value: "Sahebganj",
    },
    {
      label: "Saraikela Kharsawan",
      value: "Saraikela Kharsawan",
    },
    {
      label: "Simdega",
      value: "Simdega",
    },
    {
      label: "West Singhbhum",
      value: "West Singhbhum",
    },
  ];


  // const API_ENDPOINT = "http://localhost:6000";
    //  const API_ENDPOINT="https://ror-1nuv.onrender.com" 
    //  const API_ENDPOINT="http://52.90.165.108:5000"
    const API_ENDPOINT="https://4kmtkz4pcv.us-east-1.awsapprunner.com"

  const DownloadROR = () =>{
    console.log(downloadData)
    console.log("downloading........",downloadData.data.Location)
    const pdfUrl = downloadData.data.Location;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "ROR.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    const requestData = {
        key: downloadData.Key,
      };
    // axios
    //         .post(`${API_ENDPOINT}/deleteRORFromS3`, requestData)
    //         .then((res) => {
    //           console.log("Success");
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         })
    //         .finally((f) => {
    //           // setLoading(false);
    //         });
  }
  return (
    <div>
          <div className="brand-logo pb-4 text-center">
          <Link  className="logo-link" style={{width:'100%',display:'flex',justifyContent:'space-between',padding:10}}>

             
            <img className="logo-dark" src='https://main.dhfckuchvowcs.amplifyapp.com/imagess/newJrEmblem.jpeg' alt="logo-dark"  style={{width:70}} />
            <h4 style={{}} > अबुआ बीर अबुआ दिशोम अभियान <br/><center><span style={{fontSize:14,marginTop:15}}>अधिकार अभिलेख</span></center></h4>
            <img className="logo-dark" src={Logo2} alt="logo-dark"  style={{width:85}} />
          </Link>
        </div>

        <p style={{fontStyle:'italic',color:'red'}}><center>Beta-Version</center></p>
        <div style={{paddingTop:15,paddingLeft:20,paddingRight:20,marginBottom:100}}>

        
      <label className="mt-2">जिले का नाम चुने</label>
      <RSelect
        // isDisabled={locationData?.tehsil}
        // value={{ label: block, value: block }}
        className="my-1"
        options={districtData}
        onChange={(e) => {
            setCircleArray([]);
            setHalkaArray([]);
            setMaujaArray([]);
            setCircleName(null);
            setDownloadData(null)
            setHalkaName(null);
            setMaujaName(null);
          setDistrictName(e.label);
          const requestData = {
            district: e.label,
          };
          axios
            .post(`${API_ENDPOINT}/Circles`, requestData)
            .then((res) => {
              console.log(res?.data);
              let temp = [];
              res?.data?.forEach((item) => {
                temp.push({
                  label: item,
                  value: item,
                });
              });
              setCircleArray(temp);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally((f) => {
              // setLoading(false);
            });
        }}
        // className="w-130px"
        // placeholder={`Select  ${t("tehsil/block")} (Block)`}
      />
      {circleArray.length != 0 ? (
        <>
          <label className="mt-2">अंचल का नाम चुने</label>
          <RSelect
            // isDisabled={locationData?.tehsil}
            // value={{ label: block, value: block }}
            className="my-1"
            options={circleArray}
            onChange={(e) => {
              setCircleName(e.label);
              setHalkaArray([]);
            setMaujaArray([]);
            setDownloadData(null)
            setHalkaName(null);
            setMaujaName(null);
              const requestData = {
                district: districtName,
                circle: e.label,
              };
              axios
                .post(`${API_ENDPOINT}/Halka`, requestData)
                .then((res) => {
                  console.log(res?.data);
                  let temp = [];
                  res?.data?.forEach((item) => {
                    temp.push({
                      label: item,
                      value: item,
                    });
                  });
                  setHalkaArray(temp);
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally((f) => {
                  // setLoading(false);
                });
            }}
            // className="w-130px"
            // placeholder={`Select  ${t("tehsil/block")} (Block)`}
          />
        </>
      ) :  (
        (districtName!==null && halkaName ===null)?
        
        <center style={{marginTop:10}}>

            <Spinner  color="primary"/>
        </center>
        :
        null
      )}
      {halkaArray.length !== 0 ? (
        <>
          <label className="mt-2"> हल्का का नाम चुने</label>
          <RSelect
            className="my-1"
            options={halkaArray}
            onChange={(e) => {
              setHalkaName(e.label);
              setMaujaArray([]);
              setDownloadData(null)
            setMaujaName(null);
              const requestData = {
                district: districtName,
                circle: circleName,
                halka: e.label,
              };
              axios
                .post(`${API_ENDPOINT}/Mauja`, requestData)
                .then((res) => {
                  console.log(res?.data);
                  let temp = [];
                  res?.data?.forEach((item) => {
                    temp.push({
                      label: item,
                      value: item,
                    });
                  });
                  setMaujaArray(temp);
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally((f) => {
                  // setLoading(false);
                });
            }}
            // className="w-130px"
            // placeholder={`Select  ${t("tehsil/block")} (Block)`}
          />
        </>
      ) :  (
        (circleName!==null && halkaName ===null)?
        <center style={{marginTop:10}}>

        <Spinner  color="primary"/>
    </center>
        :
        null
        )
      }
      {maujaArray.length !== 0 ? (
        <>
          <label className="mt-2">मौजा का नाम चुने</label>
          <RSelect
            className="my-1"
            options={maujaArray}
            onChange={(e) => {
              setMaujaName(e.label);
              setDownloadData(null)
              const requestData = {
                district: districtName,
                circle: circleName,
                halka: halkaName,
                maujaName: e.label,
              };
              axios
                .post(`${API_ENDPOINT}/getROR`, requestData)
                .then((res) => {
                  console.log(res);
                   setDownloadData(res)
                })
                .catch((err) => {
                  console.log(err);
                })
                .finally((f) => {
                  // setLoading(false);
                });
            }}
            
          />
        </>
      ) : (
        halkaName!==null && maujaName ===null
      )? <center style={{marginTop:10}}>

      <Spinner  color="primary"/>
  </center>
    :null}
      {
        downloadData!=null?
       <center>

           <Button style={{marginTop:10,padding:10,border:'1px solid green'}} onClick={()=>DownloadROR()}>अभिलेख डाउनलोड करें</Button>
       </center>
        :
        (
            maujaName!==null && downloadData === null
        )?
        <center style={{marginTop:10}}>

        <Spinner  color="primary"/>
    </center>
        :null
      }
      </div>
    </div>
  );
}

export default GetRor;
