const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Eventos',
      version: '1.0.0',
      description: 'API para gerenciar cadastro de Organizadores e Participantes de Eventos',
    },
    servers: [
      { url: 'http://localhost:8080' },
    ],
    components: {
      schemas: {
        Endereco: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 3 },
            cep: { type: 'string', example: '30140120' },
            cidade: { type: 'string', example: 'Itapevi' },
            sigla: { type: 'string', example: 'SP' },
            bairro: { type: 'string', example: 'Rosemary' },
            numero: { type: 'string', example: '374' },
            logradouro: { type: 'string', example: 'Rua Serra do Paracaima' },
          },
          required: ['id','cep','cidade','sigla','bairro','numero','logradouro'],
        },
        Participante: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Fulano' },
            cpf: { type: 'string', example: '12345678910' },
            data_nascimento: { type: 'string', format: 'date-time', example: '2001-10-18' },
            telefone: { type: 'string', example: '(11)90000-0001' },
            status: { type: 'integer', example: 1 },
            email: { type: 'string', format: 'email', example: 'fulano@email.com' },
            senha: { type: 'string', example: 'fulano123' },
            id_uf: { type: 'integer', example: 25 },
            endereco: { type: 'array', items: { $ref: '#/components/schemas/Endereco' } },
          },
          required: ['id','participante','cpf','data_nascimento','telefone','status','email','senha','id_uf','endereco'],
        },
        EnderecoOrganizador: {
            type: 'object',
            properties: {
              cep: { type: 'string', example: "01001000" },
              cidade: { type: 'string', example: "São Paulo" },
              bairro: { type: 'string', example: "Centro" },
              numero: { type: 'string', example: "150" },
              logradouro: { type: 'string', example: "Av. São João" },
              id_uf: { type: 'integer', example: 1 }
            },
            required: ['cep', 'cidade', 'bairro', 'numero', 'logradouro', 'id_uf']
          },
        Organizador: {
            type: 'object',
            properties: {
              id:{ type: 'integer', example: 1 },
              nome_fantasia:{ type: 'string', example: "Music Live" },
              razao_social:{ type: 'string', example: "Music Live Produções LTDA"},
              email:{ type: 'string', format: 'email', example: "contato@musiclive.com"},
              cnpj: { type: 'string', example: "20394857000155"},
              telefone: {type: 'string', example: "11999887766" },
              endereco: {type: 'array', items: {$ref: '#/components/schemas/EnderecoOrganizador'} },
            },
            required:['id', 'nome_fantasia', 'razao_social', 'email', 'cnpj', 'telefone', 'endereco'],       
        },
        
      },
    },
  },
  apis: ['./routes/*.js'], // caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
