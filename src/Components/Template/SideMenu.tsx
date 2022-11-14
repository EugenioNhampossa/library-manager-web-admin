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
          {sessionStorage.getItem("permissao") &&
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
          }
        </Menu>
      </Segment>
    );
  }
}
