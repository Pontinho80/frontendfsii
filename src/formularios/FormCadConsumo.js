import React, { useState, useRef, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import STATUS from '../utilitarios/util';
import TelaErro from '../TelasDeCadastro/TelaErro';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento';


export default function FormCadConsumo(props) {

  function cadastrarConsumo(consumoproduto) {
    if (!props.modoEdicao) {
      fetch('http://localhost:4000/consumoproduto', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consumoproduto)
      }).then((resposta) => {
        return resposta.json();
      }).then((dados) => {
        setStatus(STATUS.sucesso);
        props.listaConsumoProdutos.push(consumoproduto);
        props.onTabela(true);
      }).catch((erro) => {
        setStatus(STATUS.erro);
      });
    }
    else
    {
      fetch('http://localhost:4000/consumoproduto', {
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(consumoproduto)
      }).then((resposta) => {
        alert("Atualizado com sucesso");
      });
    }

  }

  const [formValidado, setFormValidado] = useState(false);
  const [status, setStatus] = useState(STATUS.sucesso);
  const [consumoproduto, setConsumoProduto] = useState(props.consumoproduto);

  const quarto = useRef("");
  const nome = useRef("");
  const codigo = useRef("");
  const item = useRef("");
  const quantidade = useRef("");
  const total = useRef("");


  function validarDados() {
    const consumoproduto = {
      quarto: quarto.current.value,
      nome: nome.current.value,
      codigo: codigo.current.value,
      item: item.current.value,
      quantidade: quantidade.current.value,
      total: total.current.value

    }
    if (consumoproduto.quarto && consumoproduto.nome && consumoproduto.codigo && consumoproduto.item &&
      consumoproduto.quantidade && consumoproduto.total)
      return consumoproduto;
    else
      return undefined;
  }

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const consumoproduto = validarDados();
      if (consumoproduto) {
        setStatus(STATUS.ocioso);
        cadastrarConsumo(consumoproduto);
      }
    }
    evento.preventDefault();
    evento.stopPropagation();
    setFormValidado(true);
  };

  if (status == STATUS.sucesso) {
    return (
      <Container>
        <Row className="mb-3 border d-flex text-center">
          <h2>Fomulario de Consumo</h2>
        </Row>
        <Row>
          <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" >
                <Form.Label>Quarto:</Form.Label>
                <Form.Control
                  required
                  id="quarto"
                  name="quarto"
                  type="int"
                  placeholder="Numero"
                  ref={quarto}

                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o Consumo!!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="10">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Nome do Hóspede"
                  ref={nome}
                />
                <Form.Control.Feedback type="invalid">
                  Por Favor informe o Nome!
                </Form.Control.Feedback>
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="1" >
                <Form.Label>Código:</Form.Label>
                <Form.Control
                  required
                  id="codigo"
                  name="codigo"
                  type="int"
                  placeholder="id"
                  ref={codigo}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o nome do cliente!!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Item Consumido</Form.Label>
                <Form.Control
                  id="item"
                  name="item"
                  type="text"
                  placeholder="Descrição do Produto"
                  required
                  ref={item}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o Item!!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" >
                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  id="quantidade"
                  name="quantidade"
                  type="int"
                  placeholder="Quantidade"
                  required
                  ref={quantidade}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a Quantidade!!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="text"
                  id="total"
                  name="total"
                  placeholder="Total"
                  required
                  ref={total}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o Total!!
                </Form.Control.Feedback>

              </Form.Group>
            </Row>


            <Button type="submit">Cadastrar</Button>
            <Button onClick={() => {
              props.onTabela(true);
            }} type="button">Voltar</Button>
          </Form>

        </Row>

      </Container>
    );
  }
  else if (status == STATUS.ocioso) {
    return (
      <TelaCarregamento />
    );
  }
  else {
    return (
      <TelaErro mensagem="Não foi possível recuperar os dados dos Consumos dos Produtos.
                          Entre emcontato com o administrador do Sistema"/>
    );
  }
}