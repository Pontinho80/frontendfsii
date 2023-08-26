import Pagina from "../templates/Pagina"
import FormCadCliente from "../formularios/FormCadCliente";
import TabelaDeClientes from "../tabelas/tabelaDeCliente";
import { useState,useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";

export default function TelaCadastroDeCliente(props) {

    function buscarClientes(){
        fetch('http://localhost:4000/clientes',{method:"GET"})
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaClientes(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
            console.log(erro.mensagem);
        });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaClientes, setListaClientes] = useState([]);

    useEffect(()=>{
        setStatus(STATUS.ocioso);
        buscarClientes();
    },[]);

    if (exibirTabela) {
        if (status == STATUS.ocioso){
            return (
                <TelaCarregamento />
            );
        }
        else if (status == STATUS.sucesso){
            return (
                <Pagina>
                    <TabelaDeClientes dados={listaClientes} onTabela={setExibirTabela} />
                </Pagina>
            );
        }
        else 
        {
            return(
                <TelaErro mensagem="Não foi possível recuperar os dados dos clientes.
                                    Entre emcontato com o administrador do Sistema"/>
            );
        }

    }
    else {
        return (
            <Pagina>
                <FormCadCliente onTabela={setExibirTabela} listaClientes={listaClientes} />
            </Pagina>

        );
    }
}