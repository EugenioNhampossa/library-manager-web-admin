import { Link } from "react-router-dom";
import {
  Button,
  Dropdown,
  Header,
  Icon,
  Menu,
  Segment,
} from "semantic-ui-react";

const trigger = (
  <span>
    <Icon name="user circle" />
    {sessionStorage.getItem("nomeUsuario")}
  </span>
);
const signOut = () => {
  sessionStorage.clear();
  window.location.href = "/";
};
export function TopMenu({ setVisible }: any) {
  return (
    <Segment style={{ padding: 0 }} size="mini" inverted clearing id="topMenu">
      <Menu secondary inverted>
        <Menu.Item className="ui grid mobile tablet only">
          <Button inverted icon="bars" basic onClick={() => setVisible(true)} />
        </Menu.Item>
        <Menu.Item>
          <Link to={"/"}>
            <Header as="h3" style={{ marginTop: "6px" }} inverted>
              <Icon name="book" />
              Biblioteca
            </Header>
          </Link>
        </Menu.Item>
        <Menu.Menu
          position="right"
          className="ui grid inverted tablet computer only"
          id="userDrop"
        >
          <Dropdown item trigger={trigger} style={{ marginRight: "10px" }}>
            <Dropdown.Menu>
              <Dropdown.Header>
                <Icon name="user" />
                Minha Conta
              </Dropdown.Header>
              <Dropdown.Item>
                <Icon name="id card" />
                Dados
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="cogs" />
                Definições
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => signOut()}>
                <Link to={"/"}>
                  <Icon name="sign-out" />
                  Saír
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
}
