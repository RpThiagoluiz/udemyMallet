import React, {useMemo} from 'react' //memorizar valor

import ContentHeader from '../../components/ContentHeader'
import HistoryFincanceCard from '../../components/HistoryFincanceCard'
import SelectInput from '../../components/SelectInput'


import { Container, Content,Filters } from './styles'



const List: React.FC = () => {



   const months = [
      { value: 7, label: 'Julho' },
      { value: 8, label: 'Agosto' },
      { value: 9, label: 'Setembro' }
   ]

   const years = [

      { value: 2020, label: 2020 },
      { value: 2019, label: 2019 },
      { value: 2018, label: 2018 }
      
   ]


   return (
      <Container>
         <ContentHeader title="Saida" lineColor="#050505">
            <SelectInput options={months} />
            <SelectInput options={years} />
         </ContentHeader>

      <Filters>
         <button
            type="button"
            className="tag-filter tag-filter-recurrents"         
         >
            Recorentes
         </button>

         <button
            type="button"
            className="tag-filter tag-filter-eventual"         
         >
            Eventuais
         </button>
      </Filters>


         <Content>
            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />

            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />
            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />
            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />
            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />
            <HistoryFincanceCard

               tagColor="#E44C4E"
               title="Conta de Luzes"
               subtitle="27/07/2020"
               amount="R$ 473,99"

            />


         </Content>


      </Container>
   )
}

export default List