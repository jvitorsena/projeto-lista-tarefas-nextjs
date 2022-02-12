import { useState } from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

export default function moodalteste() {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [show, setShow] = useState(true);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const teste = () => (location.replace("http://localhost:3000"))
      
        return (
          <>
            <Modal show={show} onHide={teste}>
              <Modal.Header closeButton>
                <Modal.Title>Tarefa</Modal.Title>
              </Modal.Header>
              <Modal.Body>Tarefa adicionada com sucesso !</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={teste}>
                  Close
                </Button>
{/*                 <Button variant="primary" onClick={teste}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>
          </>
        )
}