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
  isFinished: boolean = false
  value: string = "";

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.initQuizz();
    console.log(this.answers)
  }

  initQuizz() {
    this.service.getData().subscribe((data: any) => {
      console.log(data)
      this.title = data.title;
      const questionFind = data.questions.find((el: any) => {
        return el.id === this.id
      })
      this.question = questionFind.question
      this.options.push(questionFind.options)
    });
  }

  getAnswers(alias: string) {
    this.answers.push(alias);
    if(this.id < 5) {
      this.options = []
      this.id++
      this.initQuizz()
    } else {
      this.showResult()
    }
  }

  showResult() {
    this.isFinished = true
  }
}
