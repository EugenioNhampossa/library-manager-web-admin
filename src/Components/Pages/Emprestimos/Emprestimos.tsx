import { useEffect, useState } from "react";
import { Button, Icon, Segment } from "semantic-ui-react";
import style from "../Livros/Livros.module.css";
import { DataTable } from "../Tabela/DataTable";
import { EmprestimosForm } from "./EmprestimosForm";
import { loadEmprestimos } from "../../../lib/dao_emprestimo"
import { Link } from "react-router-dom";
import { TitleBar } from "../../Template/TitleBar";

const columns = [
  { headename: "Livro", field: "titulo" },
  { headename: "Membro", field: "membro" },
  {
    headename: "dataEmprestimo",
    field: "dataEmprestimo",
    cellRendererFramework: (params: any) => (
      <Icon
        color={params.data.devolvido ? "green" : "red"}
        name={params.data.devolvido ? "check circle" : "close"}
      />
    ),
  },
  { headename: "Funcionario", field: "funcionario" },
  {
    headename: "devolvido",
    field: "devolvido",
    cellRendererFramework: (params: any) => (
      <span>
        {new Date(params.data.dataEmprestimo).toLocaleDateString("pt-br")}
      </span>
    ),
  },
  {
    headename: "info",
    field: "info",
    cellRendererFramework: (params: any) => (
      <Link to={"/emprestimos/" + params.data.id}>
        <Button size="tiny" color="red" basic>
          <Icon name="info circle" />
          info
        </Button>
      </Link>
    ),
  },
];

export function Emprestimos() {
  const [dados, setData]: any[] = useState([]);

  async function setTable() {
    //setisLoading(true);
    let res = await loadEmprestimos();
    setData(res.data);
    //setisLoading(false);
  }

  useEffect(() => {
    setTable();
  }, []);

  return (
    <>
      <TitleBar title={"Empréstimos"} titleIcon={"handshake outline"} />
      <Segment className={style.mainContent}>
        <EmprestimosForm />
        <DataTable dataSource={dados} columns={columns} />
      </Segment>
    </>
  );
}
