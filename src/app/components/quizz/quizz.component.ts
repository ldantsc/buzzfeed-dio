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
  title: string = "";
  constructor(private service: ApiService) {
  }

  ngOnInit(): void {

    this.service.getData().subscribe((data) => {
      this.title = data.title
    })
  }

 }
