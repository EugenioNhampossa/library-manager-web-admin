import { Header, Icon, Loader, Segment } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

interface titleBarProps {
  title: string;
  titleIcon: SemanticICONS;
  link?: any;
  loading?: boolean;
}

export function TitleBar({ title, titleIcon, link, loading }: titleBarProps) {
  return (
    <>
      <Segment clearing inverted className="titleBar">
        <Header as="h3">
          <Header.Content>
            <Icon name={titleIcon} />
            {title}
            <Loader
              style={{ marginLeft: "7px" }}
              inline
              active={loading}
              inverted
              size="small"
            />
          </Header.Content>
          {link}
        </Header>
      </Segment>
    </>
  );
}
