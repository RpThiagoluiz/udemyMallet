//d `e para sobre escrever certo tipos de arquivos

import 'styled-components'


//criar uma tipagem da interface, como o objeto deve ser.
//sobreescrevi e adc esses objetos dentro do styled components
//criei dois themas para a pagina
declare module 'styled-components'{
   export interface DefaultTheme {
      title: string;

      colors: {
         primary: string;
         secondary: string;
         tertiary: string;
   
         white: string;
         black: string;
         gray: string;
   
         success: string;
         info: string;
         warning: string;
      },
   
   }
}