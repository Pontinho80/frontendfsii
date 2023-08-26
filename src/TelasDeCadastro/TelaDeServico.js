import Pagina from "../templates/Pagina"
import { useState, useEffect } from "react";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";
import STATUS from "../utilitarios/util";
import TabelaServicos from "../tabelas/tabelaServico";
import FormServico from "../formularios/FormServico";

export default function TelaServico(props) {

    function buscarServicos() {
        fetch('http://localhost:4000/servico', { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaServicos(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
                console.log(erro.mensagem);
            });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaServicos, setListaServicos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [servicoEmEdicao, setServicoEmEdicao] = useState({

        codigo: "",
        descricao: "",
        valor: "",
    });

    function prepararServicoParaEdicao(servico) {
        setAtualizando(true);
        setServicoEmEdicao(servico);
        setExibirTabela(false);
    }

    async function apagarServico(servico){       
        await fetch('http://localhost:4000/servico', {
             method:"DELETE",
             headers:{'Content-Type':'application/json'},
             body: JSON.stringify(servico)        
         }).then((retorno) => {           
             if (retorno.status === 200){
                 alert('Serviço excluido com sucesso!');
                 buscarServicos();
             }
             else{
                 alert("Não foi possivel excluir o Serviço");
             }
         });
     }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarServicos();
    }, []);

    if (exibirTabela) {
        if (status == STATUS.ocioso) {
            return (
                <TelaCarregamento />
            );
        }
        else if (status == STATUS.sucesso) {
            return (
                <Pagina>
                    <TabelaServicos dados={listaServicos} onTabela={setExibirTabela}
                        editarServico={prepararServicoParaEdicao} excluirServico={apagarServico} />
                </Pagina>
            );
        }
        else {
            return (
                <TelaErro mensagem="Não foi possível recuperar os dados dos serviços.
                                    Entre emcontato com o administrador do Sistema"/>
            );
        }

    }
    else {
        return (
            <Pagina>
                <FormServico onTabela={setExibirTabela} listaServicos={listaServicos}
                    modoEdicao={atualizando} servico={servicoEmEdicao} />
            </Pagina>

        );
    }
}