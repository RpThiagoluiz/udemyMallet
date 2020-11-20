import styled from 'styled-components'

export const Container = styled.div`
   grid-area: CT; //content ocupa essa area no grid
   color:${props => props.theme.colors.white};
   background-color: ${props => props.theme.colors.primary};

   padding: 25px;


   height: calc(100vh - 70px); //70px e a altura do cabecalho
   overflow-y: scroll;


   ::-webkit-scrollbar{
      width:10px;
   }

   ::-webkit-scrollbar-thumb {
      background-color: ${props=> props.theme.colors.secondary}
   }

   ::-webkit-scrollbar-track {
      background-color: ${props=> props.theme.colors.tertiary}
   }

`;
