import React, { useRef, useState, useReducer } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import TelaCarregamento from '../TelasDeCadastro/TelaCarregamento';
import TelaErro from '../TelasDeCadastro/TelaErro';
import STATUS from '../utilitarios/util';


export default function FormCadServico(props) {

  function cadastrarConsumoServico(consumoservico) {
    if (!props.modoEdicao){
      fetch('http://localhost:4000/consumoservico', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consumoservico)
    }).then((resposta) => {
      return resposta.json();
    }).then((dados) => {
      setStatus(STATUS.sucesso);
      props.listaConsumoServicos.push(consumoservico);
      props.onTabela(true);
    }).catch((erro) => {
      setStatus(STATUS.erro);
    });
    }
    else
    {
      fetch('http://localhost:4000/consumoservico', {
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(consumoservico)
      }).then((resposta) => {
        alert("Atualizado com sucesso");
      });
    }
    
  }

  const [formValidado, setFormValidado] = useState(false);
  const [status, setStatus] = useState(STATUS.sucesso);
  const [consumoservico, setConsumoServico] = useState(props.consumoservico);

  const quarto = useRef("");
  const nome = useRef("");
  const codigo = useRef("");
  const descricao = useRef("");
  const valor = useRef("");
  const periodoinc = useRef("");
  const periodofim = useRef("");
  const total = useRef("");

  function validarDados() {
    const consumoservico = {
      quarto: quarto.current.value,
      nome: nome.current.value,
      codigo: codigo.current.value,
      descricao: descricao.current.value,
      valor: valor.current.value,
      periodoinc: periodoinc.current.value,
      periodofim: periodofim.current.value,
      total: total.current.value
    }
    if (consumoservico.quarto && consumoservico.nome && consumoservico.codigo && consumoservico.descricao &&
      consumoservico.valor && consumoservico.periodoinc && consumoservico.periodofim && consumoservico.total)
      return consumoservico;
    else
      return undefined;
  }

  function manipularSubmissao(evento) {
    const formulario = evento.currentTarget;
    if (formulario.checkValidity()) {
      const consumoservico = validarDados();
      if (consumoservico) {
        setStatus(STATUS.ocioso);
        cadastrarConsumoServico(consumoservico);
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
          <h2>Fomulário de Serviços Consumidos pelo Quarto</h2>
        </Row>
        <Row>
          <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
              <Form.Group as={Col} md="2" controlId="validationCustom01">
                <Form.Label>Quarto:</Form.Label>
                <Button variant="outline-primary" size="sm" id="button-addon1">
                  Pesquisar
                </Button>
                <Form.Control
                  required
                  id="quarto"
                  name="quarto"
                  type="text"
                  placeholder="Numero"
                  ref={quarto}/>
                <Form.Control.Feedback type="invalid">
                  Por favor informe o numero do quarto!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="10" >
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
                  Por Favor informe o sobrenome do Cliente!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">

              <Form.Group as={Col} md="2" controlId="validationCustom03">

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
                  ref={codigo}/>

                <Form.Control.Feedback type="invalid">
                  Por favor informe o código do serviço.
                </Form.Control.Feedback>

              </Form.Group>
              <Form.Group as={Col} md="7" controlId="validationCustom04">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  id="descricao"
                  name="descricao"
                  type="text"
                  placeholder="Descrição"
                  required
                  ref={descricao}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a descrição do serviço.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom05">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="text"
                  id="valor"
                  name="valor"
                  placeholder="Valor"
                  required
                  ref={valor}
                />

              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom06">
                <Form.Label>Inicio</Form.Label>
                <Form.Control
                  type="text"
                  id="periodoinc"
                  name="periodo"
                  placeholder="Período"
                  required
                  ref={periodoinc}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom07">
                <Form.Label>Fim</Form.Label>
                <Form.Control
                  type="text"
                  id="periodofim"
                  name="periodo"
                  placeholder="Período"
                  required
                  ref={periodofim}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="validationCustom08">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="text"
                  id="total"
                  name="total"
                  placeholder="Total"
                  required
                  ref={total}
                />
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
                          Entre emcontato com o administrador do Sistema"/>
    );
  }

}