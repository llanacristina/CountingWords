import * as fs from 'fs';
import * as path from 'path';

export class Grep {
  public searchPatternInFiles(pattern: string, files: string[]): void {
    const grepResults: string[] = [];

    const regex = new RegExp(pattern); // Convertendo a string para um objeto RegExp

    for (const file of files) {
      const lines = fs.readFileSync(file, 'utf-8').split('\n');
      lines.forEach((line, index) => {
        if (regex.test(line)) { // Usando a expressão regular
          const filename = path.basename(file);
          const directory = path.dirname(file);
          const resultLine = `${directory}/${filename}: ${line}`;
          grepResults.push(resultLine);
        }
      });
    }

    if (grepResults.length > 0) {
      const grepResultFilePath = path.join(__dirname, 'result', 'grep_result.txt');
      fs.writeFileSync(grepResultFilePath, grepResults.join('\n'));
      console.log(`Resultados de grep salvos em ${grepResultFilePath}`);
    } else {
      console.log('Nenhum resultado encontrado.');
    }
  }
}

// Obtenha os argumentos da linha de comando
const args = process.argv.slice(2);

let isRegex = false;
let pattern: string | undefined;
let files: string[] = [];

// Verifica se a opção -e está presente
const eIndex = args.indexOf('-e');
if (eIndex !== -1) {
  isRegex = true;
  pattern = args[eIndex + 1];
  files = args.slice(eIndex + 2);
} else {
  pattern = args[0];
  files = args.slice(1);
}
if (!pattern) {
  console.error('Por favor, forneça uma expressão regular.');
  process.exit(1);
}

const grep = new Grep();
grep.searchPatternInFiles(pattern, files);
