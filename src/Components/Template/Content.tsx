import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";
import { Devolucoes } from "../Pages/Devolucoes/Devolucoes";
import { DevolucoesForm } from "../Pages/Devolucoes/DevolucoesForm";
import { Emprestimos } from "../Pages/Emprestimos/Emprestimos";
import { EmprestimosInfo } from "../Pages/Emprestimos/EmprestimosInfo";
import { FuncionarioForm } from "../Pages/Funcionarios/FuncionarioForm";
import { FuncionarioInfo } from "../Pages/Funcionarios/FuncionarioInfo";
import { Funcionarios } from "../Pages/Funcionarios/Funcionarios";
import { Livros } from "../Pages/Livros/Livros";
import { LivrosForm } from "../Pages/Livros/LivrosForm";
import { LivrosInfo } from "../Pages/Livros/LivrosInfo";
import { MembroForm } from "../Pages/Membros/MembroForm";
import { MembroInfo } from "../Pages/Membros/MembroInfo";
import { Membros } from "../Pages/Membros/Membros";
import { NotFound } from "../Pages/NotFound";
import style from "./Estrutura.module.css";

export function Content() {
  return (
    <div className={style.primeira}>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/livros" element={<Livros />}></Route>
        <Route path="/livros/novoLivro" element={<LivrosForm />}></Route>
        <Route path="/livros/:id" element={<LivrosInfo />}></Route>
        <Route path="/devolucoes" element={<Devolucoes />}></Route>
        <Route
          path="/devolucoes/registrar"
          element={<DevolucoesForm />}
        ></Route>
        <Route path="/emprestimos" element={<Emprestimos />}></Route>
        <Route path="/emprestimos/:id" element={<EmprestimosInfo />}></Route>
        <Route path="/membros" element={<Membros />}></Route>
        <Route path="/membros/:id" element={<MembroInfo />}></Route>
        <Route path="/novoMembro" element={<MembroForm />}></Route>
        <Route path="/funcionarios" element={<Funcionarios />}></Route>
        <Route path="/funcionarios/:id" element={<FuncionarioInfo />}></Route>
        <Route
          path="/funcionarios/registrar"
          element={<FuncionarioForm />}
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
