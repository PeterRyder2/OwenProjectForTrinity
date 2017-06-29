import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisionTestComponent } from './components/-tests/vision-test/vision-test.component';
import { CognitionTestComponent } from 'app/components/-tests/cognition-test/cognition-test.component';
import { DigitTripleTestComponent } from './components/-tests/digit-triple-test/digit-triple-test.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { AudioTestingRealmComponent } from './components/audio-testing-realm/audio-testing-realm.component';
import { HDDAComponent } from './components/hearing/hdda/hdda.component';
import { VF14Component } from './components/vision/vf14/vf14.component';
import { IQCODEComponent } from './components/cognition/iqcode/iqcode.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/Dashboard',
    pathMatch: 'full'
  },
  {
    path: 'DigitTripleTest',
    component: DigitTripleTestComponent
  },
  {
    path: 'VisionTest',
    component: VisionTestComponent
  },
  {
    path: 'CognitionTest',
    component: CognitionTestComponent
  },
  {
    path: 'HDDA',
    component: HDDAComponent
  },
  {
    path: 'VF14',
    component: VF14Component
  },
  {
    path: 'IQCODE',
    component: IQCODEComponent
  },
  {
    path: 'AudioTestingRealm',
    component: AudioTestingRealmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
