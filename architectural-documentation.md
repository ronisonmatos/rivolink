# Documentação Arquitetural para o RivoLink

Versão: 1.0

# Autor

Este documento foi produzido por **Ronison Matos**.

- Contato: https://github.com/ronisonmatos

# Descrição Arquitetural -- RivoLink

Este documento descreve parte da arquitetura do sistema [RivoLink](https://github.com/ronisonmatos/rivolink). Essa descrição foi baseada principalmente no modelo [C4](https://c4model.com/).

É importante destacar que será considerado apenas as principais funcionlidades do RivoLink, ou seja, elementos específicos do sistema e suas implementações não serão detalhados.

## Descrição Geral sobre o RivoLink

O RivoLink originou-se como projeto de Trabalho de Conclusão de Curso (TCC) na [PUCRS](https://online.pucrs.br/), focado no [Desenvolvimento Full Stack](https://online.pucrs.br/pos-graduacao/desenvolvimento-full-stack). Com seu potencial, 
o RivoLink poderá emergir como um produto competitivo no mercado de sistemas para clínicas.

## RivoLink

### Objetivo Geral

Plataforma de gestão clínica com ênfase na excelência do atendimento, proporcionando praticidade no cotidiano e facilitando o acompanhamento contínuo do progresso dos pacientes.

### Objetivos Específicos

O sistema tem objetivos específicos que visam melhorar a eficiência e qualidade do atendimento. Ele será projetado para controlar agendas, permitindo agendamento, reagendamento e cancelamento de consultas de forma otimizada. Além disso, oferecerá controle completo sobre informações de pacientes, incluindo registros detalhados e históricos de consultas, auxiliando no acompanhamento do progresso. A funcionalidade de controle de faturamento simplificará a gestão financeira, registrando custos, planos de pagamento e emissão de faturas. Em essência, o sistema busca facilitar a rotina dos profissionais e melhorar a experiência dos pacientes em clínicas de psicologia.

### Contexto

O sistema RivoLink utilizará a API do Google como login para manter o cadastro e fazer a autenticação do usuário. Esse **usuário** pode ser classificado nas seguintes categorias:

- **Profissionais** que desejam ter uma boa gestão de seus pacientes;
- **Pacientes** podem acompanhar o agendamento das sessões e utilizar ferramentas, como o RPD (Registro de Pensamentos Disfuncionais);

As informações dos usuários são maninpuladas pelo Back-end do sistema RivoLink, e armazenadas em um Banco de Dados mantido pelo mesmo.

<!--Abaixo está o diagrama de contexto.
 ![fig1](architectural-documentation/diagrama-contexto.png) -->

**OBS**: Além do Google, também pode ser utilizada modo tradicional com usuário e senha, mas, por questões de simplificação, esse detalhe não foi ilustrado.

### Containers

O sistema RivoLink é uma aplicação que pode ser dividida basicamente em três grandes partes (containers):

- O **Front-end** (implementado utilizando React.JS): é a parte que o usuário interage através do seu navergador web para acessar as funcionalidades do sistema;
- O **Back-end** (implementado utilizando Node.JS): é responsável pela lógica de negócios;
- **Banco de Dados** (MongoDB): onde os dados sobre os usuários e as comunidades cadastradas/publicadas são armazenados;

[//]: <> ( Abaixo está o diagrama de containers.)

<!-- ![fig2](architectural-documentation/diagrama-containers.png) 

Os **containers** estão **executando/implantandos** na plataforma em núvem **Heroku**. E toda comunicação é feita via API-REST em formato JSON utilizando protocolos HTTPS. -->

Alguns serviços da API são:

- Adicionar um usuário;
- Recuperar informações de um usuário cadastrado;
- Desativar um usuário cadastrado.

### Componentes

Os principais componentes do sistema RivoLink estão descritos a seguir:

- **Agendamento e Gestão de Consultas**: O sistema permite aos pacientes agendar consultas online de forma conveniente, selecionando datas e horários disponíveis. Os psicólogos podem visualizar e gerenciar suas agendas, evitar conflitos e otimizar seu tempo.
- **Perfil do Paciente**: O sistema mantém um registro detalhado para cada paciente, incluindo informações pessoais, histórico médico, notas de sessões anteriores e qualquer outro dado relevante para o tratamento.
- **Prontuário Eletrônico**: Armazena de forma segura e organizada os registros de todas as sessões de terapia, permitindo aos profissionais acessar rapidamente informações passadas, fazer anotações de sessões atuais e acompanhar o progresso do paciente.
- **Prescrições e Recomendações**: Possibilita a criação e o gerenciamento de prescrições médicas ou recomendações terapêuticas, que podem ser compartilhadas diretamente com o paciente.
- **Faturamento e Pagamentos**: Oferece ferramentas para registrar e gerenciar informações financeiras, como custos de sessões, planos de pagamento e emissão de faturas. Pode estar integrado a sistemas de pagamento para facilitar transações.
- **Comunicação Segura**: Fornece uma maneira segura de comunicação entre psicólogos e pacientes, permitindo o envio de mensagens, avisos e lembretes relacionados a consultas, sessões ou outras informações importantes.
- **Privacidade e Segurança**: Deve atender a padrões rigorosos de segurança e privacidade, garantindo que as informações confidenciais dos pacientes estejam protegidas.
- **Relatórios e Análises**: Capacidade de gerar relatórios e análises sobre a eficácia do tratamento, número de consultas realizadas, médias de progresso, entre outros indicadores relevantes.
- **Integração com Ferramentas de Terapia**: Em alguns casos, o sistema pode ser integrado com ferramentas de terapia online, permitindo sessões de terapia virtual em tempo real.


<!-- A seguir está o diagrama de componentes ilustrando os componentes supracitados.

 ![fig3](architectural-documentation/diagrama-componentes.svg) --> 

[//]: <> (### Código <pre>Em breve!</pre>)

### Visão de Informação

O objetivo do sistema é um sistema completo voltado para clínica de psicologia, por isso, entender o fluxo das informações relacionadas com o procedimento de cadastro até o atendimento é muito importante.

O primeiro passo para conseguir utilizar é fazer parte do RivoLink, ou seja, ter um cadastrado ativo no sistema. 

<!-- A seguir está o diagrama de máquina de estados para descrever os estados do procedimento de publicação de uma comunidade.

 ![fig4](architectural-documentation/diagrama-maquina-estados.jpeg) --> 
