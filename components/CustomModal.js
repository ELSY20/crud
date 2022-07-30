import { Modal } from "flowbite-react";
import { Fragment } from "react";
import CustomForm from "./CustomForm";

export default function CustomModal({title, show, onClose, areas, onUpdate, data, fields}) {    

  return (
    <Fragment>
    <Modal
      show={show}
      size="md"
      popup={true}
      onClose={onClose}
    >
      <Modal.Header>
        <h2 className="text-center text-black m-3 text-2xl">{title}</h2>
      </Modal.Header>
      <Modal.Body>
        <CustomForm  
          fields={fields}
          data={data}
          areas={areas}
          onSubmit={onUpdate}
          btnLabel="Actualizar"
        />
      </Modal.Body>
    </Modal>
  </Fragment>
  )
}