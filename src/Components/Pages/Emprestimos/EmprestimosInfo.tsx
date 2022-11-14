import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../Livros/Livros.module.css";

import {
  Button,
  Confirm,
  Grid,
  GridColumn,
  Header,
  Icon,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { getEmprestimo, setEmprestimoDevolvido } from "../../../lib/dao_emprestimo";
import { TitleBar } from "../../Template/TitleBar";
import { ModalMessage } from "../../Form/ModalMessage";

export function EmprestimosInfo() {
  const { id } = useParams();
  const [livro, setLivro]: any = useState({});
  const [funcionário, setFuncionario]: any = useState({});
  const [emprestimo, setEmprestimo]: any = useState({});
  const [membro, setMembro]: any = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
    icon: "",
  });

  async function setInfo() {
    setisLoading(true);
    let res = await getEmprestimo(String(id));
    setLivro(res.data.livro);
    setFuncionario(res.data.funcionario);
    setMembro(res.data.membro);
    setEmprestimo(res.data);
    setisLoading(false);
  }

  useEffect(() => {
    setInfo();
  }, []);

  const buttonLink = (
    <Link to="/emprestimos">
      <Button size="mini" floated="right" className="titleBarButton">
        <Icon name="arrow alternate circle left" />
        voltar
      </Button>
    </Link>
  );

  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleClick = async () => {
    setIsSubmiting(true);
    setDisabled(true);
    let res = await setEmprestimoDevolvido(String(id), String(livro.id));
    if (res.status == 201) {
      setMessageVisibility(true);
      setModalMessage({
        title: "Sucesso",
        message: "Devolução registrada",
        icon: "check circle outline",
      });
    } else {
      setMessageVisibility(true);
      setModalMessage({
        title: "Error",
        message: "Erro ao registrar a devolução",
        icon: "exclamation triangle",
      });
    }
    setIsSubmiting(false);
    setOpenConfirm(false);
  };
  return (
    <>
      <TitleBar
        title={"Empréstimo"}
        titleIcon={"handshake outline"}
        link={buttonLink}
      />
      <ModalMessage
        visibility={messageVisibility}
        setVisible={setMessageVisibility}
        title={modalMessage.title}
        message={modalMessage.message}
        icon={modalMessage.icon}
      />
      <Confirm
        open={openConfirm}
        size="mini"
        content="Deseja marcar como devolvido?"
        onCancel={(e) => setOpenConfirm(false)}
        onConfirm={(e) => handleClick()}
      />
      <Segment clearing className={style.mainContent}>
        <Grid columns={"equal"} stackable>
          <GridColumn>
            <Segment raised clearing>
              <Label color="blue">
                <Icon name="calendar minus outline" />
                Data do empréstimo
              </Label>
              <span className="infoItem">
                {new Date(emprestimo.dataEmprestimo).toLocaleDateString("pt")}
              </span>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment raised clearing>
              <Label color="blue">
                <Icon name="calendar check outline" />
                Data da devolução
              </Label>
              <span className="infoItem">
                {emprestimo.dataDevolucao
                  ? new Date(emprestimo.dataDevolucao).toLocaleDateString("pt")
                  : "N/A"}
              </span>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment raised clearing>
              <Label color="blue">
                <Icon name="question circle outline" />
                Status
              </Label>
              <span className="infoItem">
                {emprestimo.devolvido ? "Devolvido" : "Por devolver"}
              </span>
              <Icon
                color={emprestimo.devolvido ? "green" : "red"}
                name="circle"
                size="small"
              />
            </Segment>
          </GridColumn>
        </Grid>
        <Grid columns={"equal"} stackable>
          <GridColumn>
            <Segment inverted clearing id="infoLivro">
              <Header as="h4">
                <Icon name="book" />
                Livro
              </Header>
              <List relaxed inverted>
                <List.Item>
                  <Label>Título</Label>
                  <span className="infoItem">{livro.titulo}</span>
                </List.Item>
                <List.Item>
                  <Label>Autor</Label>
                  <span className="infoItem">{livro.autor}</span>
                </List.Item>
              </List>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment color="green" inverted clearing id="infoMembro">
              <Header as="h4">
                <Icon name="id card outline" />
                Membro
              </Header>
              <List relaxed inverted>
                <List.Item>
                  <Label>Nome</Label>
                  <span className="infoItem">
                    {membro.nome + " " + membro.apelido}
                  </span>
                </List.Item>
                <List.Item>
                  <Label>É docente?</Label>
                  <span className="infoItem">
                    {membro.eDocente ? "Sim" : "Não"}
                  </span>
                </List.Item>
              </List>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment color="red" inverted clearing id="infoFunc">
              <Header as="h4">
                <Icon name="user outline" />
                Funcionário
              </Header>
              <List relaxed inverted>
                <List.Item>
                  <Label>Nome</Label>
                  <span className="infoItem">{funcionário.nome}</span>
                </List.Item>
                <List.Item>
                  <Label>Apelido</Label>
                  <span className="infoItem">{funcionário.apelido}</span>
                </List.Item>
              </List>
            </Segment>
          </GridColumn>
        </Grid>
        {emprestimo.devolvido ? null : (
          <Segment style={{ paddingRight: 0 }} clearing basic>
            <Button
              disabled={disabled}
              loading={isSubmiting}
              onClick={(e) => setOpenConfirm(true)}
              inverted
              color="green"
              floated="right"
              size="tiny"
            >
              <Icon name="check circle outline" />
              Marcar como devolvido
            </Button>
          </Segment>
        )}
      </Segment>
    </>
  );
}
