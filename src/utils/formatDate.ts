const formatDate = (date: string): string => {
   //oque fez no outr de fora ta fazendo nesse aq dentro destro

   const dateFormatted = new Date(date)
   const day = dateFormatted.getDate() > 9 ? dateFormatted.getDate() : `0${dateFormatted.getDate()}` //acrescenter o 0 se for maior que nove
   const month = dateFormatted.getMonth() + 1 > 9 ? dateFormatted.getMonth() + 1 :`0${dateFormatted.getMonth() + 1}`//mes comeca apartir do mes 0,
   const year = dateFormatted.getFullYear()



   return `${day}/${month}/${year}`
}

export default formatDate