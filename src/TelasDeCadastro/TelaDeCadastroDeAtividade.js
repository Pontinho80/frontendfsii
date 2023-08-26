import FormCadAtividade from "../formularios/FormCadAtividade";
import TabelaDeAtividades from "../tabelas/tabelaDeAtividade";
import { useState,useEffect } from "react";
import Pagina from "../templates/Pagina";
import STATUS from "../utilitarios/util";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";

export default function TelaCadastroDeAtividade(props) {

    function buscarAtividades() {
        fetch('http://localhost:4000/atividadecamareiro', {method:"GET"})
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaAtividades(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
                console.log(erro.mensagem);
            });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaAtividades, setListaAtividades] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [atividadeEmEdicao, setAtividadeEmEdicao] = useState({        
        id:"",
        descricao:"",
        prioridade:"",
        tempomin:""       
    });
    function prepararAtividadeParaEdicao(atividade){
        setAtualizando(true);        
        setAtividadeEmEdicao(atividade);
        setExibirTabela(false);
    }

    function alternarTelas(){
        setExibirTabela(!exibirTabela)
    }   

   async function apagarAtividade(atividade){       
       await fetch('http://localhost:4000/atividadecamareiro', {
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(atividade)        
        }).then((retorno) => {           
            if (retorno.status === 200){
                alert('Atividade excluida com sucesso!');
                buscarAtividades();
            }
            else{
                alert("Não foi possivel excluir o Consumo de Produto");
            }
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarAtividades();
    },[]);

    if (exibirTabela) {
        if(status == STATUS.ocioso){
            return(
                <TelaCarregamento/>
            );
        }
        else if (status == STATUS.sucesso){
            return (
                <Pagina>
                    <TabelaDeAtividades 
                        dados={listaAtividades} 
                        onTabela={setExibirTabela} 
                        editarAtividade={prepararAtividadeParaEdicao} 
                        excluirAtividade={apagarAtividade} 
                    />
                </Pagina>
            );
        }
        else
        {
            return(
                <TelaErro mensagem="Não foi possivel recuperar os dados das Atividades 
                                        . Entre em contato com o Administrador
                                        do Sistema" />
            );
        }    

    }
    else {
        return (
            <Pagina>
                <FormCadAtividade 
                    onTabela={setExibirTabela} 
                    listaAtividades={listaAtividades}
                    dadosDeAtividades={buscarAtividades}
                    chamarTabelaAtividades={alternarTelas}  
                    modoEdicao={atualizando} 
                    atividade={atividadeEmEdicao}
                    editarAtividades={prepararAtividadeParaEdicao}/>
            </Pagina>

        );
    }
}