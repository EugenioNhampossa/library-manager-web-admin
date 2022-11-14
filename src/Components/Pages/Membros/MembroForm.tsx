import { useState } from "react";
import {
  Accordion,
  Button,
  Checkbox,
  Form,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalMessage } from "../../Form/ModalMessage";
import { saveMembro } from "../../../lib/dao_membro";

export interface IFormMembroInputs {
  nome: string;
  apelido: string;
  nrBI: string;
  eDocente: boolean;
}
const schema = yup
  .object({
    nome: yup.string().required("Insira o nome"),
    apelido: yup.string().required("Insira o apelido"),
    nrBI: yup.string().required("Insira o nr de BI"),
    eDocente: yup.boolean(),
  })
  .required();

export function MembroForm({ setUpadate, update }: any) {
  const [state, setState] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
    icon: "",
  });
  const [eDocenteCheck, setEDocenteCheck] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormMembroInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormMembroInputs) => {
    setIsSaving(true);
    let res = await saveMembro({
      nome: data.nome,
      apelido: data.apelido,
      nrBI: data.nrBI,
      eDocente: eDocenteCheck,
    });
    if (res.status === 201) {
      reset();
      setEDocenteCheck(false);
      setMessageVisibility(true);
      setModalMessage({
        title: "Sucesso",
        message: "Membro registrado com sucesso",
        icon: "check circle outline",
      });
      setIsSaving(false);
      setState(false);
      setUpadate(!update);
    } else {
      setMessageVisibility(true);
      setModalMessage({
        title: "Error",
        message: "Erro ao registrar o membro",
        icon: "close circle outline",
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
        <Form size="small" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths={2}>
            <Form.Field error={errors.nome?.message}>
              <label>Nome</label>
              <input
                type="text"
                {...register("nome")}
                placeholder="Insira o nome"
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
                type="text"
                {...register("apelido")}
                placeholder="Insira o apelido"
              />
              {errors.apelido?.message && (
                <Label basic color="red" pointing prompt>
                  {errors.apelido?.message}
                </Label>
              )}
            </Form.Field>
          </Form.Group>
          <Form.Field error={errors.nrBI?.message}>
            <label>Nr de BI</label>
            <input
              type="text"
              {...register("nrBI")}
              placeholder="Insira o nr de BI"
            />
            {errors.nrBI?.message && (
              <Label basic color="red" pointing prompt>
                {errors.nrBI?.message}
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <Controller
              name="eDocente"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={eDocenteCheck}
                  onClick={() => setEDocenteCheck(!eDocenteCheck)}
                  label="É docente"
                />
              )}
            />
          </Form.Field>
          <Button
            disabled={isSaving}
            loading={isSaving}
            type="submit"
            size="small"
            floated="right"
            basic
            primary
          >
            Registrar
          </Button>
        </Form>
      </Segment>
    </>
  );

  return (
    <Accordion as={Menu} vertical fluid>
      <Menu.Item>
        <Accordion.Title
          content={<Label color="blue" basic content="Registrar Membro" />}
          icon="pencil"
          onClick={() => setState(!state)}
        />
        <Accordion.Content active={state} content={registerForm} />
      </Menu.Item>
    </Accordion>
  );
}
