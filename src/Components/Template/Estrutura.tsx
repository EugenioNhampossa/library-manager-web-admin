import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Grid, Menu, Sidebar } from "semantic-ui-react";
import { Login } from "../Pages/Login/Login";
import { Content } from "./Content";
import style from "./Estrutura.module.css";
import { Footer } from "./Footer";
import { SideMenu } from "./SideMenu";
import { SideMenuMobile } from "./SideMenuMobile";
import { TopMenu } from "./TopMenu";

export function Estrutura() {
  const [visible, setVisible] = useState(false);

  return (
    <Router>
      {true ? (
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
          >
            <SideMenuMobile />
          </Sidebar>
          <Sidebar.Pusher className={style.content}>
            <TopMenu setVisible={setVisible} />
            <Grid>
              <Grid.Row>
                <Grid.Column className="three wide computer only">
                  <SideMenu />
                </Grid.Column>
                <Grid.Column className="thirteen wide computer sixteen wide tablet">
                  <Content />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Footer></Footer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      ) : (
        <Login />
      )}
    </Router>
  );
}
