import React,{ useMemo } from 'react'
//useMemo, decora um valor quando o valor muda
import Toggle from '../Toggle'

import emojis from '../../utils/emojis'

import { 
   Container,
   Profile,
   Welcome,
   Username

} from './styles' //quando nao tem export default


const MainHeader: React.FC = () => {

   //selecao random de emojis
   const emoji = useMemo(() => {
      const indice = Math.floor(Math.random() * emojis.length)
      return emojis[indice] //return ele ta armazenando o emojis dentro do indice escolhido, e retornando ele.
   },[])


   return (
      <Container>
         <Toggle />
         <Profile>
            <Welcome>
               Hi, {emoji}
            </Welcome>
            <Username>Thiago Louise</Username>
         </Profile>
      </Container>
   )
}

export default MainHeader