import { ProcedureService } from '../../services/procedure.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'snscg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _languageService: LanguageService, public procedureService: ProcedureService) { }

  ngOnInit() {
  }

  skip() {
    this.procedureService.skip();
  }

}
