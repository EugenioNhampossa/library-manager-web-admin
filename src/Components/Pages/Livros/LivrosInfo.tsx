import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../Livros/Livros.module.css";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { getLivro } from "../../../lib/dao_livro";
import { TitleBar } from "../../Template/TitleBar";

export function LivrosInfo() {
  const { id } = useParams();
  const [dados, setData]: any = useState({});
  const [isLoading, setisLoading] = useState(false);

  async function setInfo() {
    setisLoading(true);
    let res = await getLivro(String(id));
    setData(res.data);
    setisLoading(false);
  }

  useEffect(() => {
    setInfo();
  },[]);

  const linkButton = (
    <Link to="/livros">
      <Button size="mini" floated="right" className="titleBarButton">
        <Icon name="arrow alternate circle left" />
        voltar
      </Button>
    </Link>
  );

  return (
    <>
      <TitleBar title={"Livro"} titleIcon={"book"} link={linkButton} />
      <Segment clearing className={style.mainContent}>
        <Header as="h3">{dados.titulo}</Header>
        <Divider />
        <Grid columns={"equal"} stackable>
          <Grid.Column>
            <Segment color="brown">
              <List>
                <List.Item>
                  <Label color="blue" horizontal>
                    Autor
                  </Label>
                  {dados.autor}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Local
                  </Label>
                  {dados.local}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Editora
                  </Label>
                  {dados.editora}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Ano
                  </Label>
                  {dados.ano}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Edição
                  </Label>
                  {dados.edicao}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Volume
                  </Label>
                  {dados.volume}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Nr de Páginas
                  </Label>
                  {dados.nrPaginas}
                </List.Item>
                <List.Item>
                  <Label color="blue" horizontal>
                    Quantidade disponível
                  </Label>
                  {dados.qtyStock}
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment></Segment>
          </Grid.Column>
        </Grid>
        <Segment>
          <Item.Group>
            <Item>
              <Label color="blue">Observações</Label>
            </Item>
            <Item>{dados.observacoes}</Item>
          </Item.Group>
        </Segment>
      </Segment>
    </>
  );
}
