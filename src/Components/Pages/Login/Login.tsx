import {
  Button,
  Container,
  Form,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { getUser } from "../../../lib/dao_usuario";

interface IFormUserInputs {
  nomeUsuario: string;
  senha: string;
}

const schema = yup
  .object({
    nomeUsuario: yup.string().required("Insira o nome de usuário"),
    senha: yup.string().required("Insira uma senha"),
  })
  .required();

export function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormUserInputs>({
    resolver: yupResolver(schema),
  });
  const [isLogging, setIsLogging] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState(false);

  const onSubmit = async (data: IFormUserInputs) => {
    setIsLogging(true);
    let res = await getUser({
      nomeUsuario: data.nomeUsuario,
      senha: data.senha,
    });

    if (!res.data) {
      setMessage(true);
    } else {
      setMessage(false);
      sessionStorage.setItem("nomeUsuario", res.data.nomeUsuario);
      sessionStorage.setItem("userId", res.data.id);
      sessionStorage.setItem("permissao", res.data.permissao);
      reset();
      window.location.href = "/";
    }
    setIsLogging(false);
  };

  return (
    <section className={style.principal}>
      <Container text>
        <Segment.Group raised>
          <div className="ui center aligned  segment blue">
            <i className="huge user circle icon"></i>
            <h3 className="ui header">Login</h3>
          </div>
          <Segment basic style={{ backgroundColor: "white" }}>
            {message && <Message error>Verifique os dados</Message>}

            <form onSubmit={handleSubmit(onSubmit)} className="ui form">
              <Form.Field error={errors.nomeUsuario?.message}>
                <label>Nome de usuário</label>
                <input {...register("nomeUsuario")} type="text" id="username" />
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
                  className="password"
                  type={showPass ? "text" : "password"}
                />
                {errors.senha?.message && (
                  <Label basic color="red" pointing prompt>
                    {errors.senha?.message}
                  </Label>
                )}
              </Form.Field>
              <div className="field">
                <div className="ui checkbox">
                  <input
                    onClick={() => setShowPass(!showPass)}
                    type="checkbox"
                  />
                  <label>Mostrar senha</label>
                </div>
              </div>
              <div className="ui stackable grid">
                <div
                  style={{ paddingTop: "25px" }}
                  className="fourteen wide column"
                ></div>
                <div className="two wide column">
                  <Button loading={isLogging} floated="right" type="submit">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Segment>
          <div className="ui secondary  segment">All rights reserved</div>
        </Segment.Group>
      </Container>
    </section>
  );
}
