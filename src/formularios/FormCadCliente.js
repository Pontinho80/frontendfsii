import React, { useState, useRef, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento';
import TelaErro from '../TelasDeCadastro/TelaErro';
import STATUS from '../utilitarios/util';

export default function FormCadCliente(props) {

  function cadastrarCliente(cliente) {
    fetch('http://localhost:4000/clientes', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    }).then((resposta) => {
      return resposta.json();
    }).then((dados) => {
      setStatus(STATUS.sucesso);
      props.listaClientes.push(cliente);
      props.onTabela(true);
    }).catch((erro) => {
      setStatus(STATUS.erro);
    });
  }
  const [formValidado, setFormValidado] = useState(false);
  const [status, setStatus] = useState(STATUS.sucesso);

  const cpf = useRef("");
  const nome = useRef("");
  const sobrenome = useRef("");
  const usuario = useRef("");
  const cidade = useRef("");
  const uf = useRef("");
  const cep = useRef("");

  function validarDados() {
    const cliente = {
      cpf: cpf.current.value,
      nome: nome.current.value,
      sobrenome: sobrenome.current.value,
      usuario: usuario.current.value,
      cidade: cidade.current.value,
      uf: uf.current.value,
      cep: cep.current.value
    }
    if (cliente.cpf && cliente.nome && cliente.sobrenome && cliente.usuario &&
      cliente.cidade && cliente.uf && cliente.cep)
      return cliente;
    else
      return undefined;
  }

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const cliente = validarDados();
      if (cliente) {
        setStatus(STATUS.ocioso);
        cadastrarCliente(cliente);
        
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
          <h2>Fomulario de Cadastro de Cliente</h2>
        </Row>
        <Row className="mt-3 p-2 border">
          <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>CPF:</Form.Label>
                <Form.Control
                  required
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="cpf"
                  ref={cpf}

                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o CPF!!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  required
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Primeiro nome"
                  ref={nome}

                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o nome do cliente!!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  required
                  id="sobrenome"
                  name="sobrenome"
                  type="text"
                  placeholder="Sobrenome"
                  ref={sobrenome}
                />
                <Form.Control.Feedback type="invalid">
                  Por Favor informe o sobrenome do Cliente!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Usuário</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    id="usuario"
                    name="usuario"
                    required
                    ref={usuario}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por Favor informe o usuário".
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  id="cidade"
                  name="cidade"
                  type="text"
                  placeholder="Cidade"
                  required
                  ref={cidade} />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a cidade do cliente.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>UF</Form.Label>
                <Form.Control
                  id="uf"
                  name="uf"
                  type="text"
                  placeholder="UF"
                  required
                  ref={uf} />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o estado do cliente.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  id="CEP"
                  name="CEP"
                  placeholder="CEP"
                  required
                  ref={cep} />
                <Form.Control.Feedback type="invalid">
                  Por Favor informe o CEP do cliente.
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
  else if (status == STATUS.ocioso){
    return (
      <TelaCarregamento />
    );
  }
  else {
    return(
      <TelaErro mensagem="Não foi possível recuperar os dados dos clientes.
                          Entre emcontato com o administrador do Sistema"/>
    );
  }
}