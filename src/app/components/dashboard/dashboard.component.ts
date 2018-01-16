import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'snscg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public _languageService: LanguageService, public _settings: SettingsService, private _router: Router) { }

  ngOnInit() {
  }

  routeTo(route: string) {
    this._router.navigate([route]);
  }
}
