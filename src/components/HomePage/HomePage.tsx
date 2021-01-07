import React from "react";
import { Page } from "decentraland-ui";
import { Footer, Navbar } from "decentraland-dapps/dist/containers";
import { AccountHeader } from "../AccountHeader";
import { AccountCardContainer, AccountCard } from "../AccountCard";
import { Props } from "./HomePage.types";
import "./HomePage.css";

const HomePage = (_props: Props) => {
  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard>
            <p> content 0 </p>
          </AccountCard>
          <AccountCard>
            <p> content 1 </p>
          </AccountCard>
        </AccountCardContainer>
      </Page>
      <Footer />
    </>
  );
};

export default React.memo(HomePage);
