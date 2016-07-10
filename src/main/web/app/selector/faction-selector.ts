import { Component, Output, EventEmitter } from "@angular/core";

@Component({
	selector: 'faction-selector',
    templateUrl: 'app/selector/factionSelector.html'
})

export class FactionSelector{
	@Output() select = new EventEmitter();
	factions = ["UCM","PHR","Shaltari","Scourge"];
	
	ngOnInit(){
		this.select.emit(this.factions[0]);
	}

}