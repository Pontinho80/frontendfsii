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

export default function FormCadAtividade(props) {

    function cadastrarAtividade(atividade) {
        if (!props.modoEdicao) {
            fetch('http://localhost:4000/atividadecamareiro', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(atividade)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setStatus(STATUS.sucesso);
                props.listaAtividades.push(atividade);
                props.onTabela(true);
            }).catch((erro) => {
                setStatus(STATUS.erro);
            });
        }
        else {
            fetch('http://localhost:4000/atividadecamareiro', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(atividade)
            }).then((resposta) => {
                alert("Atualizado com sucesso");
            });
        }

    }

    const [formValidado, setFormValidado] = useState(false);
    const [status, setStatus] = useState(STATUS.sucesso);
    const [atividade, setAtividade] = useState(props.atividade);

    const id = useRef("");
    const descricao = useRef("");
    const prioridade = useRef("");
    const tempomin = useRef("");



    function validarDados() {
        const atividade = {
            id: id.current.value,
            descricao: descricao.current.value,
            prioridade: prioridade.current.value,
            tempomin: Number(tempomin.current.value)<0?null:tempomin.current.value
        }
        console.log(atividade)
        if (atividade.id && atividade.descricao && atividade.prioridade && atividade.tempomin)
            return atividade;
        else
            return undefined;
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const atividade = validarDados();
            if (atividade) {
                setStatus(STATUS.ocioso);
                cadastrarAtividade(atividade);
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
                    <h2>Fomulario de Cadastrar Atividade de Camareiro</h2>
                </Row>
                <Row>
                    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2" >
                                <Form.Label>ID:</Form.Label>
                                <Form.Control
                                    required
                                    id="id"
                                    name="id"
                                    type="int"
                                    placeholder="id"
                                    ref={id}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe o Código!!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="10">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    required
                                    id="descricao"
                                    name="descricao"
                                    type="text"
                                    placeholder="Descrição"
                                    ref={descricao}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por Favor informe a Descrição!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Select aria-label="Default select example"
                                    required
                                    id="prioridade"
                                    name="prioridade"
                                    type="text"
                                    placeholder="Prioridade"
                                    ref={prioridade}>
                                    <option value="">Prioridade</option>
                                    <option value="1">1- Baixa</option>
                                    <option value="2">2- Média</option>
                                    <option value="3">3- Alta</option>
                                    <option value="4">4- Urgente</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe a Prioridade!!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group md="4">
                                <Form.Label>Tempo Médio de Duração em Minutos</Form.Label>
                                <Form.Control
                                    required
                                    id="tempomin"
                                    name="tempomin"
                                    type="int"
                                    placeholder="Tempo em minutos"
                                    ref={tempomin}/>
                                <Form.Control.Feedback type="invalid">
                                    Por favor informe o Tempo Médio em Minutos!!
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Button type="submit">Cadastrar</Button>
                        <Button onClick={() => {
                            props.onTabela(true);
                        }} type="button">Voltar</Button>
                    </Form>

                </Row >

            </Container >
        );
    }
    else if (status == STATUS.ocioso) {
        return (
            <TelaCarregamento/>
        );
    }
    else {
        return (
            <TelaErro mensagem="Não foi possível recuperar os dados dos Consumos dos Produtos.
                            Entre emcontato com o administrador do Sistema"/>
        );
    }
}