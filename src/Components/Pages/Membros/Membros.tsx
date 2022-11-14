import { Link } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";
import style from "../Livros/Livros.module.css";
import { MembroForm } from "./MembroForm";
import { DataTable } from "../Tabela/DataTable";
import { useEffect, useState } from "react";
import { loadMembros } from "../../../lib/dao_membro";
import { TitleBar } from "../../Template/TitleBar";

const columns = [
  { headename: "Nome", field: "nome" },
  { headename: "Apelido", field: "apelido" },
  { headename: "Apelido", field: "apelido" },
  { headename: "NrBI", field: "nrBI" },
  {
    headename: "eDocente",
    field: "eDocente",
    cellRendererFramework: (params: any) => (
      <Icon
        color={params.data.eDocente ? "green" : "red"}
        name={params.data.eDocente ? "check" : "close"}
      />
    ),
  },
  {
    headename: "info",
    field: "info",
    cellRendererFramework: (params: any) => (
      <Link to={"/membros/" + params.data.id}>
        <Button size="tiny" basic color="red">
          <Icon name="info circle" />
          info
        </Button>
      </Link>
    ),
  },
];

export function Membros() {
  const [dados, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setisLoading] = useState(false);
  async function setTable() {
    setisLoading(true);
    let res = await loadMembros();
    setData(res.data);
    setisLoading(false);
  }

  useEffect(() => {
    setTable();
  }, [update]);
  return (
    <>
      <TitleBar
        loading={loading}
        title={"Membros"}
        titleIcon={"id card outline"}
      />
      <Segment className={style.mainContent}>
        <MembroForm setUpadate={setUpdate} update={update} />
        <DataTable dataSource={dados} columns={columns} />
      </Segment>
    </>
  );
}
