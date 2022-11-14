import { api } from "./api";

export function getUser(data: any) {
    return api.post(`/funcionario/user/`, {
        nomeUsuario: data.nomeUsuario,
        senha: data.senha,
    })
}