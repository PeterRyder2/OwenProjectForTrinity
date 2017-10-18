import {
  CognitionChapterDescriptionComponent,
} from '../components/cognition/cognition-chapter-description/cognition-chapter-description.component';
import {
  CognitionTestDescriptionComponent,
} from '../components/cognition/cognition-test-description/cognition-test-description.component';
import { CognitionTestResultComponent } from '../components/cognition/cognition-test-result/cognition-test-result.component';
import { CognitionTestComponent } from '../components/cognition/cognition-test/cognition-test.component';
import { IqcodeDescriptionComponent } from '../components/cognition/iqcode-description/iqcode-description.component';
import { IqcodeResultComponent } from '../components/cognition/iqcode-result/iqcode-result.component';
import { IQCODE } from '../components/cognition/iqcode/iqcode';
import {
  DigitTripleTestDescriptionComponent,
} from '../components/hearing/digit-triple-test-description/digit-triple-test-description.component';
import {
  DigitTripleTestResultComponent,
} from '../components/hearing/digit-triple-test-result/digit-triple-test-result.component';
import { DigitTripleTestComponent } from '../components/hearing/digit-triple-test/digit-triple-test.component';
import { HddaDescriptionComponent } from '../components/hearing/hdda-description/hdda-description.component';
import { HddaResultComponent } from '../components/hearing/hdda-result/hdda-result.component';
import { HDDA } from '../components/hearing/hdda/hdda';
import {
  HearingChapterDescriptionComponent,
} from '../components/hearing/hearing-chapter-description/hearing-chapter-description.component';
import { QuestionnaireComponent } from '../components/questionnaire/questionnaire.component';
import { Vf14DescriptionComponent } from '../components/vision/vf14-description/vf14-description.component';
import { Vf14ResultComponent } from '../components/vision/vf14-result/vf14-result.component';
import { VF14 } from '../components/vision/vf14/vf14';
import {
  VisionChapterDescriptionComponent,
} from '../components/vision/vision-chapter-description/vision-chapter-description.component';
import { IProcedure } from '../interfaces/IProcedureConfig.interface';
import { VisionTestDescriptionComponent } from '../components/vision/vision-test-description/vision-test-description.component';
import { VisionTestResultComponent } from '../components/vision/vision-test-result/vision-test-result.component';
import { VisionTestComponent } from '../components/vision/vision-test/vision-test.component';

export const procedureConfig: IProcedure = {
  chapters: [
    {
      name: 'Hearing',
      description: HearingChapterDescriptionComponent,
      tests: [
        {
          name: 'HDDA',
          description: HddaDescriptionComponent,
          resultComponent: HddaResultComponent,
          component: QuestionnaireComponent,
          inputData: [
            {
              identifier: 'questionnaire',
              data: HDDA
            }
          ]
        },
        {
          name: 'DigitTripleTest',
          description: DigitTripleTestDescriptionComponent,
          resultComponent: DigitTripleTestResultComponent,
          component: DigitTripleTestComponent
        }
      ]
    },
    {
      name: 'Cognition',
      description: CognitionChapterDescriptionComponent,
      tests: [
        {
          name: 'IQCODE',
          description: IqcodeDescriptionComponent,
          resultComponent: IqcodeResultComponent,
          component: QuestionnaireComponent,
          inputData: [
            {
              identifier: 'questionnaire',
              data: IQCODE
            }
          ]
        },
        {
          name: 'CognitionTest',
          description: CognitionTestDescriptionComponent,
          resultComponent: CognitionTestResultComponent,
          component: CognitionTestComponent
        }
      ]
    },
    {
      name: 'Vision',
      description: VisionChapterDescriptionComponent,
      tests: [
        {
          name: 'VF14',
          description: Vf14DescriptionComponent,
          resultComponent: Vf14ResultComponent,
          component: QuestionnaireComponent,
          inputData: [
            {
              identifier: 'questionnaire',
              data: VF14
            }
          ]
        },
        {
          name: 'VisionTest',
          description: VisionTestDescriptionComponent,
          resultComponent: VisionTestResultComponent,
          component: VisionTestComponent
        }
        // {
        //   name: 'VisionTest',
        //   description: {
        //     name: 'VisionTestDescription'
        //   },
        //   component: null
        // }
      ]
    },
  ]
};
