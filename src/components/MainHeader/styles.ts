import styled from 'styled-components'

export const Container = styled.div`
   grid-area: MH; //Main Header ocupa essa area no grid
   color:${props=> props.theme.colors.white};
   background-color: ${props=> props.theme.colors.secondary};//sintaxe do styled
   
   display: flex;
   justify-content: space-between;
   align-items: center;

   padding: 0 10px;//0em cima e em baixo

   border-bottom:1px solid ${props=> props.theme.colors.gray};



`

export const Profile = styled.div`
   color: ${props=> props.theme.colors.white}
`

export const Welcome = styled.div``

export const Username = styled.div``