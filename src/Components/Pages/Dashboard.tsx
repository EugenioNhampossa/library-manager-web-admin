import {
  Grid,
  GridColumn,
  Header,
  Icon,
  Segment,
  Statistic,
} from "semantic-ui-react";
import { TitleBar } from "../Template/TitleBar";
import style from "./Livros/Livros.module.css";

export function Dashboard() {
  return (
    <>
      <TitleBar title={"Dashboard"} titleIcon={"tachometer alternate"} />
      <Segment className={style.mainContent}>
        <Grid columns={"equal"} stackable>
          <GridColumn>
            <Segment inverted clearing id="infoLivro">
              <Header as="h4">
                <Icon name="book" />
                Total de Livros
              </Header>
              <Statistic inverted value={3498} />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment color="green" inverted clearing id="infoMembro">
              <Header as="h4">
                <Icon name="id card outline" />
                Total de Membros
              </Header>
              <Statistic inverted value={198} />
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment color="red" inverted clearing id="infoFunc">
              <Header as="h4">
                <Icon name="handshake outline" />
                Livros Emprestados Hoje
              </Header>
              <Statistic inverted value={9} />
            </Segment>
          </GridColumn>
        </Grid>
      </Segment>
    </>
  );
}
