import { api } from "./api";

export function saveFuncionario(data: any) {
    console.log(data);

    return (api.post("/funcionario/registrar", {
        nome: data.nome,
        apelido: data.apelido,
        nrBI: data.nrBI,
        nomeUsuario: data.nomeUsuario,
        senha: data.senha,
        permissao: data.permissao
    }));
}

export function loadFuncionarios() {
    return api.get("/funcionario/lista");
}

export function getFuncionario(id: string) {
    return api.get(`/funcionario/${id}`, {})
}