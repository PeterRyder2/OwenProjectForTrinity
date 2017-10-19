import { LanguageService } from '../../services/language.service';
import { SettingsService } from '../../services/settings.service';
import { IdService } from '../../services/id.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Language } from '../../enums/languages.enum';

@Component({
  selector: 'snscg-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  id = '';
  path: string;

  get language() {
    return this.languageService.components.identification;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private idService: IdService,
    private settings: SettingsService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parmas => { this.path = parmas.path });
  }

  setId() {
    if (this.id !== '' && this.path) {
      this.settings.language = Language.English;
      this.idService.id = this.id;
      this.router.navigate(['/' + this.path]);
    }
  }

}
