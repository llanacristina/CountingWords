import * as fs from 'fs';
import * as path from 'path';

class FileGenerator {
  private split: number;
  private N: number;
  private alphabet: string[];
  private minSize: number;
  private maxSize: number;

  constructor(split: number, N: number, alphabet: string[], minSize: number, maxSize: number) {
    this.split = split;
    this.N = N;
    this.alphabet = alphabet;
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  private generateRandomWord(): string {
    const wordLength = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
    let word = '';
    for (let i = 0; i < wordLength; i++) {
      const randomIndex = Math.floor(Math.random() * this.alphabet.length);
      word += this.alphabet[randomIndex];
    }
    return word;
  }

  public generateFile(): void {
    const words = Array.from({ length: this.N }, () => this.generateRandomWord());

    // Divida o conteúdo em partes
    const wordsPerPart = Math.ceil(this.N / this.split);
    const parts = Array.from({ length: this.split }, (_, index) => words.slice(index * wordsPerPart, (index + 1) * wordsPerPart).join('\n'));

    // Crie e escreva os arquivos
    for (let i = 0; i < this.split; i++) {
      const fileName = path.join(__dirname, `doc_${i + 1}.txt`);
      fs.writeFileSync(fileName, parts[i]);
      console.log(`${fileName} gerado.`);
    }
  }
}

// Exemplo de uso
const fileGenerator = new FileGenerator(10, 10000, ['a', 'b', 'c'], 2, 5);
fileGenerator.generateFile();
