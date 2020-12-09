import React,{ useMemo,useState } from 'react'
//useMemo, decora um valor quando o valor muda
import Toggle from '../Toggle'

//hook
import {useTheme} from '../../hooks/theme'

import emojis from '../../utils/emojis'

import { 
   Container,
   Profile,
   Welcome,
   Username

} from './styles' //quando nao tem export default


const MainHeader: React.FC = () => {
   const { toggleTheme, theme} = useTheme()

   const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

   const handleChangeTheme = () => {
       setDarkTheme(!darkTheme);
       toggleTheme();
   }

   //selecao random de emojis
   const emoji = useMemo(() => {
      const indice = Math.floor(Math.random() * emojis.length)
      return emojis[indice] //return ele ta armazenando o emojis dentro do indice escolhido, e retornando ele.
   },[])



   return (
      <Container>
         <Toggle
            labelLeft="light"
            labelRight="dark"
            checked={darkTheme}
            onChange={handleChangeTheme}
         
         />
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