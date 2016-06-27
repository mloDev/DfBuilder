import { Component, Input } from '@angular/core';
import {Tabs} from '../navbar/tabs';

@Component({
  selector: 'tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input() tabTitle: string;
  @Input() active = this.active || false;
  
  constructor(tabs: Tabs){
    
   tabs.addTab(this);
    
  }
}