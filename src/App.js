import { Container } from "react-bootstrap";
import TelaCadastroDeCliente from "./TelasDeCadastro/TelaDeCadastroDeCliente";
import TelaCadastroDeConsumo from "./TelasDeCadastro/TelaDeCadastroDeConsumo";
import TelaCadastroDeServico from "./TelasDeCadastro/TelaDeCadastroDeServico";
import TelaServico from "./TelasDeCadastro/TelaDeServico";
import TelaCadastroDeAtividade from "./TelasDeCadastro/TelaDeCadastroDeAtividade";
import TelaMenu from "./TelasDeCadastro/TelaMenu";
import Tela404 from "./TelasDeCadastro/Tela404";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
   <Container w-100>
    <BrowserRouter>
      <Routes>
        <Route path="/cadastroCliente" element={<TelaCadastroDeCliente/>}/>
        <Route path="/cadastroConsumo" element={<TelaCadastroDeConsumo/>}/>
        <Route path="/cadastroServico" element={<TelaCadastroDeServico/>}/>
        <Route path="/cadastrarServico" element={<TelaServico/>}/>
        <Route path="/servicoCamareiro" element={<TelaCadastroDeAtividade/>}/>
        <Route path="/" element={<TelaMenu/>}/>
        <Route path="*" element={<Tela404/>}/>
      </Routes>
    </BrowserRouter>
   </Container>
  );
}
export default App;
