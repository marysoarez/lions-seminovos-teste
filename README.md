# Desafio Front-end — Lions Seminovos

Aplicação front-end inspirada no site público da Lions Seminovos, desenvolvida como resposta ao desafio técnico para avaliação de habilidades em desenvolvimento front-end. O escopo concentra-se nas áreas solicitadas: página inicial, catálogo de veículos e agendamento de visita.

> Este projeto é uma demonstração independente para fins de avaliação. Não é afiliado ao site oficial e não realiza vendas, reservas ou envio de solicitações reais.

## Requisitos do desafio

- Criar uma experiência inspirada no site público da Lions Seminovos.
- Apresentar as áreas de página inicial, catálogo e agendamento de visita.
- Usar elementos gráficos públicos associados à marca.
- Incluir ao menos um link ou botão para uma página externa. Esse requisito é atendido na página inicial pelo botão **“Acessar site oficial ↗”**, que direciona para [lionsseminovos.com.br](https://lionsseminovos.com.br/) e abre em uma nova aba.
- Adaptar o layout a diferentes tamanhos de tela.
- Usar o site como referência, sem precisar reproduzir ou implementar todas as funcionalidades do sistema real.
- Documentar as decisões, a organização do código e como executar o projeto.

## Como o desafio foi resolvido

A interface mantém uma estética limpa, com tons neutros, tipografia editorial e detalhes em dourado. A navegação usa React Router, com URLs próprias para início, catálogo, detalhes do veículo e agendamento, permitindo abrir e compartilhar cada área diretamente.

### Página inicial

- Apresenta a revenda, sua atuação no Rio de Janeiro e chamadas para explorar o catálogo ou agendar uma visita.
- Usa a imagem `vw-virtus.jpg` como banner e a logo Lions armazenada em `src/assets/`.
- Exibe veículos em destaque para levar o visitante diretamente aos detalhes.

### Catálogo e detalhes

- Permite alternar entre carros e motos, pesquisar por marca, modelo ou ano e filtrar os anúncios.
- Para carros, há filtros de categoria, marca, modelo, cor, combustível, ano e faixa de preço.
- Para motos, há filtros de marca, modelo, categoria (por exemplo, trail, naked, street, custom, scooter e esportiva), cilindrada, peças e acessórios, cor, combustível, ano e faixa de preço.
- A página de detalhes apresenta galeria de imagens, ficha técnica e uma ação para manifestar interesse.
- O catálogo combina modelos consultados como referência com motos fictícias de demonstração. Os exemplos estão identificados na interface; preços, quilometragens e itens adicionais desses exemplos não representam ofertas reais.
- As imagens são referências ilustrativas de terceiros, não necessariamente fotos dos veículos anunciados pela Lions.

### Agendamento

- Oferece formulário com nome, e-mail, telefone, data, horário e veículo de interesse.
- Valida os campos no navegador e apresenta uma confirmação demonstrativa.
- A solicitação não é enviada a um servidor, não é armazenada e não cria uma reserva.

### Responsividade e acessibilidade

- O layout reorganiza navegação, filtros, cartões e formulários em larguras menores. No celular, o botão de menu abre os links para início, catálogo e agendamento.
- Controles nativos de formulário, estados selecionados, rótulos acessíveis e textos alternativos ajudam a tornar o fluxo utilizável por teclado e tecnologias assistivas.

## Tecnologias

- **React 19** — componentes e interface.
- **TypeScript** — tipagem de dados e contratos entre partes da aplicação.
- **Vite 8** — servidor de desenvolvimento e geração do build.
- **CSS** — estilos e breakpoints responsivos, sem biblioteca de componentes.
- **Vitest** — execução dos testes.
- **React Testing Library** e **jsdom** — testes de interação e renderização da interface.
- **Oxlint** — análise estática do código.

## Organização do código

```text
src/
  app/
    App.tsx                  # fornece o router à aplicação
    AppLayout.tsx            # cabeçalho, rodapé e layout de rotas
    routes.tsx               # rotas de início, catálogo, veículo e agendamento
    lazy-routes.tsx          # carregamento sob demanda e fallback das páginas
    pages.tsx                # adaptadores entre rotas e funcionalidades
    main.tsx                 # inicialização do React
    index.css                # estilos globais
    styles.css               # estilos da aplicação e responsividade
    testSetup.ts             # configuração dos testes
    __tests__/
      app.test.tsx           # testes de integração da aplicação
  features/
    home/
      home-page.tsx          # apresentação e destaques
    appointments/
      components/
        appointment-page.tsx # formulário e confirmação demonstrativa
      services/
        appointment-service.ts # simulação da solicitação de visita
      types.ts               # contrato dos dados do formulário
    vehicles/
      components/
        catalog-page.tsx     # filtros e resultados do catálogo
        vehicle-detail.tsx   # galeria e ficha do veículo
      hooks/
        use-vehicles.ts      # carregamento e estados do catálogo
      services/
        vehicle-service.ts   # ponto de acesso ao catálogo
        vehicle-repository.ts # repositório assíncrono em memória
      mocks/
        vehicle.mock.ts      # anúncios e dados demonstrativos
      types.ts               # contratos de veículo e repositório
  shared/
    components/
      vehicle-card.tsx       # cartão usado na Home e no catálogo
    utils/
      format-currency.ts     # formatação monetária brasileira
  assets/
    vw-virtus.jpg            # imagem usada no banner inicial
    lions-logo.png           # logo da navegação e do rodapé
public/                      # arquivos estáticos servidos diretamente
```

As rotas ficam em `app/routes.tsx` e usam React Router. URLs dedicadas permitem abrir e compartilhar diretamente o catálogo, os detalhes de um veículo e o agendamento. `AppLayout` reúne a navegação global e compartilha o estado carregado do catálogo com as páginas. A interface e os serviços de negócio ficam em suas próprias features. `shared` contém apenas o cartão reutilizado em duas áreas e o formatador de moeda. O TypeScript usa a opção `strict` para habilitar verificações mais rigorosas.

O catálogo é carregado por `use-vehicles`, que chama `vehicle-service`. O serviço delega a leitura ao `vehicle-repository`, implementado em memória com uma pequena espera assíncrona para representar os estados de carregamento, sucesso e erro. Os tipos em `features/vehicles/types.ts` definem o contrato para substituir esse repositório por uma API quando houver um backend. Os anúncios de demonstração ficam nos mocks locais da feature de veículos; não há camada de MSW porque o projeto não faz requisições de rede.

O formulário usa `requestAppointment` como operação simulada. Ele valida e retorna um protocolo de demonstração sem persistir os dados ou contatar a loja.

## Requisitos para executar

- Node.js compatível com Vite 8.
- npm.

## Instalação e execução

Clone o repositório e entre na pasta do projeto. Depois, instale as dependências e inicie o servidor local:

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Comandos disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm test          # executa os testes
npm run build     # valida os tipos TypeScript e gera o build de produção
npm run lint      # executa a análise estática
npm run preview   # serve localmente o build já gerado
```

## Decisões e limitações

- O projeto prioriza as três áreas pedidas e usa rotas do lado do cliente, sem backend ou persistência.
- Os dados ficam em mocks tipados; não há API, banco de dados, autenticação ou integração com CRM.
- Os veículos observados no catálogo público foram registrados como referência em 28/10/2026. Disponibilidade e preços podem mudar e devem ser confirmados diretamente com a loja.
- Algumas motos foram incluídas apenas para demonstrar como o catálogo pode comportar novas categorias e atributos. Elas não são anúncios reais.
- As imagens remotas podem mudar ou deixar de estar disponíveis e não garantem correspondência com a unidade anunciada.
- Endereço, telefone e horário exibidos são informações de referência da experiência e devem ser confirmados antes de qualquer uso comercial.

## Referências

- [Site público da Lions Seminovos](https://lionsseminovos.com.br/)
- [Agendamento de visita](https://lionsseminovos.com.br/agende-sua-visita)
- [Catálogo público](https://lionsseminovos.com.br/estoque?pagina=1)

---

Desenvolvido por **Maryangela Soares** para o desafio técnico de front-end da Lions Seminovos.




