# Silva — front

App da Agência Silva: o agente aceita missões, cumpre as coordenadas em ordem, ganha XP e sobe de nível. A API fica em [kmelosilva/Silva](https://github.com/kmelosilva/Silva).

React 19, TypeScript, Vite 7, Redux Toolkit, styled-components e Bootstrap.

## Rodando

```bash
npm install
npm run dev            # http://localhost:5173 (porta ocupada: npm run dev -- --port 5174)
npm run build && npm run lint
```

O endereço da API está em `src/api/api.ts`.

## Identidade visual

- **Tokens:** cores e fontes ficam todas em `src/theme/tokens.ts`. Nenhum outro arquivo escreve cor à mão; para mudar uma cor da marca, troque lá.
- **Logo:** os vetores da coruja e do logo completo estão em `src/assets/brand/`.

### Fonte da marca (Sequel 100 Wide)

A fonte dos títulos é a **Sequel 100 Wide 95**, da OGJ Type Design, que é licenciada. O arquivo **não está neste repositório**, porque o repositório é público e publicar a fonte seria redistribuí-la.

Para ver os títulos com a fonte da marca, coloque o arquivo da licença em:

```
public/fonts/Sequel100Wide-95.otf
```

A pasta `public/fonts/` está no `.gitignore`. Sem o arquivo, os títulos aparecem em Arial Black, e o logo continua igual, porque é vetor.
