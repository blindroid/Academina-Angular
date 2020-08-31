import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: []
})

export class ComponentsComponent implements OnInit {
    constructor( private renderer : Renderer2) {}

    ngOnInit() {
       
    }

}
