import React, { useEffect } from "react";
import { Modal, ModalBody, Form } from "reactstrap";
import { Icon, Col, Button, RSelect } from "../../../components/Component";
import { useForm } from "react-hook-form";
import { t } from "i18next";

const AddRole = ({ modal, closeModal, onSubmit, formData, setFormData, filterStatus }) => {
  useEffect(() => {
    reset(formData);
  }, [formData]);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <a
          href="#cancel"
          onClick={(ev) => {
            ev.preventDefault();
            closeModal();
          }}
          className="close"
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title">Add Role</h5>
          <div className="mt-4">
            <Form className="row gy-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <RSelect
                  
                    options={[
                      {
                        label: t("FRC"),
                        value: t("DRC"),
                      },
                      {
                        label: t("SDLC"),
                        value: t("SDLC"),
                      },
                      {
                        label: t("DLC"),
                        value: t("DLC"),
                      },
                    ]}
                  />
                  {/* <input
                        className="form-control"
                        type="text"
                        {...register('name', { required: "This field is required" })}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name" /> */}
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </Col>
              <Col md="6">
                <div className="form-group">
                  <label className="form-label">Role Name </label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("name", {
                      required: "This field is required",
                    })}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Role Name"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </Col>
              {/* <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Balance</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register('balance', { required: "This field is required" })}
                        value={formData.balance}
                        onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                        placeholder="Balance" />
                      {errors.balance && <span className="invalid">{errors.balance.message}</span>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register('phone', { required: "This field is required" })}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                         />
                        
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </div>
                  </Col> */}
                  
              <Col md="12">
                
                <div className="form-group">
                  <label className="form-label">Permissions</label>
                  <div className="form-control-wrap">
                  <h6>Manage Applications</h6>
                    {/* <RSelect
                          options={filterStatus}
                          value={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        /> */}

                    <div class="custom-control custom-checkbox">
                      {" "}
                      <input type="checkbox" class="custom-control-input" id="customCheck1" />{" "}
                      <label class="custom-control-label" for="customCheck1">
                        View  &nbsp;
                      </label>
                    </div>



                    <div class="custom-control custom-checkbox">
                      {" "}
                      <input type="checkbox" class="custom-control-input" id="customCheck2" />{" "}
                      <label class="custom-control-label" for="customCheck2">
                        Edit &nbsp;
                      </label>
                    </div>


                    <div class="custom-control custom-checkbox">
                      {" "}
                      <input type="checkbox" class="custom-control-input" id="customCheck3" />{" "}
                      <label class="custom-control-label" for="customCheck3">
                        Delete &nbsp;
                      </label>
                    </div>
                  
                  </div>
                  <br/>
                  <div className="form-control-wrap">
                  <h6>Manage Claims</h6>
                    {/* <RSelect
                          options={filterStatus}
                          value={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        /> */}

                    <div class="custom-control custom-checkbox">
                      {" "}
                      <input type="checkbox" class="custom-control-input" id="customCheck4" />{" "}
                      <label class="custom-control-label" for="customCheck4">
                        View  &nbsp;
                      </label>
                    </div>



                    <div class="custom-control custom-checkbox">
                      {" "}
                      <input type="checkbox" class="custom-control-input" id="customCheck5" />{" "}
                      <label class="custom-control-label" for="customCheck5">
                        Edit &nbsp;
                      </label>
                    </div>


                    <div class="custom-control custom-checkbox">
                      {" "}
                      <input type="checkbox" class="custom-control-input" id="customCheck6" />{" "}
                      <label class="custom-control-label" for="customCheck6">
                        Delete &nbsp;
                      </label>
                    </div>
                  
                  </div>
                </div>
              </Col>
              <Col size="12">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      Add Role
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
                </ul>
              </Col>
            </Form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default AddRole;
