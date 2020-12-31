import styled from "styled-components";

export const Grid = styled.div`
  display: grid; //so tem duas linhas
  grid-template-columns: 250px auto;
  grid-template-rows: 70px auto;

  grid-template-areas:
   //como se fosse batalha naval, primeira linha As e o Mh, na segunda linha AS e o CT

    "AS MH"
    "AS CT";

  height: 100vh;

  @media (max-width: 600px) {
    grid-template-columns: 100%;
    grid-template-rows: 70px auto;

    grid-template-areas:
      "MH"
      "CT";
  }
`;
