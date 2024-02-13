import React, { useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import Icon from "../../components/icon/Icon";
import classnames from "classnames";
import { Document } from "react-pdf";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, Input, Alert,Spinner } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../components/preview/Preview";
import { Button, UserAvatar } from "../../components/Component";
import { findUpper } from "../../utils/Utils";
import http from "../../services/APICentral";
import moment from "moment";
import axios from "axios";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import * as RSUITE from 'rsuite';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import default style
import 'rsuite/dist/rsuite.min.css';
 // or 

const TabsPage = ({ ...props }) => {
  const swiper=useSwiper();
  const [refreshLoading,setRefreshLoading]=useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sdlcNotApprovedReason, setSDLCNotApprovedReason] = useState("");
  const [isSDLCApproved, setIsSDLCApproved] = useState(false);
  const [claimData, setClaimData] = useState([]);
  const [commentsData, setCommentsData] = useState([1, 2]);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("0");
  const [activeIconTab, setActiveIconTab] = useState("5");
  const [activeAltTab, setActiveAltTab] = useState("9");
  const [verticalTab, setVerticalTab] = useState("1");
  const [verticalIconTab, setVerticalIconTab] = useState("1");
  const [sendCommentsLoading,setSendCommentsLoading]=useState(false);
  const [commentError,setCommentError]=useState('');

  const [activeStage,setActiveStage]=useState(1);
  const [currentStageDocs,setCurrentStageDocs]=useState([]);

  const [forestLoading,setForestLoading]=useState({a:false,b:false})
  const [revenueLoading,setRevenueLoading]=useState({a:false,b:false})

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const toggleIconTab = (icontab) => {
    if (activeIconTab !== icontab) setActiveIconTab(icontab);
  };
  const toggleAltTab = (alttab) => {
    if (activeAltTab !== alttab) setActiveAltTab(alttab);
  };

  const [u, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uid,setUid]=useState('');

  useEffect(() => {
    const us = JSON.parse(localStorage.getItem("rfc-ac"));
    const uid = localStorage.getItem("userId");
    setUid(uid);
    setUser(us);
    if (Boolean(props?.latestClaimId !== "x") && Boolean(props?.latestClaimId !== 'y')) {
      setRefreshLoading(true);
      http
        .post("/claims-by-id", {
          claimId: props?.latestClaimId,
        })
        .then(({ data }) => {
          setClaimData(data.data);
          setCommentsData(data?.data?.alerts);
          setRefreshLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }
  }, [refresh]);


  useEffect(()=>{
    if(claimData.length!==0)
   { const a=[];
    if(activeStage===1){
      
      let i=0,j=0,k;
      for(k=i;k<=j;k++){

        a.push(claimData?.courtDocuments[k] || null)
      }
      console.log(a)
      setCurrentStageDocs(a);

    }else if(activeStage===2){
      let i=1,j=6,k;
      for(k=i;k<=j;k++){
        a.push(claimData?.courtDocuments[k] || null)
      }console.log(a)
      setCurrentStageDocs(a);

    }else if(activeStage===3){
      let i=7,j=8,k;
      for(k=i;k<=j;k++){
        a.push(claimData?.courtDocuments[k] || null)
      }console.log(a)
      setCurrentStageDocs(a);
    }else if(activeStage===4){
      let i=9,j=10,k;
      for(k=i;k<=j;k++){
        a.push(claimData?.courtDocuments[k] || null)
      }console.log(a)
      setCurrentStageDocs(a);
    }else if(activeStage===5){
      let i=11,j=11,k;
      for(k=i;k<=j;k++){
        a.push(claimData?.courtDocuments[k] || null)
      }console.log(a)
      setCurrentStageDocs(a);
    }else if(activeStage===6){
      let i=12,j=17,k;
      for(k=i;k<=j;k++){
        a.push(claimData?.courtDocuments[k] || null)
      }console.log(a)
      setCurrentStageDocs(a);
    }

   }

  },[activeStage,claimData])



  const handleHTTPtoHTTPS = (args) => {
    if (args?.includes("https:")) {
      return args;
    } else {
      return args?.replace(/^http:/, "https:");
    }
  };


const handleClaimProcedureCode=(claim)=>{
  let args='SDLC_COMMENTS_BEFORE_RECOMMENDATION';
  if(u?.authLevel==='डीएलसी' && claim?.sdlcApproved === true){
    args='DLC_COMMENTS_AFTER_RECOMMENDATION'
  }else if(claim?.sdlcApproved===false){
    args='SDLC_COMMENTS_BEFORE_RECOMMENDATION';
  }else if(claim?.sdlcApproved===true){
    args='SDLC_COMMENTS_AFTER_RECOMMENDATION'
  }
return args;
}







  return (
    <React.Fragment>
      <Head title="Tabs" />
      <Content page="component" nomx>
        <Block size="lg">
          <BlockHead></BlockHead>
          <PreviewCard className="bg-light">
            {props?.latestClaimId !== "x" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <h6>
                  {" "}
                  Application Number - {claimData?.applicationNumber}{" "}
                  <Button disabled={refreshLoading}  color="dark" onClick={() => setRefresh((i) => !i)}>Refresh</Button>
                </h6>
                <Button
                  disabled={loading}
                  color="info"
                  onClick={() => {
                    setLoading(true);
                    // call combined pdf of that claim as pdf file
                    http
                      .get(`/claim-pdf-by-id?id=${claimData?._id?.toString()}`, {
                        responseType: "blob",
                      })
                      .then((res) => {
                        window.open(URL.createObjectURL(res.data));
                        setLoading(false);
                        console.log(res);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Download Combined PDF
                </Button>
              </div>
            ) : props?.latestClaimId === "y" ? <p style={{ color: "#364a63" }}>
                             <b> {props?.gramSabha} </b> के लिए अवेदन अभी रिकमेंड नहीं किया गया है
            </p>: (
              <p style={{ color: "#364a63" }}>
                {" "}
                <b> {props?.gramSabha} </b> के लिए अभी तक कोई आवेदन नहीं किया गया है
              </p>
            )}


<div className="bg-[blue]">
<RSUITE.Nav appearance="subtle"  style={{margin:0,marginTop:30,marginBottom:20,display:'flex',flexWrap:'wrap',background:'#eee'}}>
      <RSUITE.Nav.Item active={activeStage===1} onClick={e=>setActiveStage(1)} style={{background:activeStage===1?'green':'transparent',color:activeStage===1?'#fff':'#000'}}>
      वन अधिकार समिति का गठन / पुनर्गठन
      </RSUITE.Nav.Item>
      <RSUITE.Nav.Item active={activeStage===2} onClick={e=>setActiveStage(2)} style={{background:activeStage===2?'green':'transparent',color:activeStage===2?'#fff':'#000'}}> सामुदायिक वन अधिकारों का दावा तैयार करना</RSUITE.Nav.Item>
      <RSUITE.Nav.Item active={activeStage===3} onClick={e=>setActiveStage(3)}  style={{background:activeStage===3?'green':'transparent',color:activeStage===3?'#fff':'#000'}}> वन क्षेत्र का सीमांकन</RSUITE.Nav.Item>
      <RSUITE.Nav.Item active={activeStage===4} onClick={e=>setActiveStage(4)} style={{background:activeStage===4?'green':'transparent',color:activeStage===4?'#fff':'#000'}}> भौतिक सत्यापन</RSUITE.Nav.Item>
      <RSUITE.Nav.Item active={activeStage===5} onClick={e=>setActiveStage(5)} style={{background:activeStage===5?'green':'transparent',color:activeStage===5?'#fff':'#000'}} > सामुदायिक अधिकारों की अनुशंसा के लिए ग्राम सभा</RSUITE.Nav.Item>
      <RSUITE.Nav.Item active={activeStage===6} onClick={e=>setActiveStage(6)} style={{background:activeStage===6?'green':'transparent',color:activeStage===6?'#fff':'#000'}} > प्रपत्र </RSUITE.Nav.Item>
    </RSUITE.Nav>
</div>
            <Nav tabs className="mt-n3">

          
  
              {claimData?.courtDocuments?.length === 0 && <h5 className="mt-4">No Forms uploaded Yet</h5>}
              {claimData?.courtDocuments?.length !== 0 && currentStageDocs?.map((item, index) => (
                <NavItem>
                  <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({ active: activeTab === index?.toString() })}
                    onClick={(ev) => {
                      ev.preventDefault();
                      toggle(index?.toString());
                    }}
                  >
                    Document {index+1}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={activeTab}>
              {currentStageDocs?.map((item, index) => (
                <TabPane tabId={index?.toString()}>
                  <p style={{ display: "flex", flexDirection: "column" }}>
                    {/* <Button>View Stage {index+1}</Button> */}

                    <div style={{ border: "solid 1px #eee", minHeight: 200 }}>
                    {  (item?.storageUrl) ?  <Swiper
                     modules={[Navigation, Pagination, Scrollbar, A11y]}
                     spaceBetween={50}
                     slidesPerView={1}
                     navigation
                     pagination={{ clickable: true }}
                     scrollbar={{ draggable: true }}
                     onSwiper={(swiper) => console.log(swiper)}
                     onSlideChange={() => console.log('slide change')}
                     onNavigationNext={()=>{swiper?.slideNext()}}
                     onNavigationPrev={()=>{swiper?.slidePrev()}}
                      >

                        <SwiperSlide key={item?.storageUrl}>
                          <img
                            src={handleHTTPtoHTTPS(item?.storageUrl)}
                            frameBorder="0"
                            style={{
                              resize: "contain",
                            }}
                          />
                        </SwiperSlide>

                        {
                          item?.extraImages?.map((ii)=><SwiperSlide key={ii?.url}>
                          <img
                            src={handleHTTPtoHTTPS(ii?.url)}
                            frameBorder="0"
                            style={{
                              resize: "contain",
                            }}
                          />
                        </SwiperSlide>)
                        }
                      </Swiper> : <div>Document is not uploaded yet</div>}
                    </div>

                    <Button>Give Comment</Button>

                    <div>
                      <div className="nk-reply-item" style={{ border: "solid 1px #eee", borderRadius: 10 }}>
                        <div className="nk-reply-header">
                          <div className="user-card">
                            <UserAvatar size="sm" theme={item?.theme} text={findUpper("SDLC")} image={""} />
                            <div className="user-name">{"Alerts"}</div>
                          </div>
                          {/* <div className="date-time">{"item.date"}</div> */}
                        </div>

                        {commentsData?.map((item) => (
                          <div className="nk-reply-body">
                            <div
                              className="d-flex nk-reply-entry entry my-1  p-2 bg-primary text-white"
                              style={{ borderRadius: 10, justifyContent: "space-between" }}
                            >
                              <div>{item?.message}</div>
                              <div>
                                <div>
                                  {item?.senderName} {item?.senderMobile}
                                </div>
                                <div className="text-white">{moment(item?.createdAt).format("DD/MM/YYYY hh:MM A")}</div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {Boolean(u?.authLevel === "एसडीएलसी" || u?.authLevel==="डीएलसी") && (<>
                          <div className="d-flex" >
                            <Input
                              style={{marginRight:'10px',flexGrow:0.5}}
                              placeholder="Example Comment - Please correct Form-2"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                           

                            <Button
                             style={{border:'1px solid #0fac81',flexGrow:0.5}}
                              onClick={() => {
                                setCommentError('');
                             
                                const userId = localStorage.getItem("userId");
                                if(!newComment){
                                  setCommentError('Please enter some comment');
                                  return ;
                                }
                                setSendCommentsLoading(true)
                                http
                                  .post("/create-alert", {
                                    senderUserId: userId,
                                    receiverUserId: claimData?.ownerId?.toString(),
                                    alertCode: "ALERT-1",
                                    userIdFromWebConsole:userId,
                                    message: newComment,
                                    applicationNumber: claimData?.applicationNumber,
                                    PROCEDURE_CODE:handleClaimProcedureCode(claimData)
                                  })
                                  .then((res) => {
                                    // const prev = [...commentsData];
                                    // prev.push(commentsData[commentsData.length - 1] + 1);
                                    // setCommentsData(prev);
                                    setSendCommentsLoading(false)
                                    setRefresh((x) => !x);
                                  })
                                  .catch((error) => {
                                    setSendCommentsLoading(false)
                                    alert(JSON.stringify(error));
                                  });
                              }}
                            >
                             {
                                sendCommentsLoading?
<Spinner color="success">
  Loading...
</Spinner> 
:
                              'Send Comment'
                              }
                            </Button>
                          </div>
                          {commentError && <p color="red" style={{textAlign:'end',color:'red'}}>{commentError}</p>}
                           </>
                        )}
                      </div>
                    </div>

                    <hr />
                  </p>
                </TabPane>
              ))}
            </TabContent>
          </PreviewCard>

          {Boolean(props?.latestClaimId !== "x" && u?.authLevel === "एसडीएलसी" && u?.postLevel==="अनुमंडल पदाधिकारी (अध्यक्ष)") && (
            <div className="block--form-shared-footer my-2">
              <Alert className="alert-icon" color="warning">
                <Icon name="alert-circle" />
                <h6 className="text-red">
                  All the forms submitted by FRC have been verified. Do you want to recommed the claim to DLC Level?
                </h6>

                <div className="my-2">
                  <input
                    disabled={claimData?.sdlcApproved}
                    type="radio"
                    id="yes"
                    name="confirmation"
                    defaultChecked={claimData?.sdlcApproved}
                    value={true}
                    onChange={(e) => setIsSDLCApproved(e.target.value)}
                  />
                  <label for="yes"> &nbsp; Yes</label>
                  <br />
                  <input
                    disabled={claimData?.sdlcApproved}
                    type="radio"
                    id="no"
                    name="confirmation"
                    defaultChecked={!claimData?.sdlcApproved}
                    value={false}
                    onChange={(e) => setIsSDLCApproved(e.target.value)}
                  />
                  <label for="no">&nbsp; No</label>
                  <br /> <br />
                  <label>If No then Mention the reason</label>
                  <Input
                    disabled={claimData?.sdlcApproved}
                    defaultValue={claimData?.sdlcNotApprovedReason}
                    value={sdlcNotApprovedReason || claimData?.sdlcNotApprovedReason}
                    onChange={(e) => setSDLCNotApprovedReason(e.target.value)}
                  />
                  <br />
                </div>
              </Alert>

              {u?.authLevel === "एसडीएलसी" && (
                <Button
                  disabled={claimData?.sdlcApproved}
                  color="secondary"
                  className="center"
                  onClick={() => {
                    http
                      .patch("/claims-fields", {
                        claimId: claimData?._id?.toString(),
                        sdlcApproved: isSDLCApproved,
                        sdlcNotApprovedReason: sdlcNotApprovedReason,
                        userIdFromWebConsoleForSDLCRecommendation:uid
                      })
                      .then((res) => {
                        // alert("Updated")
                        setRefresh((e) => !e);
                      })
                      .catch((err) => {
                        alert("Failed to Recommend to DLC");
                      });
                  }}
                >
                  {claimData?.sdlcApproved ? "Already Recommended to DLC" : "Recommend Claim to DLC LEVEL"}
                  {/* APPROVE (IF DLC) */}
                </Button>
              )}
            </div>
          )}

          {/* FOREST */}
          {Boolean(u?.postLevel === "वन परिक्षेत्र अधिकारी" && props?.latestClaimId !== "x") && (
            <div className="block--form-shared-footer my-2">
              {/* FOREST ANF CI */}
              <div className="my-2 d-flex">
                <Button
                  disabled={claimData?.forestAckForJointVerification || forestLoading?.a}
                  color="secondary"
                  className="center"
                  onClick={() => {
                    setForestLoading({...forestLoading,a:true})
                    http
                      .patch("/claims-fields", {
                        claimId: claimData?._id?.toString(),
                        forestAckForJointVerification: true,
                      })
                      .then((res) => {
                        // alert("Updated")
                        setRefresh((e) => !e);
                      })
                      .catch((err) => {
                        alert("Failed");
                      }).finally(f=>{
                        setForestLoading({...forestLoading,a:false})
                      })
                  }}
                >
                  Acknowledge
                </Button>
                <h6 className="m-2">
                  Press this button to Acknowledge that have received an alert for Join Verification as a {u?.postLevel}{" "}
                  going for Joint Verification
                </h6>
              </div>
              <div className="my-2 d-flex">
                <Button
                  disabled={claimData?.forestApprovedForJointVerification || forestLoading?.b}
                  color="secondary"
                  className="center"
                  onClick={() => {
                    setForestLoading({...forestLoading,b:true})
                    http
                      .patch("/claims-fields", {
                        claimId: claimData?._id?.toString(),
                        forestApprovedForJointVerification: true,
                      })
                      .then((res) => {
                        // alert("Updated")
                        setRefresh((e) => !e);
                      })
                      .catch((err) => {
                        alert("Failed");
                      })
                      .finally(f=>{
                        setForestLoading({...forestLoading,b:false})
                      })
                  }}
                >
                  Approve
                </Button>
                <h6 className="m-2">
                  Press this button to Approve that Joint Verification has been successully addressed at field
                </h6>
              </div>
            </div>
          )}

          {/* REVENU */}
          {Boolean(u?.postLevel === "अंचल अधिकारी" && props?.latestClaimId !== "x") && (
            <div className="block--form-shared-footer my-2">
              {/* FOREST ANF CI */}
              <div className="my-2 d-flex">
                <Button
                  disabled={claimData?.revenueAckForJointVerification || revenueLoading?.a}
                  color="secondary"
                  className="center"
                  onClick={() => {
                    setRevenueLoading({...revenueLoading,a:true})
                    http
                      .patch("/claims-fields", {
                        claimId: claimData?._id?.toString(),
                        revenueAckForJointVerification: true,
                      })
                      .then((res) => {
                        // alert("Updated")
                        setRefresh((e) => !e);
                      })
                      .catch((err) => {
                        alert("Failed");
                      }).finally(f=>{
                        setRevenueLoading({...revenueLoading,a:false})
                      })
                  }}
                >
                  Acknowledge
                </Button>
                <h6 className="m-2">
                  Press this button to Acknowledge that have received an alert for Join Verification as a {u?.postLevel}{" "}
                  going for Joint Verification
                </h6>
              </div>
              <div className="my-2 d-flex">
                <Button
                  disabled={claimData?.revenueApprovedForJointVerification || revenueLoading?.b}
                  color="secondary"
                  className="center"
                  onClick={() => {
                    setRevenueLoading({...revenueLoading,b:true})
                    http
                      .patch("/claims-fields", {
                        claimId: claimData?._id?.toString(),
                        revenueApprovedForJointVerification: true,
                      })
                      .then((res) => {
                        // alert("Updated")
                        setRefresh((e) => !e);
                      })
                      .catch((err) => {
                        alert("Failed");
                      })
                      .finally(f=>{
                        setRevenueLoading({...revenueLoading,b:false})
                      })
                  }}
                >
                  Confirm
                </Button>
                <h6 className="m-2">
                  Press this button to confirm that Joint Verification has been successully addressed at field
                </h6>
              </div>
            </div>
          )}
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default TabsPage;
