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

const RatifiTrackPotential=()=>{



    return  <React.Fragment>

    <Head title="Potential Area"></Head>
    
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>

          
          </BlockHeadContent>
          <BlockHeadContent>
            <iframe src="https://emaprlab.users.earthengine.app/view/lt-gee-change-mapper"
            style={{
              height:'100vh',width:'100vw'

            }}
            />
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <BlockHead>


      </BlockHead>

    </Content>
  </React.Fragment>



}

export default RatifiTrackPotential;