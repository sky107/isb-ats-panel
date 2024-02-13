import React, { useState } from "react";
import Logo from "../../images/auth-logo.png";
import LogoDark from "../../images/auth-logo.png";
import GovtLogo from "../../images/auth-logo-2.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import appInfo from '../../appInfo.json';

import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import http from "../../services/APICentral";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [loading,setLoading]=useState(false);
  const [fields, setFields] = useState({
    mobile: "",
    passwrod: "",
  });


  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = (formData) => {
    setLoading(true);
   
    const loginName = "admin";
    const pass = "751019";

    // check with api

    
    if (formData.name === loginName && formData.passcode === pass) {
      localStorage.setItem("rfc-token", "admin");
      localStorage.setItem('rfc-isAdmin',true)

      localStorage.setItem('rfc-user',JSON.stringify({
            name:'Admin',
            mobile:'Admin'
          }))



      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/track-users"}`
        );
        window.location.reload();
      }, 0);
    } else {
   
      http
      .post("/sigin", {
        mobile: formData?.name,
        password: formData?.passcode,
        fcmToken: "PC-LOGIN",
      })
      .then(({ data }) => {

       if(data?.success===false){
        alert("Invalid Credentials")
       }else{

        if(data?.user?.authLevel==='एफआरसी'){
            alert("This console can only be accessed for SDLC and DLC Members, for FRC members access please use our mobile application on playstore - RatiFi")
        }else{
          localStorage.setItem('userId',data?.user?._id?.toString());
          localStorage.setItem("rfc-token", data?.token);
          localStorage.setItem('rfc-ac',JSON.stringify({authLevel:data?.user?.authLevel,postLevel:data?.user?.postLevel}))
          localStorage.setItem('rfc-user',JSON.stringify({
            name:data?.user?.name,
            mobile:data?.user?.mobile
          }))
          localStorage.setItem('rfc-location',JSON.stringify({
            village:data?.user?.village,
            panchayat:data?.user?.panchayat,
            tehsil:data?.user?.tehsil,
            district:data?.user?.district,
            state: data?.user?.state
          }))

          // push the data to redux 
          // navigate to dashboard 

          setTimeout(() => {
            window.history.pushState(
              `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
              "auth-login",
              `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/track-cfr-and-cr-status"}`
            );
            window.location.reload();
          }, 0);
        }
       
      }
      })
      .catch((err) => {})
      .finally(f=>setLoading(false))

    
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {t}=useTranslation();
  return (
    <>
      <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link" style={{width:'100%',display:'flex',justifyContent:'space-between'}}>

            {/* <img className="logo-dark logo-img" src={GovtLogo} alt="logo-dark" /> */}
            <img className="logo-dark" src={Logo} alt="logo-dark"  style={{height:80,width:420}} />
            {/* <h3 style={{}} > ISB ATS</h3> */}
            {/* <img className="logo-dark" src={GovtLogo} alt="logo-dark"  style={{height:90,width:90}} /> */}
          </Link>
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">{appInfo?.appName} Login</BlockTitle>
              <BlockDes>
                <p>{t(`Access ${appInfo?.appName} Console using your email/phone and password.`)}</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Phone Number
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register("name", { required: "This field is required" })}
                  // defaultValue="9343680029"
                  placeholder="Enter your registered Phone Number"
                  className="form-control-lg form-control"
                />
                {errors.name && <span className="invalid">{errors.name.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                {/* <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                  Forgot Code?
                </Link> */}
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register("passcode", { required: "This field is required" })}
                  // defaultValue="123"
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button disabled={loading} size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
          
        </PreviewCard>
      </Block>
      {/* <AuthFooter /> */}
    </>
  );
};
export default Login;
