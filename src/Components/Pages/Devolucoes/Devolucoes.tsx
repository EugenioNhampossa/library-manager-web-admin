import { Header, Icon, Pagination, Segment, Table } from "semantic-ui-react";
import style from "../Livros/Livros.module.css";
import { DevolucoesForm } from "./DevolucoesForm";

export function Devolucoes() {
  return (
    <>
      <Segment clearing color="purple">
        <Header as="h3">
          <Header.Content>
            <Icon name="book" />
            Devoluções
          </Header.Content>
        </Header>
      </Segment>
      <Segment className={style.mainContent}>
        <DevolucoesForm />
        <Table className={style.tabela} selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Titulo do livro</Table.HeaderCell>
              <Table.HeaderCell>Membro</Table.HeaderCell>
              <Table.HeaderCell>Data do Empréstimo</Table.HeaderCell>
              <Table.HeaderCell>Data da Devolução</Table.HeaderCell>
              <Table.HeaderCell>Funcionário</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
              <Table.Cell>kdslfks</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Pagination defaultActivePage={1} totalPages={3} />{" "}
      </Segment>
    </>
  );
}
