import { api } from "./api";

export function loadMembros() {
    return api.get("/membro/lista", {})
}

export function getMembro(id: string) {
    return api.get(`/membro/${id}`, {})
}


export function saveMembro(data: any) {
    console.log(data);

    return (api.post("/membro/registrar", {
        nome: data.nome,
        apelido: data.apelido,
        nrBI: data.nrBI,
        eDocente: data.eDocente
    }));
}
