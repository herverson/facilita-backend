
  <h1>Backend do Sistema de Gerenciamento de Clientes</h1>

  <p>Este é o backend de um sistema de gerenciamento de clientes desenvolvido utilizando Node.js e PostgreSQL. O sistema permite cadastrar e visualizar clientes, além de otimizar rotas de atendimento para maximizar a eficiência na visitação dos clientes.</p>

  <h2>Requisitos</h2>

  <ul>
    <li>Node.js</li>
    <li>PostgreSQL</li>
    <li>npm ou yarn</li>
  </ul>

  <h2>Configuração</h2>

  <ol>
    <li><strong>Instalação de Dependências:</strong>
      <pre>npm install</pre>
    </li>
    <li><strong>Configuração do Banco de Dados:</strong>
      <ul>
        <li>Certifique-se de ter um servidor PostgreSQL em execução.</li>
        <li>Crie um banco de dados e configure as credenciais nos arquivos <code>.env</code> e <code>knexfile.js</code>.</li>
      </ul>
    </li>
    <li><strong>Migração do Banco de Dados:</strong>
      <pre>npx knex migrate:latest</pre>
    </li>
  </ol>

  <h2>Execução</h2>

  <p>Inicie o servidor com o seguinte comando:</p>
  <pre>npm start</pre>

  <p>O servidor será iniciado em <code>http://localhost:3001</code> por padrão.</p>

  <h2>Rotas</h2>

  <ol>
    <li><strong>Listar Clientes:</strong>
      <ul>
        <li><strong>Método:</strong> GET</li>
        <li><strong>Rota:</strong> /clients</li>
        <li><strong>Descrição:</strong> Retorna a lista de todos os clientes cadastrados.</li>
      </ul>
    </li>
    <li><strong>Cadastrar Cliente:</strong>
      <ul>
        <li><strong>Método:</strong> POST</li>
        <li><strong>Rota:</strong> /clients</li>
        <li><strong>Descrição:</strong> Cadastra um novo cliente. Envie um JSON com os campos <code>name</code>, <code>email</code>, <code>phone</code>, <code>x_coordinate</code> e <code>y_coordinate</code>.</li>
      </ul>
    </li>
    <li><strong>Coordenadas dos Clientes:</strong>
      <ul>
        <li><strong>Método:</strong> GET</li>
        <li><strong>Rota:</strong> /clients/coordinates</li>
        <li><strong>Descrição:</strong> Retorna as coordenadas (x, y) de todos os clientes cadastrados.</li>
      </ul>
    </li>
    <li><strong>Otimizar Rota:</strong>
      <ul>
        <li><strong>Método:</strong> GET</li>
        <li><strong>Rota:</strong> /optimize-route</li>
        <li><strong>Descrição:</strong> Calcula a rota otimizada para visitação dos clientes. Retorna a ordem de visitação.</li>
      </ul>
    </li>
  </ol>

  <h2>Contribuições</h2>

  <p>Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) ou enviar pull requests com melhorias.</p>

  <h2>Licença</h2>

  <p>Este projeto está sob a Licença MIT - veja o arquivo <a href="LICENSE">LICENSE</a> para detalhes.</p>