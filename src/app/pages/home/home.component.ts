import { Component } from '@angular/core';
import { QuizzComponent } from '../../components/quizz/quizz.component';

@Component({
  standalone: true,
  imports: [QuizzComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
