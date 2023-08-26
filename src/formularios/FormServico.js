import React, { useRef, useState, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento';
import TelaErro from '../TelasDeCadastro/TelaErro';
import STATUS from '../utilitarios/util';


export default function FormServico(props) {

  function cadastrarServico(servico) {
    if (!props.modoEdicao) {
      fetch('http://localhost:4000/servico', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico)
      }).then((resposta) => {
        return resposta.json();
      }).then((dados) => {
        setStatus(STATUS.sucesso);
        props.listaServicos.push(servico);
        props.onTabela(true);
      }).catch((erro) => {
        setStatus(STATUS.erro);
      });
    }
    else {
      fetch('http://localhost:4000/servico', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servico)
      }).then((resposta) => {
        alert("Atualizado com sucesso");
      });
    }

  }

  const [formValidado, setFormValidado] = useState(false);
  const [status, setStatus] = useState(STATUS.sucesso);
  const [servico, setServico] = useState(props.servico);

  const codigo = useRef("");
  const descricao = useRef("");
  const valor = useRef("");

  function validarDados() {
    const servico = {

      codigo: codigo.current.value,
      descricao: descricao.current.value,
      valor: valor.current.value,

    }
    if (servico.codigo && servico.descricao &&
      servico.valor)
      return servico;
    else
      return undefined;
  }

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const servico = validarDados();
      if (servico) {
        setStatus(STATUS.ocioso);
        cadastrarServico(servico);
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
          <h2>Fomulário de Cadastro Serviços</h2>
        </Row>
        <Row>
          <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="2">
                <Form.Label >Código:</Form.Label>
                <Button variant="outline-primary" size="sm" id="button-addon1">
                  Pesquisar
                </Button>
                <Form.Control
                  aria-label="Example text with button addon"
                  aria-describedby="basic-addon1"
                  id="codigo"
                  name="codigo"
                  type="text"
                  placeholder="ID"
                  required
                  ref={codigo} />

                <Form.Control.Feedback type="invalid">
                  Por favor informe o código do serviço.
                </Form.Control.Feedback>

              </Form.Group>
              <Form.Group as={Col} md="7" >
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  id="descricao"
                  name="descricao"
                  type="text"
                  placeholder="Descrição"
                  required
                  ref={descricao}/>
                <Form.Control.Feedback type="invalid">
                  Por favor informe a descrição do serviço.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" >
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="text"
                  id="valor"
                  name="valor"
                  placeholder="Valor"
                  required
                  ref={valor}/>
                <Form.Control.Feedback type="invalid">
                  Por favor informe o valor.
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
      <TelaErro mensagem="Não foi possível recuperar os dados dos clientes.
                          Entre em contato com o administrador do Sistema"/>
    );
  }

}