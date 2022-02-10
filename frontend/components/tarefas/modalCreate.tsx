import React from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useState } from "react";
import axios from 'axios'

function MyVerticallyCenteredModal(props) {

  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const post = async e => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("descricao", descricao);
    console.log(formData.getAll("descricao"))

    const headers = {'headers': {'Content-Type': 'application/json'}}
    const tarefas = await axios.create({baseURL: "http://localhost:8000"}) 
    const res = await tarefas.post("/tarefas", {descricao: descricao}, headers)
    .then((response) => {
      setStatus({
        type: 'success',
        mensagem: 'response.data.mensagem'
      })
    }).catch((err) => {
      if(err.response){
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem
        });
      }else{
        setStatus({
          type: 'error',
          mensagem: "Erro: Tente mais tarde!"
        });
      }
    })
  }

  console.log(props)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>

        {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
        {status.type === 'error' ? <p style={{color: "red"}}>{status.mensagem}</p> : ""}

        <Modal.Body>
{/*           <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p> */}
          <form className="border-2 p-8" onSubmit={post}>
            <label>Tarefa:  </label>
            <input className="border-2" type="text" name="descricao" onChange={e => setDescricao(e.target.value)}/>
            <button className="border-2" type="submit">Salvar</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function App(props) {
    const [modalShow, setModalShow] = React.useState(false);
    console.log(props)
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
export default App