import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Icon,
  Label,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
import { getFuncionario } from "../../../lib/dao_funcionario";
import { TitleBar } from "../../Template/TitleBar";

export function FuncionarioInfo() {
  const { id } = useParams();
  const [dados, setData]: any = useState({});
  const [isLoading, setisLoading] = useState(false);

  async function setInfo() {
    setisLoading(true);
    let res = await getFuncionario(String(id));
    setData(res.data);
    setisLoading(false);
  }

  useEffect(() => {
    setInfo();
  }, []);

  const buttonLink = (
    <Link to="/funcionarios">
      <Button size="mini" floated="right" className="titleBarButton">
        <Icon name="arrow alternate circle left" />
        voltar
      </Button>
    </Link>
  );

  return (
    <>
      <TitleBar
        title={"Funcionário"}
        titleIcon={"user outline"}
        link={buttonLink}
      />
      <Segment clearing style={{ height: "86%" }}>
        <Header as="h3">
          <Icon name="user" />
          {dados.nome + " " + dados.apelido}
        </Header>
        <Divider />
        <List selection>
          <List.Item>
            <Label horizontal>Nr de BI</Label>
            {dados.nrBI}
          </List.Item>
          <List.Item>
            <Label horizontal>Nome de Usuário</Label>
            {dados.nomeUsuario}
          </List.Item>
          <List.Item>
            <Label horizontal>Função</Label>
            {dados.permissao}
          </List.Item>
        </List>
      </Segment>
    </>
  );
}
