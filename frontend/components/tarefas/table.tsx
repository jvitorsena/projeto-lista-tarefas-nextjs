import Table from "react-bootstrap/Table"
import Modal from "../tarefas/modal"
import CreateModal from "../tarefas/modalCreate.tsx"
import axios from 'axios'
import { useState } from "react"

export default function table(props) {
    
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState({
      type: '',
      mensagem: ''
    });
  
    const post = async e => {
      // e.preventDefault()
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

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Tarefa</th>
                    <th>Situação</th>
                    <th></th>
                    {/* <th>Situação</th> */}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((tarefa) => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.id}</td>
                            <td>{tarefa.tarefa}</td>
                            <td>{tarefa["tipo.situacao"]}</td>
                            <td>
                                <Modal/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* <CreateModal teste="atributo teste"/> */}
            {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
            {status.type === 'error' ? <p style={{color: "red"}}>{status.mensagem}</p> : ""}

            <form className="border-2 p-8" onSubmit={post}>
                <label className="pr-2">Nova tarefa: </label>
                <input className="border-2" type="text" name="descricao" onChange={e => setDescricao(e.target.value)}/>
                <button className="border-2" type="submit">Salvar</button>
            </form>
        </>
    )
}