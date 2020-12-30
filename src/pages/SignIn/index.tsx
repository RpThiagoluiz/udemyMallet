import React from "react";

import logoImg from "../../assets/logo.svg";

import { Container, Logo, Form, FormTitle } from "./styles";

const SingIn: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h3>Minha Carteira</h3>
      </Logo>
      <Form>
        <FormTitle>
          <h1>Entrar</h1>
        </FormTitle>
      </Form>
    </Container>
  );
};

export default SingIn;
