import { WordFrequencyCounter } from './wordFrequencyCounter';
import { Grep } from './grep';

const args = process.argv.slice(2);
const pattern = args[0];
const files = args.slice(1);


//CONTAGEM DE PALAVRAS
// const wordFrequencyCounter = new WordFrequencyCounter();
// wordFrequencyCounter.countWordFrequency()
//   .then(() => {
//     console.log('Contagem de frequência de palavras concluída.');
//   })
//   .catch((error) => {
//     console.error('Ocorreu um erro ao contar a frequência de palavras:', error);
//   });

//PARA FAZER FREQUENCIA DETERMINADA PALAVRA 
const grep = new Grep();
grep.searchPatternInFiles(pattern, files);