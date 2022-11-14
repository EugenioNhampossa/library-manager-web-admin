import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Dropdown,
  Form,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import { ModalMessage } from "../../Form/ModalMessage";
import { loadLivros } from "../../../lib/dao_livro";
import { loadMembros } from "../../../lib/dao_membro"
import { saveEmprestimo } from "../../../lib/dao_emprestimo";

export function EmprestimosForm() {
  const [state, setState] = useState(false);
  const [dadosLivro, setDataLivro]: any = useState([]);
  const [dadosMembro, setDataMembro] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [idLivro, setIdLivro]: any = useState();
  const [idMembro, setIdMembro]: any = useState();
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
    icon: "",
  });

  async function setDropdowns() {
    setIsSaving(true);
    let resMembro = await loadMembros();
    let resLivro = await loadLivros();
    setDataLivro(resLivro.data);
    setDataMembro(resMembro.data);
    setIsSaving(false);
  }

  useEffect(() => {
    setDropdowns();
  }, [state]);

  let options: any[] = [];

  dadosLivro.map((data: any) => {
    if (data.qtyStock > 0) {
      options.push({
        key: data.id,
        text: data.titulo,
        value: data.id,
      });
    }
    console.log("rendered");
  });

  const optionsMembro = dadosMembro.map((data: any) => {
    return {
      key: data.id,
      text: data.nome + " " + data.apelido,
      value: data.id,
    };
  });

  const onSubmit = async () => {
    if (idLivro && idMembro) {
      setIsSaving(true);
      let res = await saveEmprestimo({
        idMembro: idMembro,
        idLivro: idLivro,
        idFuncionario: sessionStorage.getItem("userId"),
      });
      setIsSaving(false);
      if (res.status === 201) {
        setMessageVisibility(true);
        setModalMessage({
          title: "Sucesso",
          message: "Empréstimo registrado com sucesso",
          icon: "check circle outline",
        });
        setState(false);
      } else {
        setMessageVisibility(true);
        setModalMessage({
          title: "Error",
          message: "Erro ao registrar o empréstimo",
          icon: "exclamation triangle",
        });
      }
    } else {
      setMessageVisibility(true);
      setModalMessage({
        title: "Atenção",
        message: "Preencha todos campos",
        icon: "exclamation triangle",
      });
    }
  };

  const registerForm = (
    <>
      <ModalMessage
        visibility={messageVisibility}
        setVisible={setMessageVisibility}
        title={modalMessage.title}
        message={modalMessage.message}
        icon={modalMessage.icon}
      />
      <Segment clearing basic>
        <Form size="small" onSubmit={() => onSubmit()}>
          <Form.Group widths={2}>
            <Form.Field>
              <label>Título do livro</label>
              <Dropdown
                placeholder="Seccione o livro"
                fluid
                name="idLivro"
                search
                selection
                onChange={(e, { value }) => setIdLivro(value)}
                options={options}
              />
            </Form.Field>
            <Form.Field>
              <label>Membro</label>
              <Dropdown
                placeholder="Seccione o membro"
                fluid
                search
                name="idMembros"
                selection
                onChange={(e, { value }) => setIdMembro(value)}
                options={optionsMembro}
              />
            </Form.Field>
          </Form.Group>
          <Button
            loading={isSaving}
            disabled={isSaving}
            size="small"
            floated="right"
            basic
            color="blue"
            type="submit"
          >
            Registrar
          </Button>
        </Form>
      </Segment>
    </>
  );

  return (
    <>
      <Accordion as={Menu} vertical fluid>
        <Menu.Item>
          <Accordion.Title
            content={
              <Label color="blue" basic content="Registrar Empréstimo" />
            }
            icon="pencil"
            onClick={() => setState(!state)}
          />
          <Accordion.Content active={state} content={registerForm} />
        </Menu.Item>
      </Accordion>
    </>
  );
}
