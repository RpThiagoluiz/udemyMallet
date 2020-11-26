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


   const movimentType = match.params.type

   /*
      const title = useMemo(() => {
         return movimentType === 'entry-balance' ? 'Entradas' : 'Saidas'
      }, [movimentType]) //estrutura do hook - quando vc coloca usa ele como uma dependencia.
   
      const lineColor = useMemo(() => {
         return movimentType === 'entry-balance' ? '#F7931B' : '#E44C4E'
      }, [movimentType])
   
      const listData = useMemo(() => {
         return movimentType === 'entry-balance' ? gains : expenses
      }, [movimentType])
      //dependendo da rota que vai ser acessada vai ser oq ele vai carregar.
   
      <!-- Tudo foi enxugado ali em baixo pela verificacao utilizando o if.
   */
   const pageData = useMemo(() => {
      return movimentType === 'entry-balance' ?
         {
            title: 'Entradas',
            lineColor: '#F7931B',
            data: gains
         }

         :

         {
            title: 'Saidas',
            lineColor: '#E44C4E',
            data: expenses
         }


   }, [movimentType])

   const [data, setData] = useState<IData[]>([]) //primeiro ele guarda o segundo ele atualiza - vc ta develvendo muito objetos nao somente 1 por isso array.
   const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
   const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
   const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']) //estado vai comecar com um array com esses dois valores.


   const months = useMemo(() => {
      return listOfMonths.map((month, index) => {

         return {
            value: index + 1,
            label: month,
         }
      })

   }, [])

   const years = useMemo(() => {
      let uniqueYears: number[] = []
      const { data } = pageData

      data.forEach(item => {
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
   }, [pageData])

   const handleFrequencyClick = (frequency: string) => {
      const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency)

      if (alreadySelected >= 0) {
         const filtered = frequencyFilterSelected.filter(item => item !== frequency) // se o filtro ja tiver selecionado eu quero desmarcar ele.
         setFrequencyFilterSelected(filtered)
      } else {
         setFrequencyFilterSelected((prev) => [...prev, frequency])
      }
   }

   const handleMonthSelected = (month: string) => {
      try {
         const parseMonth = Number(month)
         setMonthSelected(parseMonth)
      } catch(error){
         throw new Error("Invalid month value. Is accept 0 - 24!")
      }
   }

   const handleYearSelected = (year: string) => {
      try {
         const parseYear = Number(year)
         setYearSelected(parseYear)
      } catch(error){
         throw new Error("Invalid year value. Is accept integer numbers!")
      }

   }

   useEffect(() => {
      const { data } = pageData

      const filteredData = data.filter(item => {
         const date = new Date(item.date)
         const month = date.getMonth() + 1
         const year = date.getFullYear()

         return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency)
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
   }, [pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected])
   //use effect sempre vai ser disparado quando a tela for carregado, caso nao seja passado nenhum vinculo ele vai ser utilizado apenas uma vez.


   return (
      <Container>
         <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
            <SelectInput options={months} onChange={e => handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
            <SelectInput options={years} onChange={e => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
         </ContentHeader>

         <Filters>
            <button
               type="button"
               className={`tag-filter tag-filter-recurrents
                  ${frequencyFilterSelected.includes('recorrente') && 'tag-actvied'}
               `}
               onClick={() => handleFrequencyClick('recorrente')}
            >
               Recorentes
         </button>

            <button
               type="button"

               className={`tag-filter tag-filter-eventual
                  ${frequencyFilterSelected.includes('eventual') && 'tag-actvied'}
               `}
               onClick={() => handleFrequencyClick('eventual')}
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