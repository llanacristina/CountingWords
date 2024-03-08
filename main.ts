import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

class WordFrequencyCounter {
  private tempFile: [string, string][] = [];
  private tempFile2: { [key: string]: string[] } = {};
  private tempFile3: { [key: string]: number } = {};

  private theMap(file: string): void {
    const text: string = fs.readFileSync(file, 'utf-8');
    text.split('\n').forEach((word: string) => {
      this.tempFile.push([word, '1']);
    });
  }

  private theProcessor(): void {
    for (const [key, value] of this.tempFile) {
      if (this.tempFile2[key]) {
        this.tempFile2[key].push(value);
      } else {
        this.tempFile2[key] = [value];
      }
    }
  }
// Conta a frequência de cada palavra e armazena em tempFile3
  private Reduce(key: string, value: string[]): void {
    this.tempFile3[key] = value.length;
  }

  public countWordFrequency(files: string[]): void {
    const threads: Promise<void>[] = [];

   // Inicia as threads Map para cada arquivo
    for (const file of files) {
      const t = new Promise<void>((resolve) => {
        this.theMap(file);
        resolve();
      });
      threads.push(t);
    }
    Promise.all(threads)
      .then(() => {
        this.theProcessor();
        const reduceThreads: Promise<void>[] = [];

      // Inicia as threads Reduce para cada chave única em tempFile2
        for (const key in this.tempFile2) {
          const t = new Promise<void>((resolve) => {
            this.Reduce(key, this.tempFile2[key]);
            resolve();
          });
          reduceThreads.push(t);
        }

        return Promise.all(reduceThreads);
      })
      .then(() => {
          // Escreve os resultados em um arquivo
          const resultFilePath = path.join(__dirname, 'word_result.txt');
          fs.writeFileSync(resultFilePath, JSON.stringify(this.tempFile3, null, 2));
          console.log(`Resultados salvos`);
      });
  }
}

// Obtém a lista de arquivos gerados pelo FileGenerator
const generatedFiles: string[] = glob.sync(path.join(__dirname, 'doc_*.txt'));

// Conta a frequência de palavras nos arquivos gerados
const wordFrequencyCounter = new WordFrequencyCounter();
wordFrequencyCounter.countWordFrequency(generatedFiles);
