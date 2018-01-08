import { AudioService } from '../../services/audio.service';
import { SettingsService } from '../../services/settings.service';
import { ProcedureService } from '../../services/procedure.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ProcedureState } from '../../enums/Procedure.State.enum';

@Component({
  selector: 'snscg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  stateEnum = ProcedureState;

  get language() {
    return this.languageService.components.navbar;
  }

  constructor(
    public languageService: LanguageService,
    public procedureService: ProcedureService,
    public settingsService: SettingsService,
    public audioService: AudioService) { }

  ngOnInit() {
  }
  
  setLang(val) {
    console.log(val)
    this.settingsService.language = val;
  }


  skip() {
    this.procedureService.skip();
  }

}
