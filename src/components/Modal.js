import React, { useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import axios from 'axios'

const ModalComponent = (props) => {
  const {
    buttonLabel,
    className,
    isShown,
    closeModal,
    updateItem
  } = props;

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('')
  const toggle = () => setModal(!modal);

  const isClose = () => {
    props.closeModal(modal)
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const updateDb = () => {
    axios.put(`http://localhost:4000/api/todos/${updateItem._id}`, {
      name: name,
      isDone: updateItem.isDone
    })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    props.closeModal(modal)
  }


  return (
      <div>
        <Modal isOpen={isShown} toggle={isClose} className={className}>
          <ModalHeader toggle={isClose}>{updateItem._id}</ModalHeader>
          <ModalBody>
            <Input placeholder={updateItem.name} value={name} onChange={(e) => handleChange(e)}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateDb}>Update</Button>{' '}
            <Button color="secondary" onClick={isClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
  );
}

export default ModalComponent;
