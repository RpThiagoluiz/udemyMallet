import React from 'react'
import Aside from '../Aside'
import MainHeader from '../MainHeader'
import Content from '../Content'
import { Grid} from './styles' //quando nao tem export default


const Layout: React.FC = ({children}) => {
   return (
      <Grid>
         <MainHeader/>
         <Aside />
         <Content>
            {children}
         </Content>

      </Grid>
   )
}

export default Layout