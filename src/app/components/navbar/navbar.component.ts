import { SettingsService } from '../../services/settings.service';
import { ProcedureService } from '../../services/procedure.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'snscg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  get language() {
    return this.languageService.components.navbar;
  }

  constructor(
    public languageService: LanguageService,
    public procedureService: ProcedureService,
    public settingsService: SettingsService) { }

  ngOnInit() {
  }

  skip() {
    this.procedureService.skip();
  }

}
