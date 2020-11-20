import React from 'react'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'


import { Container } from './styles'



const Dashboard : React.FC = () => {

   const options = [

      { value: 'thiago', label: 'thiago' },
      { value: 'Tonha', label: 'Tonha' },
      { value: 'chico', label: 'chico' }

   ]


   return(
      <Container>
         <ContentHeader title="Dashboard" lineColor="#fff">
            <SelectInput options={options} onChange={()=>{}}/>
         </ContentHeader>
      </Container>
   )
}

export default Dashboard