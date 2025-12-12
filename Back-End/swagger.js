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
        Evento: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Show Linkin Park' },
            descricao: { type: 'string', example: 'Show ao vivo' },
            capa_url: { type: 'string', example: 'https://example.com/imagem.jpg' },
            data: { type: 'string', format: 'date-time', example: '2026-01-20T00:00:00.000Z' },

            id_endereco: { type: 'integer', example: 2 },
            logradouro: { type: 'string', example: 'Rua Farah Dib Bechara' },
            bairro: { type: 'string', example: 'Jardim Das Belezas' },
            numero: { type: 'string', example: '57' },
            sigla: { type: 'string', example: 'AC' },

            Organizador: { type: 'string', example: 'Music Live' },
            status: { type: 'string', example: 'Ativo' },

            categorias: {
              type: 'array',
              items: { $ref: '#/components/schemas/EventoCategoria' } },
          },
            required: [
              'id', 'nome', 'descricao', 'capa_url', 'data',
              'id_endereco', 'logradouro', 'bairro', 'numero',
              'sigla', 'Organizador', 'status', 'categorias'
            ],
        },
        EventoCategoria: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 13 },
            evento_id: { type: 'integer', example: 1 },
            evento_nome: { type: 'string', example: 'Show Linkin Park' },
            categoria_id: { type: 'integer', example: 6 },
            categoria_nome: { type: 'string', example: 'Esportes' },
          },
          required: [
            'id', 'evento_id', 'evento_nome',
            'categoria_id', 'categoria_nome'
          ],
        },
        EventoCreate: {
          type: 'object',
          properties: {
            nome: { type: 'string', example: 'Show Linkin Park' },
            descricao: { type: 'string', example: 'Show ao vivo' },
            capa_url: { type: 'string', example: 'https://example.com/imagem.jpg' },
            data: { type: 'string', format: 'date', example: '2026-01-20' },
            
            id_organizador: { type: 'integer', example: 2 },
            id_status_evento: { type: 'integer', example: 1 },

            endereco: {
              type: 'object',
              properties: {
                cep: { type: 'string', example: '06315140' },
                logradouro: { type: 'string', example: 'Rua Farah Dib Bechara' },
                cidade: { type: 'string', example: 'Carapicuíba' },
                bairro: { type: 'string', example: 'Jardim Das Belezas' },
                numero: { type: 'string', example: '57' },
                id_uf: { type: 'integer', example: 1 },
              },
              required: ['cep','logradouro','cidade','bairro','numero','id_uf'],
            },

            categoria: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  categoria_id: { type: 'integer', example: 5 },
                },
                required: ['categoria_id'],
              },
            },
          },

          required: [
            'nome', 'descricao', 'capa_url', 'data',
            'id_organizador', 'id_status_evento',
            'endereco', 'categoria'
          ],
        },
        LoteIngresso: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 4 },
            quantidade: { type: 'integer', example: 200 },
            valor: { type: 'string', example: '80' },
            data_inicio_venda: { type: 'string', format: 'date-time', example: '2025-12-20T00:00:00.000Z' },
            disponibilidade: { type: 'integer', example: 1 },

            tipo_ingresso: {
              type: 'array',
              items: { $ref: '#/components/schemas/TipoIngresso' }
            },

            setor: {
              type: 'array',
              items: { $ref: '#/components/schemas/Setor' }
            },

            evento: {
              type: 'array',
              items: { $ref: '#/components/schemas/EventoRelacionamento' }
            },
          },

          required: [
            'id', 'quantidade', 'valor', 'data_inicio_venda',
            'disponibilidade', 'tipo_ingresso', 'setor', 'evento'
          ],
        },

        LoteIngressoCreate: {
          type: 'object',
          properties: {
            numero: { type: 'integer', example: 1 },
            quantidade: { type: 'integer', example: 200 },
            valor: { type: 'string', example: '80' },
            data_inicio_venda: {
              type: 'string',
              format: 'date',
              example: '2025-12-20'
            },
            id_setor: { type: 'integer', example: 11 },
            id_tipo_ingresso: { type: 'integer', example: 1 },
            id: { type: 'integer', example: 5 },
          },

          required: [
            'numero', 'quantidade', 'valor',
            'data_inicio_venda', 'id_setor',
            'id_tipo_ingresso', 'id'
          ],
        },
        
        Setor: {
          type: 'object',
          properties: {
            nome: { type: 'string', example: 'Pista' },
            capacidade: { type: 'integer', example: 5000 },
            capacidade_atual: { type: 'integer', example: 3200 },
            id_evento: { type: 'integer', example: 10 }
          },
          required: [
            'nome',
            'capacidade',
            'capacidade_atual',
            'id_evento'
          ]
        },  

        SetorCreate: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 3 },
            nome: { type: 'string', example: 'Pista' },
            capacidade: { type: 'integer', example: 5000 },
            capacidade_atual: { type: 'integer', example: 3200 },
            evento: {
              type: 'object',
              properties: {
                id_evento: { type: 'integer', example: 10 },
                nome: { type: 'string', example: 'Show de Rock' }
              }
            }
          }
        },
        EnderecoParticipante: {
          type: 'object',
          properties: {
            id:{ type: 'integer', example: 5 },
            cpf:{type: 'string', example: '33221144556'},
            data_nascimento: { type: 'string', format: 'date-time', example: '1999-03-21T00:00:00.000Z' },
            telefone:{ type: 'string', example: '(11)90000-0005'},
            email:{ type: 'string', format: 'email', example: 'fernanda.costa@email.com' },
            senha:{type: 'string', example: 'senhaFernanda123'},
            id_endereco:{ type: 'integer', example: 5},
            cep:{ type: 'string', example: '51011020'},
            cidade:{type: 'string', example: 'Recife'},
            bairro:{ type: 'string', example: 'Boa Viagem'},
            numero: { type: 'string', example: '999'},
            logradouro: {type: 'string', example: 'Rua do Sol'},
              
            participante_info: {
              type: 'array',
              items:{ 
                type: 'object',
                properties: {
                  nome:{ type: 'string', example: 'Fernanda Costa'},
                  status: { type: 'integer', example: 0},
                },
                  
              },
            },
               
            estado: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id:{ type: 'integer',example: 4},
                  sigla: { type: 'string', example: 'AM'},
                },
              },
            },       
          },
          required: [
            'id','cpf', 'data_nascimento',
            'telefone','email','senha',
            'id_endereco','cep','cidade',
            'bairro','numero','logradouro',
            'participante_info', 'estado'
          ]
        },
        EnderecoParticipanteCreate: {
          type: 'object',
          properties: {
            cep: { type: 'string', example: '51011020' },
            cidade: { type: 'string', example: 'Recife' },
            bairro: { type: 'string', example: 'Boa Viagem' },
            numero: { type: 'string', example: '999' },
            logradouro: { type: 'string', example: 'Rua do Sol' },
            id_uf: { type: 'integer', example: 1 },
            id_participante: { type: 'integer', example: 3 },
          },
          required: [
            'cep',
            'cidade',
            'bairro',
            'numero',
            'logradouro',
            'id_uf',
            'id_participante'
          ]
        },
      
      },
    },
  },
  apis: ['./routes/*.js'], // caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
