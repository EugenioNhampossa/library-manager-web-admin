import { Link } from "react-router-dom";
import { Icon, Menu, MenuHeader } from "semantic-ui-react";

export function SideMenuMobile() {
  return (
    <>
      <Menu.Item>
        <MenuHeader>
          <Icon name="home" />
          HOME
        </MenuHeader>
        <Menu.Menu>
          <Link to="/">
            <Menu.Item link name="dashboard" />
          </Link>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>
          <Icon name="book" />
          Livro
        </Menu.Header>
        <Menu.Menu>
          <Link to="/livros">
            <Menu.Item link name="livros" />
          </Link>
          <Link to="/emprestimos">
            <Menu.Item link name="emprestimos">
              Empréstimos
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>
          <Icon name="address card" />
          Membros
        </Menu.Header>

        <Menu.Menu>
          <Link to="/membros">
            <Menu.Item link name="membros" />
          </Link>
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>
          <Icon name="users" />
          Funcionarios
        </Menu.Header>
        <Menu.Menu>
          <Link to="/funcionarios">
            <Menu.Item link name="funcionarios">
              Funcionarios
            </Menu.Item>
          </Link>
          <Link to="/funcionarios/registrar">
            <Menu.Item link name="novoFuncionario">
              Novo Funcionario
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu.Item>
    </>
  );
}
