import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

type IINputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IINputProps> = ({ ...rest }) => (
  <Container {...rest}></Container>
);

export default Input;
