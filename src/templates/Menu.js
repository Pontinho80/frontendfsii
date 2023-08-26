import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import {Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default function Menu(props){
    return(
        <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/"><Navbar.Brand>Menu</Navbar.Brand></LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">                  
              <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                <LinkContainer to="/cadastroCliente"><NavDropdown.Item>Cliente</NavDropdown.Item></LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/cadastroConsumo"><NavDropdown.Item>Consumo Produtos</NavDropdown.Item></LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/cadastroServico"><NavDropdown.Item>Consumo Serviços</NavDropdown.Item></LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/cadastrarServico"><NavDropdown.Item>Cadastro Serviços</NavDropdown.Item></LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/servicoCamareiro"><NavDropdown.Item>Atividade Camareiro</NavDropdown.Item></LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
} 