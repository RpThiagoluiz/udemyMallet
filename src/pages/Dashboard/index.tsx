import React, { useState, useMemo,useCallback } from 'react'
//components
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import MensageBox from '../../components/MensageBox'
import PieChartBox from '../../components/PieChartBox'
import HistoryBox from '../../components/HistoryBox'
import BarChartBox from '../../components/BarChartBox'


import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'

//Li months import
import listOfMonths from '../../utils/months'

//imgMessageBox
import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import shockedImg from '../../assets/shocked.svg'

import { Container, Content } from './styles'
import { isTemplateExpression } from 'typescript'





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
      }  else if (totalGains === 0 && totalExpenses === 0){
         return{
            title: "EITCHA",
            description: "Nao registro de movimentacao, nem entrada nem saidas",
            footerText: "E ai, bora?!",
            icon: shockedImg
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


   }, [totalBalance,totalGains,totalExpenses])

   const relationExpensesVsGains = useMemo(() => {
      const total = totalGains + totalExpenses

      const gainsPercents = Number(((totalGains / total) * 100).toFixed(1))
      const expensesPercents = Number(((totalExpenses / total) * 100).toFixed(1))

      

      const data = [
         {
            name: "Entradas",
            value: totalExpenses,
            percent: gainsPercents ? gainsPercents : 0,
            color: '#F7931B'
         },
         {
            name: "Saidas",
            value: totalExpenses,
            percent: expensesPercents ? expensesPercents : 0,
            color: '#E44C4E'
         }
      ]

      return data

   }, [totalGains, totalExpenses])

   const historyData = useMemo(() => {
      return listOfMonths.map((_, month) => {

         let amountEntry = 0;
         gains.forEach(gain => {
            const date = new Date(gain.date)
            const gainMonth = date.getMonth()
            const gainYear = date.getFullYear()

            if (gainMonth === month && gainYear === yearSelected) {
               try {
                  amountEntry += Number(gain.amount)
               } catch {
                  throw new Error('amountEntry is invalid. amountEntry must be valid number.')
               }
            }
         });

         let amountOutPut = 0;
         expenses.forEach(expense => {
            const date = new Date(expense.date)
            const expenseMonth = date.getMonth()
            const expenseYear = date.getFullYear()

            if (expenseMonth === month && expenseYear === yearSelected) {
               try {
                  amountOutPut += Number(expense.amount)
               } catch {
                  throw new Error('amountExpense is invalid. amountExpense must be valid number.')
               }
            }
         });

         return {
            monthNumber: month,
            month: listOfMonths[month].substr(0, 3),
            amountEntry,
            amountOutPut
         }
      }).filter(i => {

         const currentMonth = new Date().getMonth()
         const currentYear = new Date().getFullYear()

         return (yearSelected === currentYear && i.monthNumber <= currentMonth) || (yearSelected < currentYear)
      })
   }, [yearSelected])

   const relationExpensevesRecurrentVersusEventual = useMemo(() => {
      let amountRecurrent = 0;
      let amountEventual = 0;

      expenses
         .filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
         })
         .forEach((expense) => {
            if (expense.frequency === 'recorrente') {
               return amountRecurrent += Number(expense.amount);
            }

            if (expense.frequency === 'eventual') {
               return amountEventual += Number(expense.amount);
            }
         });

      const total = amountRecurrent + amountEventual;

      const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
      const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

      return [
         {
            name: 'Recorrentes',
            amount: amountRecurrent,
            percent: percentRecurrent ? percentRecurrent : 0,
            color: "#F7931B"
         },
         {
            name: 'Eventuais',
            amount: amountEventual,
            percent: percentEventual ? percentEventual : 0,
            color: "#E44C4E"
         }
      ];
   }, [monthSelected, yearSelected]);

   const relationGainsRecurrentVersusEventual = useMemo(() => {
      let amountRecurrent = 0;
      let amountEventual = 0;

      gains
         .filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
         })
         .forEach((gain) => {
            if (gain.frequency === 'recorrente') {
               return amountRecurrent += Number(gain.amount);
            }

            if (gain.frequency === 'eventual') {
               return amountEventual += Number(gain.amount);
            }
         });

      const total = amountRecurrent + amountEventual;

      const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
      const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

      return [
         {
            name: 'Recorrentes',
            amount: amountRecurrent,
            percent: percentRecurrent ? percentRecurrent : 0,
            color: "#F7931B"
         },
         {
            name: 'Eventuais',
            amount: amountEventual,
            percent: percentEventual ? percentEventual : 0,
            color: "#E44C4E"
         }
      ];
   }, [monthSelected, yearSelected]);

   //useCallback garante que uma funcao seja chamada apenas uma vez - fica mais performatico

   const handleMonthSelected = useCallback((month: string) => {
      try {
         const parseMonth = Number(month)
         setMonthSelected(parseMonth)
      } catch {
         throw new Error("Invalid month value, Is accpet 0 - 24 !")
      }
   },[])

   const handleYearSelected = useCallback((year: string) => {
      try {
         const parseYear = Number(year)
         setYearSelected(parseYear)
      } catch {
         throw new Error("Invalid year value, Is accpet integer number!!")
      }
   },[])

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
            <PieChartBox data={relationExpensesVsGains} />
            <HistoryBox
               data={historyData}
               lineColorAmountEntry="#F7931B"
               lineColorAmountOutPut="#E44C4E"
            />

            <BarChartBox
               title="Saídas"
               data={relationExpensevesRecurrentVersusEventual}
            />

            <BarChartBox
               title="Entradas"
               data={relationGainsRecurrentVersusEventual}
            />
         </Content>
      </Container>
   )
}

export default Dashboard

//excluir depois