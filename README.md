# Object-Detector

Aplicação web para reconhecimento de objetos através de uma API com FastAPI que usa o YOLOv8 pré-treinado para detectar objetos genéricos em imagens.

## Funcionalidades

[x] **Validação e Tratamento de Erros**

Adicione validação para tipos de arquivos e tamanho no frontend e backend.
Retorne mensagens de erro mais detalhadas para o usuário em caso de falha na API.

[ ] **Feedback Visual**

Mostre um spinner ou animação durante o carregamento (loading).
Exiba mensagens de sucesso ou erro após o upload.

[ ] **Organização do Código**

Separe componentes React em arquivos próprios, por exemplo, um componente para upload e outro para exibição do resultado.
No backend, se o projeto crescer, separe rotas em módulos.

[ ] **Segurança**

No backend, restrinja allow_origins do CORS para domínios confiáveis em produção.
Limite o tamanho do arquivo aceito para upload.

[ ] **Documentação**

Adicione instruções de instalação e uso no README.md para frontend e backend.
Documente as rotas da API (pode usar o Swagger do FastAPI).

[ ] **Testes**

Implemente testes unitários para funções críticas do backend.
Considere testes de integração para a API.

[ ] **Performance**

Considere usar um modelo YOLO mais leve ou otimizado para produção.
Implemente cache para resultados repetidos, se aplicável.

[ ] **Experiência do Usuário**

Permita upload de múltiplas imagens.
Mostre as classes detectadas junto com as caixas na imagem.

[ ] **Deploy**

Adicione instruções de deploy (Docker, Vercel, etc).
Considere variáveis de ambiente para URLs e configurações sensíveis.
