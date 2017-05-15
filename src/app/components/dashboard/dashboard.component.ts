import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { english } from '../../langauge-files/english';
import { german } from "app/langauge-files/german";
import { SettingsService } from '../../services/settings.service';
import { Router } from "@angular/router";

@Component({
  selector: 'snscg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public _languageService: LanguageService, private _settings: SettingsService, private _router: Router) { }

  ngOnInit() {
  }

  routeToNtt() {
    this._router.navigate(['DigitTripleTest']);
  }

  routeToVisonTest() {
    this._router.navigate(['VisionTest']);
  }

  routeToCognitionTest() {
    this._router.navigate(['CognitionTest']);
  }

  routeToQuestionnaire() {
    this._router.navigate(['Questionnaire']);
  }

}
