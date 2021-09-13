# marketplace-database
Um repo sobre marketplace e banco de dados, por Mateus Vilasboas. Testado no Ubuntu 20.04.

## Dependências do projeto

* Node v14.17.3 ou superior
* MySQL v8.0.26 ou superior

## Começando com o projeto

* Baixe os arquivos do repositório via `git clone`
* Acesse a pasta raiz do projeto
* Copie e cole o `.env.example` na mesma pasta que o original e mude o nome da cópia para `.env`
* No `.env`, registre os valores dos seguintes campos:

| Campo do ENV | Descrição | Valor sugerido |
| -------- | -------- | -------- |
| DB_NAME    | Nome do banco de dados  | - |
| DB_USER    | Nome do usuário com acesso ao banco de dados   | -|
| DB_PASSWORD    | Senha do usuário com acesso ao banco de dados     | - |
| DB_HOST    | Nome do host do banco de dados    | localhost |

* No MySQL em sua máquina, crie um banco de dados com o mesmo nome de `DB_NAME`
* Configure um usuário e senha com permissões para o banco de dados criado, com mesmos valores que `DB_USER` e `DB_PASSWORD` respectivamente
* Rode o projeto com `npm start`

## Funcionamento básico do projeto

O projeto marketplace-database tem o objetivo de demonstrar como relacionar três tabelas presentes em um marketplace: Categorias, Lojas e Produtos. Nesse projeto, as Categorias são pertencentes ao marketplace. As Lojas herdam Categorias desejadas do marketplace e os produtos das lojas herdam as Categorias desejadas da Loja. No fim, existe um endpoint que mostra quais são as Categorias que possuem Produtos de uma determinada Loja.

## Lógica elaborada para o projeto

Para o projeto, foram criadas três tabelas inicialmente usando a ORM Sequelize: Product (Produto), Store (Loja) e Category (Categoria). Logo após, estabeleceu-se as relações entre as tabelas: 
* Uma relação One-to-Many de Store para Product (uma Loja possui N Produtos)
* Uma relação Many-to-Many entre Product e Category (N Produtos possuem M Categorias)
* Uma relação Many-to-Many entre Store e Category (N Lojas possuem M Categorias)

No passo seguinte, foi pensada a população das tabelas. 
* São criadas 10 linhas na tabela Category (10 Categorias)
* São criadas 3 linhas na tabela Store (3 Lojas), e depois são associadas Categorias à cada uma dessas Lojas
* São criadas 8 linhas na tabela Product (8 Produtos), e depois associadas aos Produtos Categorias das Lojas à quais estes pertencerão. Por fim, são associadas uma das três Lojas aos Produtos.

Por fim, foram feitas queries para determinar quais Categorias de determinada Loja possui Produtos:
* Encontra-se a Loja desejada pelo id da Loja
* Encontra-se todos os Produtos daquela Loja pelo id da Loja
* Encontra-se todas as Categorias do Marketplace
* Filtra-se as Categorias que possuem Produtos e a partir disso os dados são tratados para evitar Categorias repetidas no resultado final
* Retorna-se: Categorias não repetidas da Loja que possuem Produtos, todas as Categorias da Loja e todas as Categorias do marketplace.

## Descrição dos Endpoints

**POST `/marketplace/populate`:** esse endpoint executa drops nas tableas de Category, Store e Product se elas existirem, depois executa um sync e cria as tabelas e por fim preenche-as com dados escritos no código, como descrito acima.

**GET `/marketplace/results/:id`** esse endpoint filtra o banco de dados para retornar somente as Categorias que possuem Produtos de uma determinada Loja. Espera-se como parâmetro um `id`, que pode ir de 1 a 3 - qualquer valor fora disso retornará 404 Not Found. Ao fim da execução do endpoint é retornado um json com Categorias com Produtos, Categorias da Loja e Categorias do Marketplace.