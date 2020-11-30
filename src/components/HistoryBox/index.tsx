import React from 'react'
import {
   ResponsiveContainer,
   LineChart,
   Line,
   XAxis,
   CartesianGrid,
   Tooltip

} from 'recharts'


import { Container, ChartContainer } from './styles'

interface IHistoryBoxProps {
   data: {
      month: string,
      amountEntry: number,
      amountOutPut: number,
   }[],
   lineColorAmountEntry: string,
   lineColorAmountOutPut: string,


}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
   data,
   lineColorAmountEntry,
   lineColorAmountOutPut
}) => (
      <Container>
         <h2>Historico de saldo</h2>


         <ChartContainer>
            <ResponsiveContainer>
               <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                  <XAxis dataKey="month" stroke="#cecece" />
                  <Tooltip />
                  <Line type="monotone" dataKey="amountEntry" name="Entradas" stroke={lineColorAmountEntry} strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="amountOutPut" name="Saidas" stroke={lineColorAmountOutPut} strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} />

               </LineChart>
            </ResponsiveContainer>
         </ChartContainer>
      </Container>
   )

export default HistoryBox