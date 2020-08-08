O que precisará ser feito?

Desenvolver uma pequena aplicação em NodeJS que realize o consumo de duas APIs, uma para leitura de informações e outra para escrita do resultado.


Passos a serem seguidos:

1 - Expor uma API que recebe um intervalo de datas (leva-se em conta a data de início e de fim) e um estado

Ex: http://localhost/?state=PR&dateStart=2020-05-10&dateEnd=2020-05-18


2 - Consumir as informações do WebService sobre casos de Covid19 disponível no endereço

https://brasil.io/api/dataset/covid19/caso/data/?state=PR&date=2020-05-10


https://brasil.io/api/dataset/covid19/caso/data/?state=SP&date=2020-05-10&city=S%C3%A3o%20Paulo
https://brasil.io/api/dataset/covid19/caso/data/?state=RJ&date=2020-05-10&city=Rio%20de%20Janeiro

3 - Calcular as top 10 cidades com maior aumento percentual de casos em relação a população total da cidade no período


Exemplos:

Curitiba - 1000 habitantes
01/01 -> 10 casos

31/01 -> 15 casos

Representa um aumento de 5 casos para 1000 habitantes (0.5% de aumento)


São Paulo - 10000 habitantes
01/01 -> 10 casos

31/01 -> 30 casos

Representa um aumento de 20 casos para 10000 habitantes (0.2% de aumento)


4 - Após filtrar as informações desejadas, fazer um POST para cada posição no seguinte formato:

Endpoint

https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi


Method

POST


Header

MeuNome: Diego //Alterar para seu nome


Body

{

  id: [0-9], // conforme a posição, sendo 0 o maior número de casos

  nomeCidade: nomeCidade,

  percentualDeCasos: x

}


5 - Subir o projeto em um repositório Git público e responder esse e-mail com o caminho do repositório.



6 - Encaminhar no e-mail também qual a pretensão salarial para ocupar a vaga no modelo PJ.


7 - Prazo para finalização 09/08 às 23:59