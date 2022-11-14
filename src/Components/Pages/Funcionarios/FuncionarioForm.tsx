import { useState } from "react";
import { Button, Dropdown, Form, Label, Segment } from "semantic-ui-react";
import style from "../Livros/Livros.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalMessage } from "../../Form/ModalMessage";
import { saveFuncionario } from "../../../lib/dao_funcionario";
import { TitleBar } from "../../Template/TitleBar";

interface IFormFuncionarioInputs {
  nome: string;
  apelido: string;
  nrBI: string;
  nomeUsuario: string;
  senha: string;
  senhaReinserida: string;
  permissao: string;
}

const options = [
  { key: 1, text: "Bibliotecário", value: "bibliotecario" },
  { key: 2, text: "Admin", value: "admin" },
];

const schema = yup
  .object({
    nome: yup.string().required("Insira o nome"),
    apelido: yup.string().required("Insira o apelido"),
    nrBI: yup.string().required("Insira o nr de BI"),
    nomeUsuario: yup.string().required("Insira o nome de usuário"),
    senha: yup.string().required("Insira uma senha"),
    senhaReinserida: yup
      .string()
      .oneOf([yup.ref("senha"), null], "As senhas não são iguais")
      .required("confirme a senha"),
  })
  .required();

export function FuncionarioForm() {
  const [permissao, setPermissao] = useState("bibliotecario");

  const [isSaving, setIsSaving] = useState(false);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
    icon: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFuncionarioInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormFuncionarioInputs) => {
    setIsSaving(true);
    let res = await saveFuncionario({
      nome: data.nome,
      apelido: data.apelido,
      nrBI: data.nrBI,
      nomeUsuario: data.nomeUsuario,
      senha: data.senha,
      permissao,
    });
    setIsSaving(false);
    if (res.status == 201) {
      reset();
      setPermissao("bibliotecario");
      setMessageVisibility(true);
      setModalMessage({
        title: "Sucesso",
        message: "Funcionario registrado com sucesso",
        icon: "check circle outline",
      });
    } else {
      setMessageVisibility(true);
      setModalMessage({
        title: "Error",
        message: "Erro ao registrar o Funcionario",
        icon: "close circle outline",
      });
    }
  };

  return (
    <>
      <ModalMessage
        visibility={messageVisibility}
        setVisible={setMessageVisibility}
        title={modalMessage.title}
        message={modalMessage.message}
        icon={modalMessage.icon}
      />
      <TitleBar title={"Registrar Funcionário"} titleIcon={"add user"} />
      <Segment className={style.mainContent}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths={2}>
            <Form.Field error={errors.nome?.message}>
              <label>Nome</label>
              <input
                {...register("nome")}
                type="text"
                placeholder="Insira o Nome"
              />
              {errors.nome?.message && (
                <Label basic color="red" pointing prompt>
                  {errors.nome?.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field error={errors.apelido?.message}>
              <label>Apelido</label>
              <input
                {...register("apelido")}
                type="text"
                placeholder="Insira o Nome"
              />
              {errors.apelido?.message && (
                <Label basic color="red" pointing prompt>
                  {errors.apelido?.message}
                </Label>
              )}
            </Form.Field>
          </Form.Group>

          <Form.Field error={errors.nrBI?.message}>
            <label>Número de BI</label>
            <input
              {...register("nrBI")}
              type="text"
              placeholder="Insira o Número de BI"
            />
            {errors.nrBI?.message && (
              <Label basic color="red" pointing prompt>
                {errors.nrBI?.message}
              </Label>
            )}
          </Form.Field>

          <Form.Group widths={2}>
            <Form.Field error={errors.nomeUsuario?.message}>
              <label>Nome de usuário</label>
              <input
                {...register("nomeUsuario")}
                type="text"
                placeholder="Insira o nome de usuário"
              />
              {errors.nomeUsuario?.message && (
                <Label basic color="red" pointing prompt>
                  {errors.nomeUsuario?.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field error={errors.senha?.message}>
              <label>Senha</label>
              <input
                {...register("senha")}
                type="password"
                placeholder="Insira a password"
              />
              {errors.senha?.message && (
                <Label basic color="red" pointing prompt>
                  {errors.senha?.message}
                </Label>
              )}
            </Form.Field>
          </Form.Group>

          <Form.Group widths={2}>
            <Form.Field error={errors.senhaReinserida?.message}>
              <label>Confirme a senha</label>
              <input
                {...register("senhaReinserida")}
                type="password"
                placeholder="Insira a password"
              />
              {errors.senhaReinserida?.message && (
                <Label basic color="red" pointing prompt>
                  {errors.senhaReinserida?.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <label>Permissão</label>
              <Dropdown
                placeholder="Seleccione"
                fluid
                defaultValue={"bibliotecario"}
                search
                selection
                onChange={(e, { value }) => setPermissao(String(value))}
                options={options}
              />
            </Form.Field>
          </Form.Group>
          <Button
            loading={isSaving}
            disabled={isSaving}
            type="submit"
            floated="right"
            basic
            color="blue"
          >
            Gravar
          </Button>
        </Form>
      </Segment>
    </>
  );
}
