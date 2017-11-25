import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-result-parser',
  templateUrl: './result-parser.component.html',
  styleUrls: ['./result-parser.component.scss']
})
export class ResultParserComponent implements OnInit {

  testData = '';
  output = '';
  res = {
    SeenCorrect: 0,
    SeenWrong: 0,
    NotSeenCorrect: 0,
    NotSeenWrong: 0
  }

  constructor() { }

  ngOnInit() {
  }

  Evaluate() {
    let test = JSON.parse(this.testData);
    for (let respone of test.Response) {
      if (test.PresentWords.includes(respone.Word)) {
        if (respone.Seen)
          this.res.SeenCorrect++;
        else
          this.res.NotSeenWrong++;
      } else {
        if (respone.Seen)
          this.res.SeenWrong++;
        else
          this.res.NotSeenCorrect++;
      }
    }
    return this.res;
  }

}
