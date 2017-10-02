import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'snscg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get language() {
    return this.languageService.components.home;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
