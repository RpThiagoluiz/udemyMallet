import React from 'react'

import { Container, Controllers, TitleContainer } from './styles'

//tipagem proveniente do tipeScript
interface IContentHeaderProps {
   title: string;
   lineColor: string;
   children: React.ReactNode; //no do react. VER OQ `E

}


const ContentHeader: React.FC<IContentHeaderProps> = ({
   title, lineColor, children
}) => {


  


   return (
      <Container>

         <TitleContainer lineColor={lineColor}>
            <h1>{title}</h1>
         </TitleContainer>

         <Controllers>
            {children}
         </Controllers>


      </Container>
   )
}

export default ContentHeader