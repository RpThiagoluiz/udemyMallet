import React from 'react'
import { Container} from './styles' //quando nao tem export default


const Content: React.FC = ({children}) => {
   return (
      <Container>
         { children }
      </Container>
   )
}

export default Content