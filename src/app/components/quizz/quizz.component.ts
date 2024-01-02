import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-quizz",
  standalone: true,
  imports: [],
  providers: [ApiService],
  templateUrl: "./quizz.component.html",
  styleUrl: "./quizz.component.css",
})
export class QuizzComponent implements OnInit {
  id: number = 1;
  title: string = "";
  question: string = "";
  options: Array<any> = [];
  answers: Array<String> = [];
  results: Array<any> = [];
  result: string = "";
  isFinished: boolean = false;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.initQuizz();
  }

  /* função inicializadora, traz os dados do JSON, procura no array o objeto com a pergunta e opções através do seu id 
  (que no caso inicia-se o id 1), trazendo o objeto com a question e os options para o usuário,
  esta função será invocada novamente em getAnswers com id incrementado trazendo a próxima pergunta */

  initQuizz() {
    this.service.getData().subscribe((dataQuizz: any) => {
      this.title = dataQuizz.title;
      this.isResultExists(dataQuizz);
      const questionFind = dataQuizz.questions.find((el: any) => {
        return el.id === this.id;
      });
      this.question = questionFind.question;
      this.options.push(questionFind.options);
    });
  }

  /* função acionadora click do button, adiciona o alias no array answers
  se satisfaz o if, reseta o array options, incrementa o id e invoca novamente a função initQuizz
  se não, invoca a função showResult*/

  getAnswers(alias: string) {
    this.answers.push(alias);
    if (this.id < 5) {
      this.options = [];
      this.id++;
      this.initQuizz();
    } else {
      this.showResult();
    }
  }

  // função verifica se array results esta vazio, se sim, guarda o objeto de resultados no array results

  isResultExists(data: any) {
    if (this.results.length === 0) {
      this.results.push(data.results);
    }
  }

  /* função onde filtra o array answers, guarda "A" e "B" em arrays separados, e faz a seguinte comparação:
  se o length do array com resultados de A for maior que o array de resultados B, exibe o texto/resultado para o user da opção A
  se não satisfazer o if, irá trazer o resultado de B. 
  Finalizando a função alterando isFinished em "true" para exibir a div do resultado e esconder a div de perguntas
  */

  showResult() {
    const resultA = this.answers.filter((resultA) => resultA == "A");
    const resultB = this.answers.filter((resultB) => resultB == "B");
    if (resultA.length > resultB.length) {
      this.result = this.results[0].A;
    } else {
      this.result = this.results[0].B;
    }
    this.isFinished = true;
  }
}
