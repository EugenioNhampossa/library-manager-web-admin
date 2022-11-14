import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import img404 from "../../../assets/404.gif";
import "./NotFound.css";

export function NotFound() {
  return (
    <Container>
      <div>
        <div className="error404Img">
          <img src={img404} alt="notFound gif"/>
        </div>
        <h1>404: Page NotFound</h1>
        <b />
        <h3>Oops! A Pagina Não Pode Ser Encontrada</h3>
        <b />
        <p>
          DESCULPA, A PAGINA QUE PROCURA NÃO EXISTE, FOI REMOVIDA, O NOME FOI
          ALTERADO OU ESTÁ TEMPORARIAMENTE INDISPONIVEL.
        </p>
        <b />
        <Link to={"/"}>
          <Button primary>IR PARA PAGINA INICIAL</Button>
        </Link>
      </div>
    </Container>
  );
}
export default NotFound;
