import { Container } from "react-bootstrap";

export default function Rodape(props){
    return(
        <Container style={{'position':'absolute','bottom':'0'}} className="bg-success text-light border d-flex justify-content-center align-content-center d-flex"  >
        <h5>{props.texto ||"Sistema AEHI - Hotel Recanto Feliz"}</h5>
    </Container>
           
        
    );
}