import React, { useEffect, useState } from "react";
import { Input, Modal, ModalBody } from "reactstrap";
import http from "../../../services/APICentral";

const CreateApprovalListModal = ({isOpen,closeModal}) => {

    const [text,setText]=useState('');

    useEffect(()=>{

        http.get('/list')
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{

        })


    },[])





  return (
    <Modal isOpen={isOpen} toggle={() => closeModal()} className="modal-dialog-centered" size="lg" >
      <ModalBody>
        <table>
            <thead className="p-2">  
                <tr className="p-2">  
      
                <td className="p-2">Title</td>
                <td className="p-2">Action</td>
                </tr>
            </thead>
            <tr className="p-2">
              
                <td className="p-2"> 
                <Input value={text} onChange={e=>setText(e.target.value)}/>
                </td>
                <td className="p-2">
                    <button className="btn btn-primary" onClick={()=>{
                        http.post('/list',{
                            title:text
                        }).then(res=>{

                            console.log(res)


                            closeModal();
                        }).catch(error=>{

                            console.log(error)
                        })


                    }}>CREATE</button>
                </td>

            </tr>
        </table>
      </ModalBody>
    </Modal>
  );
};
export default CreateApprovalListModal;
