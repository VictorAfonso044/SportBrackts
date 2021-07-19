import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Jogo } from './jogo';

@Component({
  selector: 'brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss'],
})
export class BracketsComponent implements OnInit, OnChanges {
  @Input() rounds;
  @Input() times: Array<any>;
  bot = {id:"bot loser", nome:"Auto complete", cor:"#d4ff00"};
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['times']) {
      if (this.times.length > 1) {
        this.gerarRounds();
      }
    }
  }
  gerarRounds() {
    this.rounds = [this.times];
    let control = this.times.length;
    while (true) {
      console.log('Antes: ' + control / 2);
      control = Math.floor(control / 2);
      console.log(control);
      if (control == 0) {
        break;
      } else {
        this.rounds.push(Array.from({ length: control }).map((v) => []));
      }
    }
    console.log(this.rounds);
  }

  winner(time, chave, grupo): void {
    const partida = document.getElementById(grupo + 'G' + chave);
    const elemento = document.getElementById(grupo + 'T' + time.id);
    time.idChave = chave;
    for (let index = 0; index < partida.children.length; index++) {
      const html = partida.children[index];
      if (html.classList.contains('winner')) {
        html.classList.remove('winner');
      }
    }
    elemento.classList.add('winner');
    if (chave < Math.floor(this.rounds[grupo].length / 2)) {
      this.rounds[grupo + 1][0] = this.rounds[grupo + 1][0].filter(
        (value) => value.idChave != chave
      );
      this.rounds[grupo + 1][0].push(time);
    } else if (this.rounds[grupo + 1] && this.rounds[grupo + 1][1]) {
      this.rounds[grupo + 1][1] = this.rounds[grupo + 1][1].filter(
        (value) => value.idChave != chave
      );
      this.rounds[grupo + 1][1].push(time);
    }else{
      this.rounds[grupo + 1][0] = this.rounds[grupo + 1][0].filter(
        (value) => value.idChave != chave
      );
      this.rounds[grupo + 1][0].push(time);
    }
  }
}
