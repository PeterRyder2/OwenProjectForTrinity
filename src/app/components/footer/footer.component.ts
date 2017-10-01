import { ProcedureService } from '../../services/procedure.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date = new Date();
  positionName: string;

  constructor(private procedureService: ProcedureService) { }

  ngOnInit() {
    this.initDate();
    this.initPosition();
  }

  initDate() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  initPosition() {
    this.procedureService.position.onNameChange.subscribe(value => {
      this.positionName = value;
    });
  }

}
