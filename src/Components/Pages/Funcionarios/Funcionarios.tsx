import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import style from "../Livros/Livros.module.css";
import { DataTable } from "../Tabela/DataTable";
import { loadFuncionarios } from "../../../lib/dao_funcionario";
import { TitleBar } from "../../Template/TitleBar";

const columns = [
  { hedername: "Nome", field: "nome" },
  { hedername: "Apelido", field: "apelido" },
  { hedername: "NrBI", field: "nrBI" },
  {
    hedername: "Info",
    field: "info",
    cellRendererFramework: (params: any) => (
      <Link to={"/funcionarios/" + params.data.id}>
        <Button size="tiny" color="red" basic>
          <Icon name="info circle" />
          info
        </Button>
      </Link>
    ),
  },
];

export function Funcionarios() {
  const [dados, setData] = useState([]);

  async function setTable() {
    //setisLoading(true);
    let res = await loadFuncionarios();
    setData(res.data);
    //setisLoading(false);
  }

  useEffect(() => {
    setTable();
  }, []);

  const buttonLink = (
    <Link to="/funcionarios/registrar">
      <Button size="mini" floated="right" className="titleBarButton">
        <Icon name="add circle" />
        Registrar
      </Button>
    </Link>
  );

  return (
    <>
      <TitleBar title={"Funcionários"} titleIcon={"users"} link={buttonLink} />
      <Segment className={style.mainContent}>
        <DataTable dataSource={dados} columns={columns} />
      </Segment>
    </>
  );
}
