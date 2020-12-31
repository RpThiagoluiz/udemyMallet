import React, { useState } from "react";

import logoImg from "../../assets/logo.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Logo, Form, FormTitle } from "./styles";

import { useAuth } from "../../hooks/auth";

const SingIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { singIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h3>Minha Carteira</h3>
      </Logo>
      <Form onSubmit={() => singIn(email, password)}>
        <FormTitle>Entrar</FormTitle>
        <Input
          type="email"
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
};

export default SingIn;
