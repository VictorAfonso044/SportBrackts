import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SportBracket';
  iconChange = false;
  rounds = [];
  formulario: FormGroup;
  timesEmbaralhados = [];
  times = [
    {
      "nome": "time 1",
      "cor": "#000000"
  },
  {
      "nome": "time 5",
      "cor": "#0011ff"
  },
  {
      "nome": "time 8",
      "cor": "#ffa200"
  },
  {
      "nome": "time 7",
      "cor": "#9d3481"
  },
  {
      "nome": "time 3",
      "cor": "#9509c8"
  },
  {
      "nome": "time 2",
      "cor": "#e60505"
  },
  {
      "nome": "time 6",
      "cor": "#39af0e"
  },
  {
      "nome": "time 4",
      "cor": "#e1f00a"
  }
  ];
  isOpen(event): void {
    this.iconChange = event;
  }
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      cor: new FormControl('#000000'),
    });
  }
  adicionarTime(): void {
    this.times.push(this.formulario.value);
    this.times[this.times.indexOf(this.formulario.value)][`id`] = this.times.indexOf(this.formulario.value);
    this.formulario.reset();
  }
  remover(time): void {
    const index = this.times.indexOf(time);
    this.times.splice(index, 1);
  }
  embaralhar() {
    this.timesEmbaralhados = [];
    this.rounds = [];
    let indiceAtual = this.times.length,
      valorTemporario,
      indiceAleatorio;

    while (0 !== indiceAtual) {
      indiceAleatorio = Math.floor(Math.random() * indiceAtual);
      indiceAtual -= 1;
      valorTemporario = this.times[indiceAtual];
      this.times[indiceAtual] = this.times[indiceAleatorio];
      this.times[indiceAleatorio] = valorTemporario;
    }
    this.times.map((time,i) => time[`id`] = i);
    for (let i = 0; i < this.times.length; i++) {
      if (i == this.times.length - 1) {
        this.timesEmbaralhados.push([this.times[i]]);
      } else {
        this.timesEmbaralhados.push([this.times[i], this.times[i + 1]]);
        i++;
      }
    }
  }
}
