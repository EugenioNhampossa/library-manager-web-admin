import { Link } from "react-router-dom";
import {
  Icon,
  Menu,
  MenuHeader,
  MenuItemProps,
  Segment,
} from "semantic-ui-react";
import style from "./Estrutura.module.css";

import React, { Component } from "react";
const active = String(window.location.href).split("/").at(3);
export class SideMenu extends Component {
  state = { activeItem: active ? active : "dashboard" };
  handleItemClick = (e: any, { name }: MenuItemProps) =>
    this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Segment clearing inverted className={style.primeira} id="side">
        <Menu
          style={{ maxWidth: "100%", border: 0 }}
          vertical
          secondary
          pointing
          inverted
          id="sideMenulg"
        >
          <Menu.Item>
            <MenuHeader>
              <Icon name="home" />
              HOME
            </MenuHeader>
            <Menu.Menu>
              <Link to="/">
                <Menu.Item
                  className={style.menuItem}
                  link
                  name="dashboard"
                  active={activeItem === "dashboard"}
                  onClick={this.handleItemClick}
                />
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
                <Menu.Item
                  link
                  name="livros"
                  active={activeItem === "livros"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
            <Menu.Menu>
              <Link to="/autores">
                <Menu.Item
                  link
                  name="autores"
                  active={activeItem === "autores"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
            <Menu.Menu>
              <Link to="/editoras">
                <Menu.Item
                  link
                  name="editoras"
                  active={activeItem === "editoras"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
             <Menu.Menu>
              <Link to="/categorias">
                <Menu.Item
                  link
                  name="categorias"
                  active={activeItem === "categorias"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>
              <Icon name="handshake" />
              Operações
            </Menu.Header>
            <Menu.Menu>
              <Link to="/emprestimos">
                <Menu.Item
                  link
                  name="emprestimos"
                  active={activeItem === "emprestimos"}
                  onClick={this.handleItemClick}
                >
                  Empréstimos
                </Menu.Item>
              </Link>
              <Link to="/Multas">
                <Menu.Item
                  link
                  name="multas"
                  active={activeItem === "multas"}
                  onClick={this.handleItemClick}
                >
                  Multas
                </Menu.Item>
              </Link>
               <Link to="/equisicoes">
                <Menu.Item
                  link
                  name="aquisicoes"
                  active={activeItem === "aquisicoes"}
                  onClick={this.handleItemClick}
                >
                  Aquisiçãoes
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
                <Menu.Item
                  link
                  name="membros"
                  active={activeItem === "membros"}
                  onClick={this.handleItemClick}
                />
              </Link>
            </Menu.Menu>
          </Menu.Item>
          {true &&<>
            <Menu.Item>
              <Menu.Header>
                <Icon name="users" />
                Funcionarios
              </Menu.Header>
              <Menu.Menu>
                <Link to="/funcionarios">
                  <Menu.Item
                    link
                    name="funcionarios"
                    active={activeItem === "funcionarios"}
                    onClick={this.handleItemClick}
                  >
                    Funcionarios
                  </Menu.Item>
                </Link>
                <Link to="/funcionarios/registrar">
                  <Menu.Item
                    link
                    name="novoFuncionario"
                    active={activeItem === "novoFuncionario"}
                    onClick={this.handleItemClick}
                  >
                    Novo Funcionario
                  </Menu.Item>
                </Link>
              </Menu.Menu>
            </Menu.Item>
             <Menu.Item>
              <Menu.Header>
                <Icon name="user circle" />
                Usuários
              </Menu.Header>
              <Menu.Menu>
                <Link to="/usuarios">
                  <Menu.Item
                    link
                    name="usuarios"
                    active={activeItem === "usuarios"}
                    onClick={this.handleItemClick}
                  >
                    Usuarios
                  </Menu.Item>
                </Link>
              </Menu.Menu>
            </Menu.Item>
            </>
          }
        </Menu>
      </Segment>
    );
  }
}
