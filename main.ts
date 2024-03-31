import { WordFrequencyCounter } from './wordFrequencyCounter';


//CONTAGEM DE PALAVRAS
const wordFrequencyCounter = new WordFrequencyCounter();
wordFrequencyCounter.countWordFrequency()
  .then(() => {
    console.log('Contagem de frequência de palavras concluída.');
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao contar a frequência de palavras:', error);
  });