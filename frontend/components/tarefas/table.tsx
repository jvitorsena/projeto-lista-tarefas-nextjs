import Table from "react-bootstrap/Table"
import Modal from './modal'
import axios from 'axios'
import { useState } from "react"
import Modalteste from './modalteste'
import { useEffect } from "react"

export default function table(props) {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [descricao, setDescricao] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [status, setStatus] = useState({
      type: '',
      mensagem: ''
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [idTarefa, setIdTarefa] = useState('')



    const reverse = async function(atr) {
      let url = "http://localhost:8000/tarefas/".concat(atr)
      console.log(atr)

      const headers = {'headers': {'Content-Type': 'application/json'}}
      const tarefas = await axios.put(url, {tipoId: "2"}, headers)
      await location.replace("http://localhost:3000")
    }

    const check = async function(atr) {
      let url = "http://localhost:8000/tarefas/".concat(atr)
      console.log(atr)

      const headers = {'headers': {'Content-Type': 'application/json'}}
      const tarefas = await axios.put(url, {tipoId: "3"}, headers)
      await location.replace("http://localhost:3000")
    }

    const del = async function(atr) {
      let url = "http://localhost:8000/tarefas/".concat(atr)
      console.log(url)

      const headers = {'headers': {'Content-Type': 'application/json'}}
      const tarefas = await axios.delete(url, {data: {}})
        .then((response) => {
          setStatus({
            type: 'success',
            mensagem: "Deletad com sucesso"
          })
        })
      // await location.reload()
      // await location.replace("http://localhost:3000")
      console.log(tarefas)
    }

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
      // await location.replace("http://localhost:3000")
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
                              {/* Método para deletar tarefa */}
                              {(props.taskType == "concluidos" || "todasTarefas") ?
                                <>
                                  <button className="pl-2 pr-2" onClick={() => del(tarefa.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </>
                              : null}
                              {/* Método para concluir tarefa*/}
                              {(props.taskType == "pendentes") ? 
                                <button className="pl-2 pr-2" onClick={() => check(tarefa.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                              : null}
                              {/* Método para revertar tarefa de concluido para pendente */}
                              {(props.taskType == "concluidos") ?
                                <button className="pl-2 pr-2" onClick={() => reverse(tarefa.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                  </svg>
                                </button>
                              : null}
                              {(props.taskType == "pendentes") ? 
                              <Modal tarefaDescricao={tarefa.tarefa} tarefaId={tarefa.id} />
                              : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* <CreateModal teste="atributo teste"/> */}
            {/* {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""} */}
            {/* {status.type === 'error' ? <p style={{color: "red"}}>{status.mensagem}</p> : ""} */}
            {status.type === 'success' ? <Modalteste/> : null}

            {(props.taskType == "pendentes") ? 
            <form className="border-2 p-8" onSubmit={post}>
                <label className="pr-2">Nova tarefa: </label>
                <input className="border-2" type="text" name="descricao" size={100} maxLength={1000} onChange={e => setDescricao(e.target.value)}/>
                <button className="border-2" type="submit">Salvar</button>
            </form>
            : null}
        </>
    )
}