import { Component, Output, EventEmitter,  Input, OnInit } from "@angular/core";
import { GameSizeService } from "../service/gameSize.service";
import { GameSize } from "../model/gameSize";
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'game-selector',
    templateUrl: 'app/selector/gameSelector.html',
    providers: [GameSizeService]
})

export class GameSizeSelector implements OnInit {
    @Output() select = new EventEmitter();
    games: GameSize[] = [];
    
    constructor(
        private gameService: GameSizeService) {};
    
    getGames() {
        this.gameService
            .getGameSizes()
            .then(games => this.games = games);    
    }
    
    ngOnInit(){
        this.getGames();
        if (this.games ==  null) {
        } else {
            this.select.emit(this.games[0]);    
        }
    }

}