import Pagina from "../templates/Pagina"
import FormCadConsumo from "../formularios/FormCadConsumo";
import TabelaDeConsumos from "../tabelas/tabelaDeConsumo";
import { useState, useEffect } from "react";
import STATUS from "../utilitarios/util";
import TelaCarregamento from "./TelaCarregamento";
import TelaErro from "./TelaErro";

export default function TelaCadastroDeConsumo(props) {

    function buscarConsumoProdutos() {
        fetch('http://localhost:4000/consumoproduto', {method:"GET"})
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaConsumoProdutos(dados);
                setStatus(STATUS.sucesso);
            }).catch((erro) => {
                setStatus(STATUS.erro);
                console.log(erro.mensagem);
            });
    }

    const [exibirTabela, setExibirTabela] = useState(true);
    const [status, setStatus] = useState(STATUS.ocioso);
    const [listaConsumoProdutos, setListaConsumoProdutos] = useState([]);
    const [atualizando, setAtualizando] = useState(false);
    const [consumoProdutoEmEdicao, setConsumoProdutoEmEdicao] = useState({        
        quarto:"",
        nome:"",
        codigo:"",
        item:"",
        quantidade:"",
        periodoinc:"",
        periodofim:"",
        total:""        
    });
    function prepararConsumoProdutoParaEdicao(consumoproduto){
        setAtualizando(true);        
        setConsumoProdutoEmEdicao(consumoproduto);
        setExibirTabela(false);
    }   
    function alternarTelas(){
        setExibirTabela(!exibirTabela)
    }

   async function apagarConsumoProduto(consumoproduto){       
       await fetch('http://localhost:4000/consumoproduto', {
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(consumoproduto)        
        }).then((retorno) => {           
            if (retorno.status === 200){
                alert('Cosumo de Produto excluido com sucesso!');
                buscarConsumoProdutos();
            }
            else{
                alert("Não foi possivel excluir o Consumo de Produto");
            }
        });
    }

    useEffect(() => {
        setStatus(STATUS.ocioso);
        buscarConsumoProdutos();
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
                    <TabelaDeConsumos 
                        dados={listaConsumoProdutos} 
                        onTabela={setExibirTabela} 
                        editarConsumoProduto={prepararConsumoProdutoParaEdicao} 
                        excluirConsumoProduto={apagarConsumoProduto} 
                    />
                </Pagina>
            );
        }
        else
        {
            return(
                <TelaErro mensagem="Não foi possivel recuperar os dados dos Consumos 
                                        de Produtos. Entre em contato com o Administrador
                                        do Sistema" />
            );
        }    

    }
    else {
        return (
            <Pagina>
                <FormCadConsumo 
                    onTabela={setExibirTabela} 
                    listaConsumoProdutos={listaConsumoProdutos}
                    dadosDeConsumos={buscarConsumoProdutos}
                    chamarTabelaConsumos={alternarTelas} 
                    modoEdicao={atualizando} 
                    consumoproduto={consumoProdutoEmEdicao}
                    editarConsumoProduto={prepararConsumoProdutoParaEdicao}/>
            </Pagina>

        );
    }
}