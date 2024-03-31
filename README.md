# CountingWords

## Instruções para executar os arquivos
Foi usado `ts-node `para facilitar e compilar apenas código typescript. Abaixo esta os comandos de cada arquivo

1. **FileGenerator:**
- Este comando é utlizado para gerar os arquivos *txt* necessários para uso nas outras funções.
```
ts-node FileGenerator.ts
```

2. **wordFrequencyCounter:**
- Este comando realiza a contagem das palavras nos arquivos *txt*, além de criar arquivos temporários. 
```
npm start
```

3. **grep:**
- Para utilizar o grep e fazer uma busca por uma palavra específica, por exemplo, fazer uma busca por "aaa" nos arquivos citados.
```
ts-node grep.ts aaa ./doc/doc_1.txt ./doc/doc_2.txt
```

 - Para utilizar o grep com Expressões Regulares, realizando uma busca por expressões, como "^abc" que mostra todos começam com *abc* nos arquivos citados.
```
 ts-node grep.ts -- -e "^abc" ./doc/doc_1.txt ./doc/doc_2.txt
 ```

## 
**OBS:** Certifique de ter todos os dados necessários instalados para compilar corretamente cada arquivos, e todos em cada diretório.