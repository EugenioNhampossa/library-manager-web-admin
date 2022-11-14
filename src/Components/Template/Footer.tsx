import { List, Segment } from "semantic-ui-react";

export function Footer() {
  return (
    <Segment size="mini" id="footer" inverted>
      <div>
        <List floated="right" horizontal inverted>
          <List.Item disabled href="#">
            © Vainilla, Inc.
          </List.Item>
          <List.Item href="#">Terms</List.Item>
          <List.Item href="#">Privacy</List.Item>
          <List.Item href="#">Contact</List.Item>
        </List>
        <List horizontal />
      </div>
    </Segment>
  );
}
