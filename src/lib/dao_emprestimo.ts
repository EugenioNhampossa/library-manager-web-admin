import { api } from "./api";

export function saveEmprestimo(data: any) {

    return api.post("/emprestimo/registrar", {
        idLivro: data.idLivro,
        idMembro: data.idMembro,
        idFuncionario: data.idFuncionario,
    })
}


export function getEmprestimo(id: string) {
    return api.get(`/emprestimo/${id}`);
}

export function loadEmprestimos() {
    return api.get("/emprestimo/lista");
}

export function setEmprestimoDevolvido(id: string, idLivro: string) {
    return (api.put(`/emprestimo/devolucao/${id}`, {
        idLivro
    }));
}