import React, { useState, useMemo } from 'react'
//components
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import MensageBox from '../../components/MensageBox'


import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'

//Li months import
import listOfMonths from '../../utils/months'

//imgMessageBox
import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import shockedImg from '../../assets/shocked.svg'

import { Container, Content } from './styles'



const Dashboard: React.FC = () => {

   const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
   const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())


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

   const totalExpenses = useMemo(() => {
      let total: number = 0

      expenses.forEach(item => {
         const date = new Date(item.date)
         const year = date.getFullYear()
         const month = date.getMonth() + 1

         if (month === monthSelected && year === yearSelected) {
            try {
               total += Number(item.amount)
            } catch {
               throw new Error("Invalid amount! Amount must be number.")
            }
         }
      })
      return total
   }, [monthSelected, yearSelected])

   const totalGains = useMemo(() => {
      let total: number = 0 //estou tipando a variavel como number.

      gains.forEach(item => {
         const date = new Date(item.date)
         const year = date.getFullYear()
         const month = date.getMonth() + 1

         if (month === monthSelected && year === yearSelected) {
            try {
               total += Number(item.amount)
            } catch {
               throw new Error("Invalid amount! Amount must be number.")
            }
         }
      })

      return total
   }, [monthSelected, yearSelected])

   const totalBalance = useMemo(() => {
      return totalGains - totalExpenses




   }, [totalGains, totalExpenses])

   const messages = useMemo(() => {
      if (totalBalance < 0) {
         return {
            title: "Que triste !",
            description: "Sua Carteira esta NEGATIVA !!!",
            footerText: "Verifique seus gastos, tente economizar.",
            icon: sadImg
         }
      } else if (totalBalance === 0) {
         return {
            title: "UFA !!!",
            description: "Nem fudido e nem ganhando!",
            footerText: "Tente aumentar sua renda,... freelas",
            icon: shockedImg
         }
      } else {
         return {
            title: "Muito bem !",
            description: "Sua Carteira esta POSITIVO !!!",
            footerText: "Continue assim, considere investir o seu saldo.",
            icon: happyImg
         }
      }


   }, [totalBalance])

   const handleMonthSelected = (month: string) => {
      try {
         const parseMonth = Number(month)
         setMonthSelected(parseMonth)
      } catch {
         throw new Error("Invalid month value, Is accpet 0 - 24 !")
      }
   }

   const handleYearSelected = (year: string) => {
      try {
         const parseYear = Number(year)
         setYearSelected(parseYear)
      } catch {
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
               amount={totalBalance}
               footerlabel="atualizado com base nas entradas e saidas"
               icon="dolar"
               color="#4E41F0"
            />

            <WalletBox
               title="Entradas"
               amount={totalGains}
               footerlabel="atualizado com base nas entradas"
               icon="arrow-up"
               color="#F7931B"
            />

            <WalletBox
               title="Saidas"
               amount={totalExpenses}
               footerlabel="atualizado com base nas saidas do mes selecionado"
               icon="arrow-down"
               color="#E44C4E"
            />

            <MensageBox
               title={messages.title}
               description={messages.description}
               footerText={messages.footerText}
               icon={messages.icon}

            />
         </Content>
      </Container>
   )
}

export default Dashboard