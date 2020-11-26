import React, { useState, useMemo } from 'react'
//components
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'

//Li months import
import listOfMonths from '../../utils/months'



import { Container, Content } from './styles'



const Dashboard: React.FC = () => {

   const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
   const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())


   const options = [

      { value: 'thiago', label: 'thiago' },
      { value: 'Tonha', label: 'Tonha' },
      { value: 'chico', label: 'chico' }

   ]

   const months = useMemo(() => {
      return listOfMonths.map((month, index) => {

         return {
            value: index + 1,
            label: month,
         }
      })

   }, [])

   const years = useMemo(() => {
      let uniqueYears: number[] = [];

      [...expenses, ...gains].forEach(item => {
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
   }, [])



   const handleMonthSelected = (month: string) => {
      try {
         const parseMonth = Number(month)
         setMonthSelected(parseMonth)
      } catch (error) {
         throw new Error("Invalid month value, Is accpet 0 - 24 !")
      }
   }

   const handleYearSelected = (year: string) => {
      try {
         const parseYear = Number(year)
         setYearSelected(parseYear)
      } catch (error) {
         throw new Error("Invalid year value, Is accpet integer number!!")
      }
   }

   return (
      <Container>
         <ContentHeader title="Dashboard" lineColor="#1bf71b">
            <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
            <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
         </ContentHeader>

         <Content>
            <WalletBox
               title="Saldo"
               amount={150.00}
               footerlabel="atualizado com base nas entradas e saidas"
               icon="dolar"
               color="#4E41F0"
            />

            <WalletBox
               title="Entradas"
               amount={5000.00}
               footerlabel="atualizado com base nas entradas"
               icon="arrow-up"
               color="#F7931B"
            />

            <WalletBox
               title="Saidas"
               amount={4850.00}
               footerlabel="atualizado com base nas saidas"
               icon="arrow-down"
               color="#E44C4E"
            />
         </Content>
      </Container>
   )
}

export default Dashboard