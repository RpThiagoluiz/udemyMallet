import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

   *{
      margin:0;
      padding:0;
      box-sizing:border-box; //pra nao receber a bordar pelo lado de fora. 50px vc coloca uma borda de 10 ele vai pra 60px
   }
   html, body, #root {
      height:100%;
   }

   *,button,input{
      border:0;
      outline:0;
      font-family: 'Roboto', sans-serif;
   }

   button{
      cursor:pointer;
   }
`