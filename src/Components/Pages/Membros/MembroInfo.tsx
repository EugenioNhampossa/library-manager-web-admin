import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Icon,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { getMembro } from "../../../lib/dao_membro";
import { TitleBar } from "../../Template/TitleBar";

export function MembroInfo() {
  const { id } = useParams();
  const [dados, setData]: any = useState({});
  const [isLoading, setisLoading] = useState(false);

  async function setInfo() {
    setisLoading(true);
    let res = await getMembro(String(id));
    setData(res.data);
    setisLoading(false);
  }

  useEffect(() => {
    setInfo();
  }, []);

  const buttonLink = (
    <Link to="/membros">
      <Button size="mini" floated="right" className="titleBarButton">
        <Icon name="arrow alternate circle left" />
        voltar
      </Button>
    </Link>
  );

  return (
    <>
      <TitleBar
        title={"Membro"}
        titleIcon={"id card outline"}
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
            <Label horizontal>É docente?</Label>
            {dados.eDocente ? "sim" : "não"}
          </List.Item>
        </List>
      </Segment>
    </>
  );
}
