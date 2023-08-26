import Pagina from "../templates/Pagina";

export default function Tela404(props){
    return(
        <Pagina>
            <div className="center">
                <p> A página Solicitada não Existe</p>
                <p> Use o menu do sistema para selcionar a opção correta</p>
            </div>
        </Pagina>
    )
}