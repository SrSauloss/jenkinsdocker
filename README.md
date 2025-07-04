# Temperature Converter (TypeScript)

> Exemplo simples de conversor de temperatura em Node.js + TypeScript, com integração para CI/CD usando Docker e Jenkins.

## Scripts

- `yarn build` — Compila o TypeScript de `src/` para `dist/`
- `yarn start` — Executa o app compilado (`node dist/index.js`)
- `yarn test` — Executa os testes com Jest

## Estrutura

- `src/` — Código-fonte TypeScript
- `dist/` — Código compilado (gerado pelo build, não versionado)
- `test/` — Testes unitários (em TypeScript)
- `Dockerfile.build` — Dockerfile para etapa de build
- `Dockerfile.test` — Dockerfile para etapa de teste
- `Jenkinsfile` — Pipeline declarativo para CI/CD

## CI/CD com Jenkins e Docker

O pipeline está configurado para:

1. **Build em container isolado**
    - Usa o `Dockerfile.build` para criar a imagem e compilar o projeto (`npm run build`).
    - Sempre faz build limpo (`--no-cache`).
    - O status do build é salvo em `build_status.txt`.

2. **Testes em container isolado**
    - Usa o `Dockerfile.test` para criar a imagem e rodar os testes (`npm test`).
    - Sempre faz build limpo (`--no-cache`).
    - O status dos testes é salvo em `test_status.txt`.

3. **Relatório detalhado no final**
    - O Jenkinsfile mostra no final se cada etapa passou ou falhou, com mensagens específicas para cada stage.

4. **Agendamento (cron)**
    - O pipeline pode ser configurado para rodar automaticamente via cron (ver seção de triggers no Jenkinsfile, atualmente comentada).

## Observações Importantes

- O build e o teste são executados em containers separados, garantindo isolamento total.
- O cache do Docker é desabilitado para garantir builds sempre limpos.
- O status de cada etapa é persistido em arquivos e lido no final para relatório preciso.
- Para usar triggers automáticos, descomente o bloco `triggers` no Jenkinsfile e certifique-se de que o job é do tipo Pipeline.
- O arquivo `src/index.ts` pode ser usado propositalmente para inserir erros de compilação TypeScript e assim forçar falhas no build, permitindo testar o comportamento do pipeline e a exibição dos status de cada etapa no Jenkins.

---

> Projeto para fins de estudo e automação de pipelines CI/CD com Node.js, TypeScript, Docker e Jenkins.
