import { useState } from "react";
import { Button, Form, Label, Segment } from "semantic-ui-react";
import style from "./Livros.module.css";
import { saveLivro } from "../../../lib/dao_livro";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalMessage } from "../../Form/ModalMessage";
import { TitleBar } from "../../Template/TitleBar";

export interface IFormLivroInputs {
  titulo: String;
  autor: String;
  local: String;
  editora: String;
  ano: number;
  edicao: number;
  volume: number;
  nrPaginas: number;
  observacoes: String;
  qtyStock: number;
}

const schema = yup
  .object({
    titulo: yup.string().required("Insira o Título"),
    autor: yup.string().required("Insira o autor"),
    local: yup.string().required("Insira o local"),
    editora: yup.string().required("Insira a editora"),
    observacoes: yup.string(),
    ano: yup
      .number()
      .typeError("Insira um número válido")
      .integer("O número deve ser inteiro")
      .positive("O número deve ser positivo")
      .required("Insira o ano")
      .min(1890, "O ano deve se maior que ou igual a 1890")
      .max(
        new Date().getFullYear(),
        "O ano deve se menor que ou igual ao ano actual"
      ),
    edicao: yup
      .number()
      .typeError("Insira um número válido")
      .integer("O número deve ser inteiro")
      .positive("O número deve ser positivo")
      .required("Insira a edicao"),
    volume: yup
      .number()
      .typeError("Insira um número válido")
      .integer("O número deve ser inteiro")
      .positive("O número deve ser positivo")
      .required("Insira o volume"),
    nrPaginas: yup
      .number()
      .typeError("Insira um número válido")
      .integer("O número deve ser inteiro")
      .positive("O número deve ser positivo")
      .required("Insira o nr de Páginas"),
    qtyStock: yup
      .number()
      .typeError("Insira um número válido")
      .integer("O número deve ser inteiro")
      .moreThan(-1,"O número deve ser positivo")
      .required("Insira a quantidade"),
  })
  .required();

export function LivrosForm() {
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
  } = useForm<IFormLivroInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      observacoes: "",
    },
  });

  const onSubmit = async (data: IFormLivroInputs) => {
    setIsSaving(true);
    console.log(data);
    let res = await saveLivro({
      titulo: data.titulo,
      autor: data.autor,
      local: data.local,
      editora: data.editora,
      ano: data.ano,
      edicao: data.edicao,
      volume: data.volume,
      nrPaginas: data.nrPaginas,
      observacoes: data.observacoes,
      qtyStock: data.qtyStock,
    });
    setIsSaving(false);
    if (res.status === 201) {
      reset();
      setMessageVisibility(true);
      setModalMessage({
        title: "Sucesso",
        message: "Livro gravado com sucesso",
        icon: "check circle outline",
      });
    } else {
      setMessageVisibility(true);
      setModalMessage({
        title: "Error",
        message: "Erro ao gravar o livro",
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
      <TitleBar title={"NovoLivro"} titleIcon={"book"} />
      <Segment clearing id="formLivro" className={style.mainContent}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <Form.Group widths={2}>
              <Form.Field error={errors.titulo?.message}>
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Insira o título"
                  className="ui input"
                  {...register("titulo")}
                />
                {errors.titulo?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.titulo?.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={errors.autor?.message}>
                <label>Autor</label>
                <input
                  type="text"
                  placeholder="Insira o autor"
                  className="ui input"
                  {...register("autor")}
                />
                {errors.autor?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.autor?.message}
                  </Label>
                )}
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Field>
            <Form.Group widths={2}>
              <Form.Field error={errors.local?.message}>
                <label>Local</label>
                <input
                  type="text"
                  placeholder="Insira o local"
                  className="ui input"
                  {...register("local")}
                />
                {errors.local?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.local?.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={errors.editora?.message}>
                <label>Editora</label>
                <input
                  type="text"
                  placeholder="Insira a editora"
                  className="ui input"
                  {...register("editora")}
                />
                {errors.editora?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.editora?.message}
                  </Label>
                )}
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Field>
            <Form.Group widths={5}>
              <Form.Field error={errors.ano?.message}>
                <label>Ano</label>
                <input
                  type="number"
                  placeholder="Insira o ano"
                  className="ui input"
                  {...register("ano")}
                />
                {errors.ano?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.ano?.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={errors.edicao?.message}>
                <label>Edicao</label>
                <input
                  type="number"
                  className="ui input"
                  placeholder="Insira a Edicao"
                  {...register("edicao")}
                />
                {errors.edicao?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.edicao?.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={errors.volume?.message}>
                <label>Volume</label>
                <input
                  type="number"
                  placeholder="Insira o volume"
                  className="ui input"
                  {...register("volume")}
                />
                {errors.volume?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.volume?.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={errors.nrPaginas?.message}>
                <label>Nr. Páginas</label>
                <input
                  type="number"
                  placeholder="Insira o nr de páginas"
                  className="ui input"
                  {...register("nrPaginas")}
                />
                {errors.nrPaginas?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.nrPaginas?.message}
                  </Label>
                )}
              </Form.Field>
              <Form.Field error={errors.qtyStock?.message}>
                <label>Quantidade inicial</label>
                <input
                  type="number"
                  className="ui input"
                  placeholder="Insira a quantidade inicial"
                  {...register("qtyStock")}
                />
                {errors.qtyStock?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.qtyStock?.message}
                  </Label>
                )}
              </Form.Field>
            </Form.Group>
          </Form.Field>
          <Form.Field>
            <label>Observações</label>
            <textarea
              {...register("observacoes")}
              placeholder="Insira uma observação"
              rows={3}
            ></textarea>
          </Form.Field>
          <Button
            className={style.btGravar}
            loading={isSaving}
            type="submit"
            disabled={isSaving}
            floated="right"
          >
            Gravar
          </Button>
        </Form>
      </Segment>
    </>
  );
}
