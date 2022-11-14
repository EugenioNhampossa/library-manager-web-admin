import { api } from "./api";

export function loadLivros() {
    return api.get("/livro/lista");
}

export function getLivro(id: string) {
    return api.get(`/livro/${id}`, {})
}

export function saveLivro(data: any) {
    return (api.post("/livro/registrar", {
        titulo: data.titulo,
        autor: data.autor,
        local: data.local,
        editora: data.editora,
        ano: Number(data.ano),
        edicao: Number(data.edicao),
        volume: Number(data.volume),
        nrPaginas: Number(data.nrPaginas),
        observacoes: data.observacoes,
        qtyStock: Number(data.qtyStock),
    }));
}