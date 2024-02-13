import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Modal, ModalBody } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
} from "../../components/Component";
import { filterRole, filterStatus } from "./UserData";
import { bulkActionOptions, dateFormatter, findUpper, getDateStructured } from "../../utils/Utils";
import { Link } from "react-router-dom";

import { userData } from "./UserData";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import http from "../../services/APICentral";
import dayjs from "dayjs";

const RatifiTrackIFRStatus=()=>{



    return  <React.Fragment>

    <Head title="IFR Claims Inbox"></Head>
    
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h3" page>
            IFR Claims Inbox
            </BlockTitle>
          {true &&   <BlockDes className="text-soft">
              <p>Ratifi App has total {data?.length} users.</p>
            </BlockDes>}
          </BlockHeadContent>
          <BlockHeadContent>
            <div className="toggle-wrap nk-block-tools-toggle">
              <Button
                className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                onClick={() => null}
              >
                <Icon name="menu-alt-r"></Icon>
              </Button>
          
            </div>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

    {true ? <h6>Loading...</h6>  :   <Block>
        <DataTable  className="card-stretch">
          <div className="card-inner position-relative card-tools-toggle">
            <div className="card-title-group">
              <div className="card-tools">
                <div className="form-inline flex-nowrap gx-3">
                  <div className="form-wrap">
                    <RSelect
                      options={bulkActionOptions}
                      className="w-130px"
                      placeholder="Bulk Action"
                      onChange={(e) => null}
                    />
                  </div>
                  <div className="btn-wrap">
                    <span className="d-none d-md-block">
                      <Button
                        disabled={actionText !== "" ? false : true}
                        color="light"
                        outline
                        className="btn-dim"
                        onClick={(e) => null}
                      >
                        Apply
                      </Button>
                    </span>
                    <span className="d-md-none">
                      <Button
                        color="light"
                        outline
                        disabled={actionText !== "" ? false : true}
                        className="btn-dim btn-icon"
                        onClick={(e) => null}
                      >
                        <Icon name="arrow-right"></Icon>
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-tools me-n1">
                <ul className="btn-toolbar gx-1">
                  <li>
                    <a
                      href="#search"
                      onClick={(ev) => {
                        ev.preventDefault();
                        // toggle();
                      }}
                      className="btn btn-icon search-toggle toggle-search"
                    >
                      <Icon name="search"></Icon>
                    </a>
                  </li>
                  <li className="btn-toolbar-sep"></li>
                  <li>
                    <div className="toggle-wrap">
                      <Button
                        className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                        onClick={() =>null }
                      >
                        <Icon name="menu-right"></Icon>
                      </Button>
                      <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                        <ul className="btn-toolbar gx-1">
                          <li className="toggle-close">
                            <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                              <Icon name="arrow-left"></Icon>
                            </Button>
                          </li>
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                <div className="dot dot-primary"></div>
                                <Icon name="filter-alt"></Icon>
                              </DropdownToggle>
                              <DropdownMenu
                                end
                                className="filter-wg dropdown-menu-xl"
                                style={{ overflow: "visible" }}
                              >
                                <div className="dropdown-head">
                                  <span className="sub-title dropdown-title">Filter Users</span>
                                  <div className="dropdown">
                                    <a
                                      href="#more"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                      className="btn btn-sm btn-icon"
                                    >
                                      <Icon name="more-h"></Icon>
                                    </a>
                                  </div>
                                </div>
                                <div className="dropdown-body dropdown-body-rg">
                                  <Row className="gx-6 gy-3">
                                    <Col size="6">
                                      <div className="custom-control custom-control-sm custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="hasBalance" />
                                        <label className="custom-control-label" htmlFor="hasBalance">
                                          {" "}
                                          Have Balance
                                        </label>
                                      </div>
                                    </Col>
                                    <Col size="6">
                                      <div className="custom-control custom-control-sm custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="hasKYC" />
                                        <label className="custom-control-label" htmlFor="hasKYC">
                                          {" "}
                                          KYC Verified
                                        </label>
                                      </div>
                                    </Col>
                                    <Col size="6">
                                      <div className="form-group">
                                        <label className="overline-title overline-title-alt">Role</label>
                                        <RSelect options={filterRole} placeholder="Any Role" />
                                      </div>
                                    </Col>
                                    <Col size="6">
                                      <div className="form-group">
                                        <label className="overline-title overline-title-alt">Status</label>
                                        <RSelect options={filterStatus} placeholder="Any Status" />
                                      </div>
                                    </Col>
                                    <Col size="12">
                                      <div className="form-group">
                                        <button type="button" className="btn btn-secondary">
                                          Filter
                                        </button>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                                <div className="dropdown-foot between">
                                  <a
                                    href="#reset"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                    className="clickable"
                                  >
                                    Reset Filter
                                  </a>
                                  <a
                                    href="#save"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    Save Filter
                                  </a>
                                </div>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle color="tranparent" className="btn btn-trigger btn-icon dropdown-toggle">
                                <Icon name="setting"></Icon>
                              </DropdownToggle>

                              <DropdownMenu end className="dropdown-menu-xs">
                                <ul className="link-check">
                                  <li>
                                    <span>Show</span>
                                  </li>
                                  <li className={itemPerPage === 10 ? "active" : ""}>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        setItemPerPage(10);
                                      }}
                                    >
                                      10
                                    </DropdownItem>
                                  </li>
                                  <li className={itemPerPage === 15 ? "active" : ""}>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        setItemPerPage(15);
                                      }}
                                    >
                                      15
                                    </DropdownItem>
                                  </li>
                                </ul>
                                <ul className="link-check">
                                  <li>
                                    <span>Order</span>
                                  </li>
                                  <li className={sort === "dsc" ? "active" : ""}>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        setSortState("dsc");
                                        sortFunc("dsc");
                                      }}
                                    >
                                      DESC
                                    </DropdownItem>
                                  </li>
                                  <li className={sort === "asc" ? "active" : ""}>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdownitem"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        setSortState("asc");
                                        sortFunc("asc");
                                      }}
                                    >
                                      ASC
                                    </DropdownItem>
                                  </li>
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`card-search search-wrap ${!onSearch && "active"}`}>
              <div className="card-body">
                <div className="search-content">
                  <Button
                    className="search-back btn-icon toggle-search active"
                    onClick={() => {
                      setSearchText("");
                      toggle();
                    }}
                  >
                    <Icon name="arrow-left"></Icon>
                  </Button>
                  <input
                    type="text"
                    className="border-transparent form-focus-none form-control"
                    placeholder="Search by user or email"
                    value={onSearchText}
                    onChange={(e) => onFilterChange(e)}
                  />
                  <Button className="search-submit btn-icon">
                    <Icon name="search"></Icon>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DataTableBody>
            <DataTableHead>
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    onChange={(e) => selectorCheck(e)}
                    id="uid"
                  />
                  <label className="custom-control-label" htmlFor="uid"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">User</span>
              </DataTableRow>
              <DataTableRow size="mb">
                <span className="sub-text">Role</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">District</span>
              </DataTableRow>

 

              <DataTableRow size="lg">
                <span className="sub-text">Tehsil</span>
              </DataTableRow>

              <DataTableRow size="lg">
                <span className="sub-text">Panchayat</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Gram Sabha</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">State</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span className="sub-text">Phone</span>
              </DataTableRow>
              {/* <DataTableRow size="lg">
                <span className="sub-text">Verified</span>
              </DataTableRow> */}
              <DataTableRow size="lg">
                <span className="sub-text">Registeration Time</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Status</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-col-tools text-end">
                <UncontrolledDropdown>
                  <DropdownToggle
                    color="tranparent"
                    className="btn btn-xs btn-outline-light btn-icon dropdown-toggle"
                  >
                    <Icon name="plus"></Icon>
                  </DropdownToggle>
                  <DropdownMenu end className="dropdown-menu-xs">
                    <ul className="link-tidy sm no-bdr">
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="bl" />
                          <label className="custom-control-label" htmlFor="bl">
                            Balance
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="ph" />
                          <label className="custom-control-label" htmlFor="ph">
                            Phone
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="vri" />
                          <label className="custom-control-label" htmlFor="vri">
                            Verified
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="custom-control custom-control-sm custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="st" />
                          <label className="custom-control-label" htmlFor="st">
                            Status
                          </label>
                        </div>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? currentItems.map((item) => {
                  return (
                    <DataTableItem key={item.id}>
                      <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            defaultChecked={item.checked}
                            id={item.id + "uid1"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                        </div>
                      </DataTableRow>
                      <DataTableRow>
                        <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item.id}`}>
                          <div className="user-card">
                            <UserAvatar
                              theme={item.avatarBg}
                              text={findUpper(item.name)}
                              image={item.image}
                            ></UserAvatar>
                            <div className="user-info">
                              <span className="tb-lead">
                                {item.name}{" "}
                                <span
                                  className={`dot dot-${
                                    item.status === "Active"
                                      ? "success"
                                      : item.status === "Pending"
                                      ? "warning"
                                      : "danger"
                                  } d-md-none ms-1`}
                                ></span>
                              </span>
                              <span>{item.email}</span>
                            </div>
                          </div>
                        </Link>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span className="tb-amount">
                          {item.authLevel} <span className="currency"> | {item?.postLevel} </span>
                        </span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.district}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.tehsil}</span>
                      </DataTableRow>
                
                      <DataTableRow size="md">
                        <span>{item.panchayat}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.village}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.state}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span>{item.mobile}</span>
                      </DataTableRow>
                    
                      <DataTableRow size="lg">
                        <span>{dayjs(item.createdAt).format("DD/M/YYYY HH:mm A")}</span>
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span
                          className={`tb-status text-${
                            item.activeStatus === true ? "success" : "warning" 
                          }`}
                        >
                          {item.activeStatus===false ? "Inactive":"Active"}
                        </span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li className="nk-tb-action-hidden" onClick={() => onEditClick(item.id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"edit" + item.id}
                              icon="edit-alt-fill"
                              direction="top"
                              text="Edit"
                            />
                          </li>
                          {item.activeStatus !== false && (
                            <React.Fragment>
                              <li className="nk-tb-action-hidden" onClick={() => suspendUser(item.id)}>
                                <TooltipComponent
                                  tag="a"
                                  containerClassName="btn btn-trigger btn-icon"
                                  id={"suspend" + item.id}
                                  icon="user-cross-fill"
                                  direction="top"
                                  text="Suspend"
                                />
                              </li>
                            </React.Fragment>
                          )}
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu end>
                                <ul className="link-list-opt no-bdr">
                                  <li onClick={() => onEditClick(item.id)}>
                                    <DropdownItem
                                      tag="a"
                                      href="#edit"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Edit</span>
                                    </DropdownItem>
                                  </li>
                                  {item.status !== "Suspend" && (
                                    <React.Fragment>
                                      <li className="divider"></li>
                                      <li onClick={() => suspendUser(item.id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#suspend"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="na"></Icon>
                                          <span>Suspend User</span>
                                        </DropdownItem>
                                      </li>
                                    </React.Fragment>
                                  )}
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
              : null}
          </DataTableBody>
          <div className="card-inner">
       
            {false ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No data found</span>
              </div>
            )}
          </div>
        </DataTable>
      </Block>}

    </Content>
  </React.Fragment>



}

export default RatifiTrackIFRStatus;