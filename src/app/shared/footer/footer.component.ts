import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

// Angular Component for Footer
export class FooterComponent{
    currentDate : Date = new Date();
}
