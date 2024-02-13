import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import http from "../../../services/APICentral";

const SelectApprovalListModal = ({ data, isOpen, closeModal }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    http
      .get("/list")
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => {});
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
      <ModalBody>
        <table>
          <thead className="p-2">
            <tr className="p-2">
              <td className="p-2">ID</td>
              <td className="p-2">Title</td>
              <td className="p-2">Count</td>
              <td className="p-2">Action</td>
            </tr>
          </thead>
          {tableData?.length > 0 &&
            tableData?.map((item) => (
              <tr key={item?.id} className="p-2">
                <td className="p-2">{item?.id}</td>
                <td className="p-2"> {item?.title}</td>
                <td className="p-2"> {JSON.parse(item?.applications)?.length}</td>
                <td className="p-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const checked = data?.filter((item) => item?.checked === true);
                       
                      http
                        .post("/update-list", {
                          listId: item?.id,
                          applications: checked,
                          title:item?.title
                        })
                        .then((res) => {

                          closeModal();
                        })
                        .catch((err) => {});




                    }}
                  >
                    ADD
                  </button>
                </td>

                <td className="p-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    SEND MAIL
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </ModalBody>
    </Modal>
  );
};
export default SelectApprovalListModal;
