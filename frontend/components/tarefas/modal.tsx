import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import axios from 'axios'

export default function modal(props) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [show, setShow] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [descricao, setDescricao] = useState('');

        
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        
        const put = async e => {
          console.log(descricao)
          let url = "http://localhost:8000/tarefas/".concat(props.tarefaId)
    
          const headers = {'headers': {'Content-Type': 'application/json'}}
          const tarefas = await axios.put(url, {descricao: descricao}, headers)
          // await location.replace("http://localhost:3000")
        }

        // console.log(props)
        
        return (
          <>
            {/* <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button> */}
            <button onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
            <form onSubmit={put}>
              <Modal.Body>
                
                  <label className="pr-2">Descrição: </label>
                  <input className="border-2" type="text" placeholder={props.tarefaDescricao} onChange={e => setDescricao(e.target.value)}/>

              </Modal.Body>
              
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
              
            </Modal>
          </>
        );
}