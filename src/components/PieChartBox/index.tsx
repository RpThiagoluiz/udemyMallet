import React from 'react'

import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer

} from 'recharts'

import {
   Container,
   SideLeft,
   LegendContainer,
   Legend,
   SideRight,

} from './styles'

interface IPieChartBoxProps {
   data: {
      name: string,
      value: number,
      percent: number,
      color: string
   }[]; //o array no final indica que esse data, recebe uma lista, so olhar o dashboard expensesVsgains
}


const PieChartBox: React.FC<IPieChartBoxProps> = ({ data }) => (

   <Container>
      <SideLeft>
         <h2>Relação</h2>
         <LegendContainer>
            {
               data.map(i => (
                  <Legend key ={i.name} color={i.color}>
                     <div>{i.percent}</div>
                     <span>{i.name}</span>
                  </Legend>
               ))

            }


         </LegendContainer>

      </SideLeft>

      <SideRight>
            <ResponsiveContainer>
               <PieChart>
                  <Pie data ={data} dataKey="percent">
                     {
                        data.map(i => (
                           <Cell key={i.name} fill={i.color} />
                        )) 
                     }
                  </Pie>
               </PieChart>
            </ResponsiveContainer>
      </SideRight>
   </Container>

)

export default PieChartBox