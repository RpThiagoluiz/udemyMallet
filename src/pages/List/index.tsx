import React, { useMemo, useState, useEffect } from 'react' //memorizar valor -armazenar estado na app - dispara toda vez q a tela `e carregada
import ContentHeader from '../../components/ContentHeader'
import HistoryFincanceCard from '../../components/HistoryFincanceCard'
import SelectInput from '../../components/SelectInput'

//ide
import { uuid } from 'uuidv4'

//format
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

//Li months import
import listOfMonths from '../../utils/months'


//`database`
import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'

import { Container, Content, Filters } from './styles'

interface IRouteParams {
   match: {
      params: {
         type: string;
      }
   }
}
//acima `e a sequencia de acesso aos parametros

interface IData {
   id: string;
   description: string;
   amountFormatted: string;
   frequency: string;
   dateFormatted: string;
   tagColor: string;
}
//como ele vai guardar os dados que foram passado pelo API.

const List: React.FC<IRouteParams> = ({ match }) => {


   const { type } = match.params

   const title = useMemo(() => {
      return type === 'entry-balance' ? 'Entradas' : 'Saidas'
   }, [type]) //estrutura do hook - quando vc coloca usa ele como uma dependencia.

   const lineColor = useMemo(() => {
      return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
   }, [type])

   const listData = useMemo(() => {
      return type === 'entry-balance' ? gains : expenses
   }, [type])
   //dependendo da rota que vai ser acessada vai ser oq ele vai carregar.


   const [data, setData] = useState<IData[]>([]) //primeiro ele guarda o segundo ele atualiza - vc ta develvendo muito objetos nao somente 1 por isso array.


   //filtros
   const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1))
   const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()))


   useEffect(() => {

      const filteredData = listData.filter(item => {
         const date = new Date(item.date)
         const month = String(date.getMonth() + 1)
         const year = String(date.getFullYear())

         return month === monthSelected && year === yearSelected

      })
      const formattedData = filteredData.map(item => {

         return {
            id: uuid(),
            description: item.description,
            amountFormatted: formatCurrency(Number(item.amount)), //vem como string tratando ele pra ficar number -HOLYFCK SHIT
            frequency: item.frequency,
            dateFormatted: formatDate(item.date),
            tagColor: item.frequency === 'recorrente' ? '#E44C4E' : '#4E41F0'
         }
      })

      setData(formattedData)
   }, [listData, monthSelected, yearSelected, data.length])
   //use effect sempre vai ser disparado quando a tela for carregado, caso nao seja passado nenhum vinculo ele vai ser utilizado apenas uma vez.


   const months = useMemo(() => {
      return listOfMonths.map((month, index) => {

         return {
            value: index + 1,
            label: month,
         }
      })

   },[])



   const years = useMemo(() => {
      let uniqueYears: number[] = []

      listData.forEach(item => {
         const date = new Date(item.date)
         const year = date.getFullYear()

         //filtro para verificar se ele ja esta aqui dentro
         if (!uniqueYears.includes(year)) {
            uniqueYears.push(year)
         }
      })

      return uniqueYears.map(year => {
         return {
            value: year,
            label: year,
         }
      })
   }, [listData])



   return (
      <Container>
         <ContentHeader title={title} lineColor={lineColor}>
            <SelectInput options={months} onChange={e => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
            <SelectInput options={years} onChange={e => setYearSelected(e.target.value)} defaultValue={yearSelected} />
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
            {
               data.map(item => (

                  <HistoryFincanceCard
                     key={item.id}
                     tagColor={item.tagColor}
                     title={item.description}
                     subtitle={item.dateFormatted}
                     amount={item.amountFormatted}

                  />
               ))
            }



         </Content>


      </Container>
   )
}

export default List