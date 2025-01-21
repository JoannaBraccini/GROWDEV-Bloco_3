# Academy API

Api de controle de estudantes e suas avaliações.

### Funcionalidades:

**Estudantes**

- Cadastro de estudante ✅
- Listagem de estudantes com filtro (opcional) pelo nome ou cpf ✅
- Busca de um estudante pelo identificador ✅
- Atualização de um estudante (name, password, type, age) ✅
- Remover um estudante ✅

## Avaliações

- Cadastro de avaliações ✅
- Listagem de avaliações ✅
- Busca de uma avaliação ✅
- Atualização de avaliações ✅
- Remoção de avaliações ✅

---

**Armazenamento**

- Banco de dados relacional PostgreSQL ✅

**Segurança**

- Bcrypt para o hash da senha do estudante ✅

**Autenticação**

- Login (email e senha) ✅
  - Bearer Token JWT

**Autorização**

- Listagem de Estudantes/Avaliações:
  - Total:
    - Tech-Helper ✅
    - Matriculado/Formado: Somente o próprio perfil
- Atualização de dados de Estudante:
  - Total:
    - Tech-Helper ✅
    - Matriculado/Formado: Apenas o próprio perfil
- Atualização de dados de Avaliação:
  - Total:
    - Tech-Helper ✅
    - Matriculado/Formado ⛔
- Remoção de Estudante/Avaliação:
  - Total:
    - Tech-Helper ✅
    - Matriculado/Formado ⛔
