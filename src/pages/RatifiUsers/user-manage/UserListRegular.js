import React, { useContext, useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Modal, ModalBody, Input } from "reactstrap";
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
} from "../../../components/Component";
import { filterRole, filterStatus } from "./UserData";
import { bulkActionOptions, dateFormatter, findUpper, getDateStructured } from "../../../utils/Utils";
import { Link } from "react-router-dom";
// import { UserContext } from "./UserContext";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import { userData } from "./UserData";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import http from "../../../services/APICentral";
import dayjs from "dayjs";
import AddRole from "./AddRole";
import SelectApprovalListModal from "./SelectApprovalListModal";
import CreateApprovalListModal from "./CreateApprovalListModal";

const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          {/* <CopyToClipboard text={JSON.stringify(data)}>
            <Button className="buttons-copy buttons-html5" onClick={() => copyToClipboard()}>
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "} */}
          <button className="btn btn-secondary buttons-csv buttons-html5" type="button" onClick={() => exportCSV()}>
            <span>CSV</span>
          </button>{" "}
          <button className="btn btn-secondary buttons-excel buttons-html5" type="button" onClick={() => exportExcel()}>
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const RatifiUserListRegularPage = () => {
  // const { contextData } = useContext(UserContext);
  const [refreshList, setRefreshList] = useState(false);
  const [data, setData] = useState(userData);
  const [apiLoader, setAPILoader] = useState(false);
  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    addRole: false,
  });
  const [editId, setEditedId] = useState();

  const [roleData, setRoleData] = useState({
    name: "",
    user: {},
    claim: {},
  });

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    state: "",
    district: "",
    tehsil: "",
    panchayat: "",
    village: "",
    password: "",
    confirmPassword: "",
    authLevel: "",
    postLevel: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    mobile: "",
    state: "",
    district: "",
    tehsil: "",
    panchayat: "",
    village: "",
    password: "",
    // confirmPassword:"",
    authLevel: "",
    postLevel: "",
  });
  const [approvalModal, setApprovlaModal] = useState(false);
  const [createApprovalModal, setCreateApprovlaModal] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchTxtName, setSearchTxtName] = useState("");
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [isActive, setActive] = useState(null);
  const [isDropdownActive, setDropdownActive] = useState(false);
  const [sort, setSortState] = useState("");

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    let newData;
    setAPILoader(true);
    http
      .get(`/applications`)
      .then(({ data }) => {
        console.log("ddx", data);
        // userData = [...data.data];
        newData = data?.data?.map((item) => {
          item.checked = false;
          item.id = item?.id;
          return item;
        });
        console.log(newData);
        setData([...newData]);
        setAPILoader(false);
      })
      .catch((error) => {
        console.log(error);
        newData = userData.map((item) => {
          item.checked = false;
          return item;
        });

        setData([...newData]);
      })
      .finally((f) => {});
  }, [refreshList]); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  // useEffect(() => {
  //   if (onSearchText !== "") {
  //     const filteredObject = data.filter((item) => {
  //       return (
  //         item?.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
  //         item.mobile.toLowerCase().includes(onSearchText.toLowerCase())
  //       );
  //     });
  //     setData([...filteredObject]);
  //   } else {
  //     setData([...data]);
  //   }
  // }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      mobile: "",
      state: "",
      district: "",
      tehsil: "",
      panchayat: "",
      village: "",
    });
  };

  const closeModal = () => {
    setModal({ add: false });
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false });
    resetForm();
  };

  const closeRoleModal = () => {
    setModal({ addRole: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    for (let key in submitData) {
      if (submitData[key]?.label) submitData[key] = submitData[key]?.label;
    }

    // api call to add user

    http
      .post("/add-user", submitData)
      .then((res) => {
        alert("Success");
      })
      .catch((error) => {
        alert("Error");
      });
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to add a new item
  const onFormSubmitRole = (submitData) => {
    for (let key in submitData) {
      if (submitData[key]?.label) submitData[key] = submitData[key]?.label;
    }

    return;
    // api call to add role
    alert(submitData);
    http
      .post("/add-role", submitData)
      .then((res) => {
        alert("Success");
      })
      .catch((error) => {
        alert("Error");
      });
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    for (let key in submitData) {
      if (submitData[key]?.label) submitData[key] = submitData[key]?.label;
    }

    http
      .post("/admin-update-user", submitData)
      .then((res) => {
        setRefreshList((e) => !e);
      })
      .catch((error) => {
        alert(error.toString());
      });

    setModal({ edit: false });
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      //   for(let key in submitData){
      //     if(submitData[key]?.label)
      //     submitData[key]=submitData[key]?.label;
      // }

      if (item.id === id) {
        const fo = { ...item };
        fo.id = id;
        fo.village = { label: item?.village, value: item?.village };
        fo.panchayat = { label: item?.panchayat, value: item?.panchayat };
        fo.tehsil = { label: item?.tehsil, value: item?.tehsil };
        fo.district = { label: item?.district, value: item?.district };
        fo.state = { label: item?.state, value: item?.state };
        fo.authLevel = { label: item?.authLevel, value: item?.authLevel };
        fo.postLevel = { label: item?.postLevel, value: item?.postLevel };
        setEditFormData(fo);
      }

      setModal({ edit: true }, { add: false });
      setEditedId(id);
    });
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    // alert(id)
    http
      .post("/admin-update-user", {
        activeStatus: false,
        id: id,
      })
      .then((res) => {
        setRefreshList((e) => !e);
      })
      .catch((error) => {
        alert(error.toString());
      });
    // let newData = data;
    // let index = newData.findIndex((item) => item.id === id);
    // newData[index].status = "Suspend";
    // setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });

    setData([...newData]);
  };

  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = data.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setData([...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = data.filter((item) => item.checked !== true);
      setData([...newData]);
    }
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Manage Applications"></Head>

      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Manage Applications
              </BlockTitle>
              {!apiLoader && (
                <BlockDes className="text-soft">
                  <p>ISB ATS App has total {data?.length} Applications.</p>
                </BlockDes>
              )}
            </BlockHeadContent>

            <SelectApprovalListModal data={data} isOpen={approvalModal} closeModal={() => setApprovlaModal(false)} />
            <CreateApprovalListModal isOpen={createApprovalModal} closeModal={() => setCreateApprovlaModal(false)} />

            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      {/* <Button color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>Export</span>
                      </Button> */}
                      {/* <Export data={data} /> */}
                    </li>
                    {/* <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
                        User &nbsp;
                      </Button>
                    </li> */}

                    {/* <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ addRole: true })}>
                        <Icon name="plus"></Icon>
                        Role &nbsp;
                      </Button>

                    </li> */}
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/* <div className="d-flex">
        <div className="p-2">Select Job ID</div>
        <div className="p-2"> 
           <select>
              <option value={"Hello"} >Hello</option>
        </select>
        </div>
       </div> */}

        <div className="d-flex my-4">
          <button className="btn btn-secondary mx-2" onClick={() => setCreateApprovlaModal(true)}>
            + Create Approval List
          </button>

          <button className="btn btn-primary" onClick={() => setApprovlaModal(true)}>
            Move to Approval List
          </button>

          {/* FETCH APPROVAL LIST uuid and name of students */}
          {/* <button className="btn btn-secondary mx-2" onClick={()=>setApprovlaModal(true)}>Send Mail</button> */}
        </div>

        {/* <div className="d-flex">
        <div className="p-2">Select Company</div>
        <div className="p-2"> 
           <select>
              <option value={"Hello"} >Hello</option>
        </select>
        </div>
       </div> */}

        {apiLoader ? (
          <h6>Loading...</h6>
        ) : (
          <Block>
            <DataTable className="card-stretch">
              {/* <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    <div className="form-wrap">
                      <RSelect
                        options={bulkActionOptions}
                        className="w-130px"
                        placeholder="Bulk Action"
                        onChange={(e) => onActionText(e)}
                      />
                    </div>
                    <div className="btn-wrap">
                      <span className="d-none d-md-block">
                        <Button
                          disabled={actionText !== "" ? false : true}
                          color="light"
                          outline
                          className="btn-dim"
                          onClick={(e) => onActionClick(e)}
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
                          onClick={(e) => onActionClick(e)}
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
                          toggle();
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
                          onClick={() => updateTableSm(true)}
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
            </div> */}
              <div className="m-2 d-flex">
                {/* <Input placeholder="Search by Phone Number" value={searchTxt} onChange={e=>{
                setSearchTxt(e.target.value)
              }}/>
                <Input placeholder="Search by Name" value={searchTxtName} style={{marginLeft:10,marginRight:10}} onChange={e=>{
                setSearchTxtName(e.target.value)
              }}/> */}
                {/* <UncontrolledDropdown isOpen={isDropdownActive} onClick={()=>setDropdownActive(!isDropdownActive)}>
                    <DropdownToggle data-toggle="True"
                      color="tranparent"
                      className="btn btn-outline-light btn-icon dropdown-toggle"
                      style={{width:'100%',marginRight:10,padding:5}}
                    >
                    {
                      isActive==null ? 'All Users'
                      :
                      (
                        isActive ==='True' ? 'Active Users'
                        : 'Inactive Users'
                      )
                    }
                    </DropdownToggle>
                    <DropdownMenu end className="dropdown-menu-xs" >
                      <ul className="link-tidy sm no-bdr" style={{cursor:'pointer'}}>
                       <li onClick={()=>setActive(null)}>All Users</li>
          
                       <li onClick={()=>setActive('True')}>Active Users</li>
                       
                       <li onClick={()=>setActive('False')}>Inactive Users</li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown> 
              <Button color="dark" onClick={()=>{setRefreshList(x=>!x)}}>Search</Button> */}
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
                    <span className="sub-text">Phone</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="sub-text">CV Link</span>
                  </DataTableRow>

                  {/* <DataTableRow size="md">
                  <span className="sub-text">Phone</span>
                </DataTableRow> */}
                  {/* <DataTableRow size="lg">
                  <span className="sub-text">Verified</span>
                </DataTableRow> */}
                  <DataTableRow size="lg">
                    <span className="sub-text">Job ID</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span className="sub-text">Applied Date & Time</span>
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
                                {/* <UserAvatar
                                theme={item.avatarBg}
                                text={findUpper(item?.name)}
                                image={item.image}
                              ></UserAvatar> */}
                                <div className="user-info">
                                  <span className="tb-lead">
                                    {item?.name}{" "}
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
                              {item.phoneNumber} <span className="currency"> </span>
                            </span>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <span>{item.cvUrl}</span>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <span>{item.jobId}</span>
                          </DataTableRow>

                          <DataTableRow size="md">
                            <span>{item.phoneNumber}</span>
                          </DataTableRow>

                          <DataTableRow size="lg">
                            <span>{dayjs(item.createdAt).format("DD/M/YYYY HH:mm A")}</span>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <span className={`tb-status text-${item.status === "APPLIED" ? "success" : "warning"}`}>
                              {item?.status}
                              {/* {item.activeStatus===false ? "Inactive":"Active"} */}
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
                {currentItems.length > 0 ? (
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
          </Block>
        )}

        <AddRole
          modal={modal.addRole}
          formData={roleData}
          setFormData={setRoleData}
          closeModal={closeRoleModal}
          onSubmit={onFormSubmitRole}
          filterStatus={filterStatus}
        />

        <AddModal
          modal={modal.add}
          formData={formData}
          setFormData={setFormData}
          closeModal={closeModal}
          onSubmit={onFormSubmit}
          filterStatus={filterStatus}
        />
        <EditModal
          modal={modal.edit}
          formData={editFormData}
          setFormData={setEditFormData}
          closeModal={closeEditModal}
          onSubmit={onEditSubmit}
          filterStatus={filterStatus}
        />
      </Content>
    </React.Fragment>
  );
};
export default RatifiUserListRegularPage;
