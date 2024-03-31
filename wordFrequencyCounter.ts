import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

export class WordFrequencyCounter {
  private tempFile: [string, string][] = [];
  private tempFile2: { [key: string]: string[] } = {};
  private tempFile3: { [key: string]: number } = {};

  private theMap(file: string): void {
    const text: string = fs.readFileSync(file, 'utf-8');
    text.split('\n').forEach((line: string) => {
      this.tempFile.push([line, '1']);
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

  private Reduce(key: string, value: string[]): void {
    this.tempFile3[key] = value.length;
  }

  private createTempFiles(words: string[]): void {
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const tempFilePath = path.join(tempDir, 'temp_result.txt');
    fs.writeFileSync(tempFilePath, words.map(word => `${word} : "1"`).join('\n'));
  }

  public countWordFrequency(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const generatedFiles: string[] = glob.sync(path.join(__dirname, 'doc', 'doc_*.txt'));

      for (const file of generatedFiles) {
        this.theMap(file);
      }

      this.theProcessor();
      const reduceThreads: Promise<void>[] = [];

      for (const key in this.tempFile2) {
        const t = new Promise<void>((resolve) => {
          this.Reduce(key, this.tempFile2[key]);
          resolve();
        });
        reduceThreads.push(t);
      }

      Promise.all(reduceThreads)
        .then(() => {
          const uniqueWords = Object.keys(this.tempFile2).sort();
          this.createTempFiles(uniqueWords);

          const resultDir = path.join(__dirname, 'result');
          if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir);
          }
          const resultFilePath = path.join(resultDir, 'word_result.txt');
          fs.writeFileSync(resultFilePath, JSON.stringify(this.tempFile3, null, 2));
          console.log(`Resultados salvos em ${resultFilePath}`);
          resolve();
        })
        .catch(reject);
    });
  }
}
