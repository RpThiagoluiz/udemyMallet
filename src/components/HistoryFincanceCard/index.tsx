import React from 'react'
import { Container,Tag} from './styles' //quando nao tem export default

interface IHistoryFinanceCardProps {
   // cardColor: string; - retirado para ficar fixo e nao interativo com o usuario
   tagColor: string;
   title: string;
   subtitle: string;
   amount: string;

}



const HistoryFincanceCard: React.FC<IHistoryFinanceCardProps> = ({
   tagColor,title,subtitle,amount
}) =>  (
      <Container>
         <Tag color={tagColor}/>
         <div>
            <span>{title}</span>
            <small>{subtitle}</small>
         </div>
         <h3>{amount}</h3>
      </Container>
   )


export default HistoryFincanceCard