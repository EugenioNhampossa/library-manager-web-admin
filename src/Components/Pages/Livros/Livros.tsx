import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";
import { DataTable } from "../Tabela/DataTable";
import { loadLivros } from "../../../lib/dao_livro";
import { TitleBar } from "../../Template/TitleBar";
import style from "../Livros/Livros.module.css";

const columns = [
  { headername: "Título", field: "titulo" },
  { headername: "Autor", field: "autor" },
  { headername: "Editora", field: "editora" },
  { headername: "local", field: "local" },
  { headername: "qtyStock", field: "qtyStock" },
  {
    headername: "Mais info",
    field: "info",
    cellRendererFramework: (params: any) => (
      <Link to={"/livros/" + params.data.id}>
        <Button size="tiny" color="red" basic>
          <Icon name="info circle" />
          info
        </Button>
      </Link>
    ),
  },
];

export function Livros() {
  const [dados, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function setTable() {
    setisLoading(true);
    let res = await loadLivros();
    setData(res.data);
    setisLoading(false);
  }

  useEffect(() => {
    setTable();
  }, []);

  const button = (
    <Link to="/livros/novoLivro">
      <Button size="mini" floated="right" className="titleBarButton">
        <Icon name="add circle" />
        Novo Livro
      </Button>
    </Link>
  );

  return (
    <>
      <TitleBar title={"Livros"} titleIcon={"book"} link={button} />
      <Segment clearing className={style.mainContent}>
        <DataTable dataSource={dados} columns={columns} />
      </Segment>
    </>
  );
}
