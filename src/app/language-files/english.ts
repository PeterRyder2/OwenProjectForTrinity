import { ILanguageFile } from '../interfaces/ILanguage.interface';

export const english: ILanguageFile = {
    components: {
        navbar: {
            skip: `Skip`,
        },
        procedureContainer: {
            continue: `Continue`,
        },
        home: {
            firstPage: {
                title: `Welcome to the eChecker`,
                firstParagraph: `The eChecker can test your hearing, vision and memory. There will be questionnaires and interactive tests. After each test, a brief result is shown.`,
                secondParagraph: `Note: The memory questionnaire is designed to be filled in by someone who knows you well. Don’t worry if there is not somebody available to complete this as we can miss out this part of the test if necessary.`,
                firstHint: `Press "Continue" to begin!`,
            }
        },
        chapterSelection: {
            title: `Which test would you like to take?`,
            Cognition: `Memory test`,
            Hearing: `Hearing test`,
            Vision: `Vision test`,
        },
        cognition: {
            chapterDescription: {
                firstPage: {
                    title: `Memory test`,
                    firstParagraph: `The memory test includes a questionnaire and a short test that asks you to remember some words.`,
                    secondParagraph: `For the memory test, you might need to adjust the volume to make sure that the sound is clearly audible.`,
                    firstHint: `Press "Continue" to begin with the questionnaire.`,
                }
            },
            test: {
                continue: 'Continue'
            },
            testDescription: {
                firstPage: {
                    title: `Memory test instructions`,
                    firstParagraph: `The memory test is next.`,
                    secondParagraph: `Some speech is played now. Please adjust the volume (if necessary) using the + and – buttons to make the speech clearly 
                    audible.`,
                    firstHint: ` - Volume display + `,
                    secondHint: `Press "Continue" when the speech is clearly audible.`,
                },
                secondPage: {
                    title: `Memory test instructions`,
                    firstParagraph: `During the test, you are going to be presented with some words. Try to remember them. We will ask you to recall them later.`,
                    firstHint: `Press "Continue" to begin the memory test.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Memory questionnaire instructions`,
                    firstParagraph: `This questionnaire is designed to be completed by someone who knows you well. 
                    If nobody is around to do complete the questionnaire, 
                    please click on the “Skip” button above. Otherwise please click “Continue" to start the questionnaire.`
                }
            },
            questionnaireResult: {}
        },
        hearing: {
            chapterDescription: {
                firstPage: {
                    title: `Hearing test`,
                    firstParagraph: `The hearing test includes a questionnaire and a speech-in-noise test.`,
                    secondParagraph: `In the questionnaire, simply highlight the answer which best describes you.`,
                    thirdParagraph: `For the speech test, you might need to adjust the volume to make sure that the sound is clearly audible.
                    External speakers or headphones might be necessary to yield a sufficient level.`,
                    firstHint: `Press "Continue" to begin the questionnaire.`,
                }
            },
            test: {
                startHint: 'Press "Continue" to begin the hearing test.',
                continueHint: 'Enter the digits that you have understood using the number pad below.',
                continue: 'Continue'
            },
            testDescription: {
                firstPage: {
                    title: `Hearing test instructions`,
                    firstParagraph: `The speech-in-noise test is next.`,
                    secondParagraph: `Some speech is played now. Please adjust the volume (if necessary) using the + and – buttons to make the speech clearly
                    audible.`,
                    firstHint: ` - Volume display + `,
                    secondHint: `Press "Continue" when the speech is clearly audible.`,
                },
                secondPage: {
                    title: `Hearing test instructions`,
                    firstParagraph: `During the test, you hear combinations of numbers, with noise in the background. Please enter the three numbers that you
                    hear using the number pad on the screen. You may use the &larr; button to delete a number.`,
                    secondParagraph: `The number of times the process is repeated will depend on your particular responses.`,
                    thirdParagraph: `The test will get harder. If you are unsure, please take a guess.`,
                    firstHint: `Press "Continue" to begin the hearing test.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Hearing questionnaire instructions`,
                    firstParagraph: `In the following we will ask you 12 questions. Please always select one of the responses and click "Continue".`,
                }
            },
            questionnaireResult: {}
        },
        vision: {
            chapterDescription: {
                firstPage: {
                    title: `Vision test`,
                    firstParagraph: `The vision test includes a questionnaire and an acuity test.`,
                    secondParagraph: `In the questionnaire, simply highlight the answer which best describes you.`,
                    thirdParagraph: `For the acuity test, you will first need to set the size of a shown rectangle. You will need any card the size of a bank
                    card for this, and please ensure your browser itself does NOT zoom the vision test pages.`,
                    firstHint: `Press "Continue" to begin with the questionnaire.`,
                }
            },
            test: {},
            testDescription: {
                firstPage: {
                    title: `Rectangle size adjustment`,
                    firstParagraph: `Please ensure that this text is well visible and clearly recognisable, but please do NOT set a browser zoom differing from
                    100%.`,
                    secondParagraph: `Now please adjust the width of the rectangle below so that it is the same size as your card using the + and – buttons`,
                    firstHint: ` - RECTANGLE + `,
                    secondHint: `Press continue when the size of the card and the rectangle are the same.`
                },
                secondPage: {
                    title: `Vision test instructions`,
                    firstParagraph: `Keep a distance of 50 cm from your eyes to the screen during the test.`,
                    firstHint: `Please press "Continue".`,
                },
                thirdPage: {
                    title: `Vision test instructions`,
                    firstParagraph: `You will see squares of different sizes with a gap in one side of the shape.`,
                    secondParagraph: `Press the arrow button which is on the same side as the gap.`,
                    thirdParagraph: `Example: : If you saw this shape Π you would press the arrow &darr; below the symbol.`,
                    fourthParagraph: `The number of symbols shown will depend on your particular responses.`,
                    fifthParagraph: `The test is designed to be hard. If you are unsure of the correct response, please take a guess.`,
                    firstHint: `Press "Continue" to begin the vision test.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Vision questionnaire instructions`,
                    firstParagraph: `Optional if questionnaire requires particular mandatory instructions.`,
                }
            },
            questionnaireResult: {}
        }
    }
};
