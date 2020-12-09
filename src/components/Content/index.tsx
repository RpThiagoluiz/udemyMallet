import React from 'react'
import { Container} from './styles' //quando nao tem export default


const Content: React.FC = ({children}) => (
   //stateless - vc nao manipula estado dentro dele, nao tem const aq, return puro
      <Container>
         { children }
      </Container>
   
)

export default Content