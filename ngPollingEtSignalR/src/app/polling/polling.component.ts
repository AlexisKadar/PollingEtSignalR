import { Component, numberAttribute, OnInit } from '@angular/core';
import { UselessTask } from '../models/UselessTask';
import { HttpClient } from '@angular/common/http';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-polling',
  standalone: true,
  imports: [MatCheckbox,MatCardContent,MatCard,MatFormField,FormsModule,MatLabel,CommonModule,MatInput,MatButtonModule],
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {
  apiUrl = "https://localhost:7289/api/";
  title = 'labo.signalr.ng';
  tasks: UselessTask[] = [];
  taskname: string = "";

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.updateTasks();
    this.polling();
  }

  complete(id: number) {
    // TODO On invoke la méthode pour compléter une tâche sur le serveur (Contrôleur d'API)
    let x = lastValueFrom(this.http.get<any>('https://localhost:7289/api/UselessTasks/Complete/' + id))
  }

  addtask() {
    // TODO On invoke la méthode pour ajouter une tâche sur le serveur (Contrôleur d'API)

    let x = lastValueFrom(this.http.post<any>('https://localhost:7289/api/UselessTasks/Add?taskText=' + this.taskname, null))

    console.log(this.tasks);
  }

  async updateTasks() {
    // TODO: Faire une première implémentation simple avec un appel au serveur pour obtenir la liste des tâches
    // TODO: UNE FOIS QUE VOUS AVEZ TESTER AVEC DEUX CLIENTS: Utiliser le polling pour mettre la liste de tasks à jour chaque seconde
    let x = await lastValueFrom(this.http.get<any>('https://localhost:7289/api/UselessTasks/GetAll'))
    console.log(x)
    
    this.tasks = x;
    
  }

  async polling() {
    console.log("======= Je polle ======");
    await this.updateTasks();
    //On recommence dans 0.5 seconde en rappelant la même méthode
    setTimeout(() => {this.polling()}, 500);
  }
}
