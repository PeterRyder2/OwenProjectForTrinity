import { DescriptionComponent } from '../description/description.component';
import { ChapterSelectionComponent } from '../chapter-selection/chapter-selection.component';
import { ProcedureService } from '../../services/procedure.service';
import { ProcedureHostDirective } from '../../directives/procedure-host.directive';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'snscg-procedure-container',
  templateUrl: './procedure-container.component.html',
  styleUrls: ['./procedure-container.component.scss'],
  entryComponents: [
    ChapterSelectionComponent,
    DescriptionComponent
  ]
})
export class ProcedureContainerComponent implements OnInit {

  @ViewChild(ProcedureHostDirective) procedureHost: ProcedureHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private procedureService: ProcedureService) { }

  ngOnInit() {
    this.procedureService.init(this);
  }

  loadComponent = <T>(component: new () => T) => {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    let viewContainerRef = this.procedureHost.viewContainerRef;
    viewContainerRef.clear();

    let ComponentRef = viewContainerRef.createComponent(componentFactory);
    return ComponentRef;
  }

  continue() {
    this.procedureService.continue();
  }

  skip() {
    this.procedureService.skip();
  }

}
