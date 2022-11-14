import { Component } from "react";
import {
  Accordion,
  Button,
  Dropdown,
  Form,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";

const registerForm = (
  <Segment clearing basic>
    <Form size="small">
      <Form.Group widths={2}>
        <Form.Field>
          <label>Título do livro</label>
          <Dropdown
            placeholder="Seccione o livro"
            fluid
            search
            selection
            options={[]}
          />
        </Form.Field>
        <Form.Field>
          <label>Membro</label>
          <Dropdown
            placeholder="Seccione o membro"
            fluid
            search
            selection
            options={[]}
          />
        </Form.Field>
      </Form.Group>
      <Button size="small" floated="right">
        Registrar
      </Button>
    </Form>
  </Segment>
);

export class DevolucoesForm extends Component {
  state = { activeIndex: 0 };

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion as={Menu} vertical fluid>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content={<Label content="Registrar Devolução" />}
            index={1}
            icon="pencil"
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === 1}
            content={registerForm}
          />
        </Menu.Item>
      </Accordion>
    );
  }
}
