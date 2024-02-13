import React, { Suspense, useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  Form,
  Tag,
  Label,
} from "reactstrap";
import {
  Icon,
  Col,
  Button,
  RSelect,
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import useJharkhandData from "../../../hooks/useJharkhandData";
import { t } from "i18next";
import http from "../../../services/APICentral";


const EditModal = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus }) => {

  const [dynamicPermission,setDynamicPermissions]=useState([]);



  useEffect(() => {
    reset(formData)
  }, [formData]);
  const { reset, register, handleSubmit, formState: { errors } } = useForm();


  const [states,panchayatToVillageMapping,levelWiseRole] = useJharkhandData();




//   useEffect(()=>{


// http.get('/fetch-permissions')
// .then(res=>{
//   console.log(res.data.data)
//   let d=[];
//   res?.data?.data?.forEach(item=>{
//     d.push({
//       label:<div> 
//       <h6>{item?.name}</h6> 
//       <div>Claim | {Object.keys(item?.claim).map(it=>{
//         if(item.claim[it]===true)
//         return it+' - '
//       else
//       return ' - '
//       })}</div>
//       <div>User | {Object.keys(item?.user).map((it)=>{
//          if(item?.user[it]===true)
//          return it+' - '
//         else
//         return ' - '
//       })}</div>
//     </div>,
//       value:item?._id?.toString()
//     })
//   })
//   setDynamicPermissions(d)
// })
// .catch(error=>{
// console.log('error',error)

// })

//   },[])






  return (

    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            closeModal()
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Update User</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    {...register('name', { required: "This field is required" })}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter name" />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Mobile Number </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register('mobile', {
                      required: "This field is required",
                      // pattern: {
                      //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      //   message: "invalid mobile number",
                      // },
                    })}
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="Enter Mobile" />
                  {errors.mobile && <span className="invalid">{errors.mobile.message}</span>}
                </div>
              </Col>



              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    
                    {...register('password', { required: "This field is required" })}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter Password" />
                  {errors.balance && <span className="invalid">{errors.password.message}</span>}
                </div>
              </Col>






              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Permission Control</label>
                  {/* <input
                    className="form-control"
                    type="password"
                    {...register('confirmPassword', { required: "This field is required" })}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  /> */}
                  <RSelect

                    options={dynamicPermission}
                  />

                  {errors.confirmPassword && <span className="invalid">{errors.confirmPassword.message}</span>}
                </div>
              </Col>



              <Col size="12">
                <ul className="align-center  flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li className="w-25">
                    <label>State</label>
                    <RSelect placeholder="State"
                    options={states}
                    value={formData?.state} 
                    onChange={e=>{
                      setFormData({...formData,state:e})
                    }}
                     />
                  </li>


                  <li className="w-25">
                    <label>District</label>
                    <RSelect 
                    value={formData?.district}
                    onChange={e=>{
                      setFormData({...formData,district:e})
                    }}

                    placeholder="District" options={
                      states
                        ?.filter((item) => item.label === formData?.state?.label)
                        ?.map((item) => {
                          return item.Districts;
                        })[0] } />
                  </li>


             


                  <li className="w-25">
                    <label>Tehsil</label>
                    <RSelect
                      value={formData?.tehsil}
                      onChange={e=>setFormData({...formData,tehsil:e})}
                     placeholder="Tehsil" options={
                      states
                        ?.filter((item) => item.label === formData?.state?.label)
                        ?.map((item) => {
                          return item.Districts;
                        })[0]
                        ?.filter((item) => item.label === formData?.district?.label)
                        ?.map((item) => {
                          return item.Tehsils;
                        })[0]
                    } />
                  </li>

                  <li className="w-25">
                    <label>Panchayat</label>
                    <RSelect
                      value={formData?.panchayat}
                      onChange={e=>setFormData({...formData,panchayat:e})}
                     placeholder="Panchayat" options={
                      states
                        ?.filter((item) => item.label === formData?.state?.label)
                        ?.map((item) => {
                          return item.Districts;
                        })[0]
                        ?.filter((item) => item.label === formData?.district?.label)
                        ?.map((item) => {
                          return item.Tehsils;
                        })[0]
                        ?.filter((item) => item.label === formData?.tehsil?.label)
                        ?.map((item) => {
                          return item.Panchayats;
                        })[0]
                    } />
                  </li>

                  <li className="w-25">
                    <label>Village</label>
                    <RSelect
                     value={formData?.village}
                     onChange={e=>setFormData({...formData,village:e})}
                    placeholder="Village"
                     options={panchayatToVillageMapping[formData?.panchayat?.label] || []}

                    />
                  </li>



                </ul>
              </Col>



              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <div className="form-control-wrap">
                    <RSelect
                  
                    value={formData?.authLevel}
                      options={ levelWiseRole }
                      onChange={(e) => setFormData({ ...formData, authLevel: e })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <div className="form-control-wrap">
                    <RSelect
                    value={formData?.postLevel}
                      options={levelWiseRole
                        ?.filter((item) => item.label === formData?.authLevel?.label)
                        ?.map((item) => {
                          return item.roleData;
                        })[0]}
                        
                      onChange={(e) => setFormData({ ...formData, postLevel: e })}
                    />
                  </div>
                </div>
              </Col>

              <Col size="12" className={'d-flex justify-content-between'}>
                <div>
                <img src={formData?.verificationAadharFrontUrl} style={{height:200,width:200}}/> 
                <h6>Front Image of Aadhar</h6>
                </div>
                <div>

              
                <img src={formData?.verificationAadharBackUrl} style={{height:200,width:200}}/> 
                <h6>Back Image of Aadhar</h6>
                </div>
              </Col>
              
                      
              <Col size="12">
                <ul className="align-center justify-content-between flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Update User
                    </Button>
                  </li>
                
                  <li>
                    <a
                      href="#cancel"
                      onClick={(ev) => {
                        ev.preventDefault();
                        closeModal();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </a>
                  </li>
                    
                  <div className="d-flex justify-content-evenly">
                  <li className="mx-2">
                    <Button color={formData?.activeStatus ? "warning":"info"} size="md" onClick={(ev)=>{
                      ev.preventDefault()
                      http.post('/admin-update-user',{
                        activeStatus:!formData?.activeStatus,
                        SEND_PUSH: !formData?.activeStatus ? true : false,
                        id:formData?._id
                      })
                      .then(res=>{
                      
                        // closeModal();
                        window.location.reload()
                
                      })
                      .catch(error=>{
                        alert(error.toString())
                      })
                      
                      // closeModal()
                 
                    }}>
                      {formData?.activeStatus ? "Suspend":"Activate"}
                    </Button>
                  </li>
                  <li>
                    <Button color="danger" size="md" onClick={()=>null}>
                      Delete
                    </Button>
                  </li>
                  </div>
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default EditModal;
