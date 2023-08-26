import Pagina from "../templates/Pagina"
import FormCadServico from "../formularios/FormCadServico";
import TabelaDeServicos from "../tabelas/tabelaDeServico";
import { useState,useEffect } from "react";
import STATUS from "../utilitarios/util";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";

export default function TelaCadastroDeServico(props) {

    function buscarConsumoServicos(){
        fetch('http://localhost:4000/consumoservico',{method:"GET"})
        .then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            setListaConsumoServicos(dados);
            setStatus(STATUS.sucesso);
        }).catch((erro) => {
            setStatus(STATUS.erro);
            console.log(erro.mensagem);
        });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaConsumoServicos, setListaConsumoServicos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [consumoServicoEmEdicao, setConsumoServicoEmEdicao] = useState({
        
        quarto:"",
        nome:"",
        codigo:0,
        descricao:"",
        valor:0,
        total:""
    
    });

    function prepararConsumoServicoParaEdicao(consumoservico){
        setAtualizando(true);
        setConsumoServicoEmEdicao(consumoservico);
        setExibirTabela(false);

    }

    async function apagarConsumoServico(consumoservico){       
        await fetch('http://localhost:4000/consumoservico', {
             method:"DELETE",
             headers:{'Content-Type':'application/json'},
             body: JSON.stringify(consumoservico)        
         }).then((retorno) => {           
             if (retorno.status === 200){
                 alert('Consumo de Servico excluido com sucesso!');
                 buscarConsumoServicos();
             }
             else{
                 alert("Não foi possivel excluir o Consumo de Servico");
             }
         });
     }


    useEffect(()=>{
        setStatus(STATUS.ocioso);
        buscarConsumoServicos();
    },[]);
    

    if (exibirTabela) {
        if (status == STATUS.ocioso){
            return(
                <TelaCarregamento />
            );
        }
        else if (status == STATUS.sucesso){
            return (
                <Pagina>
                    <TabelaDeServicos dados={listaConsumoServicos} onTabela={setExibirTabela} 
                    editarConsumoServico={prepararConsumoServicoParaEdicao} excluirConsumoServico={apagarConsumoServico} />
                </Pagina>
            );
        }
        else
        {
            return(
                <TelaErro mensagem="Não foi possivel recueprar os dados dos Consumos 
                de Serviços. Entre em contato com o Administrador
                do Sistema" />
            );
        }

    }
    else {
        return (
            <Pagina>
               <FormCadServico onTabela={setExibirTabela} listaConsumoServicos={listaConsumoServicos} 
               modoEdicao={atualizando} consumoservico={consumoServicoEmEdicao}/>
            </Pagina>

        );
    }
}