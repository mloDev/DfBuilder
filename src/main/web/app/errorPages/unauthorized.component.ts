import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
        <div class="container-fluid">
            <h1>Unauthorized: you are not allowed to see this content</h1>
        </div>         
  `
})
export class UnauthorizedComponent {}