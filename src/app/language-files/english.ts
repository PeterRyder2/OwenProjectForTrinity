import { ILanguageFile } from '../interfaces/ILanguage.interface';

export const english: ILanguageFile = {
    components: {
        navbar: {
            skip: `Skip`,
        },
        identification: {
            name: 'ID',
            continue: 'Continue'
        },
        procedureContainer: {
            continue: `Continue`,
        },
        home: {
            firstPage: {
                title: `Welcome to the eChecker`,
                firstParagraph: `The eChecker tests your hearing, vision and memory. 
                The eChecker uses short questionnaires and interactive tests. 
                Each part takes only a few minutes.`,
                secondParagraph: `Please make sure that you are in a quiet room 
                and there are no distractions while you do the eChecker.`,
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
                    firstParagraph: `The memory test includes a questionnaire that asks about your memory 
                    and thinking skills and a word game that asks you to remember some words.`,
                    secondParagraph: ``,
                    firstHint: `Press "Continue" to begin with the questionnaire.`,
                }
            },
            test: {
                firstIntro: 'Now we are going to ask you some questions.<br>Answer as quickly and accurately as possible.<br><br>Please press \'Continue\' to continue',
                secondIntro: 'Now we are going to show you some words.<br>Please decide whether or not you have already seen them.<br><br>Please press \'Continue\' to continue.',
                continue: 'Continue',
                outro: 'Great!<br>You\'ve completed the word game, please press \'Continue\' to progress.'
            },
            testDescription: {
                firstPage: {
                    title: `Word game instructions`,
                    firstParagraph: `The word game is next.`,
                    secondParagraph: `Some speech is played now. 
                    Please adjust the volume (if necessary) on your device to make the speech clearly audible.`,
                    firstHint: ` You can use external speakers or headphones if necessary. `,
                    secondHint: `Press "Continue" to start the test sound.`,
                    thirdHint: `Press "Continue" when the speech is clearly audible.`,
                    soundFile: 'testTripleSound.mp3'
                },
                secondPage: {
                    title: `Word game instructions`,
                    firstParagraph: `You are going to be presented with some words. Try to remember them. We will ask you to recall them later.`,
                    firstHint: `Press "Continue" to begin the word game.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Memory questionnaire instructions`,
                    firstParagraph: `This questionnaire should be completed by someone 
                    who has known you for at least 10 years. It could be completed by a relative or a friend.<br> 
                    If nobody is around to complete the questionnaire, please click on the “Skip” button above.<br> 
                    If a relative or friend is able to complete the questionnaire for you, 
                    please click “Continue” to begin the questionnaire.
                    `
                },
                secondPage: {
                    title: `Memory questionnaire instructions`,
                    firstParagraph: `Now we want you to remember what your friend or relative was like 10 years ago and
                    to compare it with what he/she is like now.<br> 
                    The following questions refer to 
                    situations where this person has to use his/her memory or intelligence. We want
                    you to indicate whether this has improved, stayed the same or got worse in that
                    situation over the past 10 years.<br> 
                    Note the importance of comparing his/her present
                    performance with 10 years ago. So if 10 years ago this person always forgot where
                    he/she had left things, and he/she still does, then this would be considered "Hasn't
                    changed much".<br> 
                    Please indicate the changes you have observed by highlighting the
                    appropriate answer.`
                }
            },
            questionnaireResult: {}
        },
        hearing: {
            chapterDescription: {
                firstPage: {
                    title: `Hearing test`,
                    firstParagraph: `The hearing test includes a questionnaire and a speech test.`,
                    secondParagraph: `The questionnaire asks questions about your hearing.`,
                    thirdParagraph: `The speech test involves recognising spoken numbers in background noise.`,
                    firstHint: `Press "Continue" to begin the questionnaire.`,
                }
            },
            test: {
                startHint: 'Press "Continue" to begin the hearing test.',
                continueHint: 'Enter the recognized digits with the number pad below.',
                continue: 'Continue'
            },
            testDescription: {
                firstPage: {
                    title: `Speech test instructions`,
                    firstParagraph: `The speech test is next.`,
                    secondParagraph: `Some speech is played now. 
                    Please adjust the volume (if necessary) on your device to make the speech clearly audible.`,
                    firstHint: ` You can use external speakers or headphones if necessary. `,
                    secondHint: `Press "Continue" to start the test sound.`,
                    thirdHint: `Press "Continue" when the speech is clearly audible.`,
                    soundFile: 'testTripleSound.mp3'
                },
                secondPage: {
                    title: `Speech test instructions`,
                    firstParagraph: `You will hear three spoken numbers, with noise in the background 
                    (for example, “The digits one, five, three”). 
                    Please enter the three numbers that you hear using the number pad on the screen 
                    (for example, 1  5  3). 
                    You may use the &larr; button to delete a number if you make a mistake.`,
                    secondParagraph: `Some numbers will be hard to hear. 
                    Please always enter three numbers. If you are unsure, please take a guess.`,
                    thirdParagraph: ``,
                    firstHint: `Press "Continue" to begin the hearing test.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Hearing questionnaire instructions`,
                    firstParagraph: `There are 12 questions about your hearing.<br> 
                    Please choose the answer which best describes you.<br> 
                    Please always select one of the responses and click “Continue”.`,
                }
            },
            questionnaireResult: {}
        },
        vision: {
            chapterDescription: {
                firstPage: {
                    title: `Vision test`,
                    firstParagraph: `The vision test includes a questionnaire and an acuity test.`,
                    secondParagraph: `The questionnaire asks questions about your vision.`,
                    thirdParagraph: `In the acuity test, you will see squares of different sizes. 
                    Each square has a gap on one side. 
                    The test involves deciding which side of the square the gap is on.`,
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
                    firstHint: `Press continue when the size of the card and the rectangle are the same.`
                },
                secondPage: {
                    title: `Vision test instructions`,
                    firstParagraph: `Use a distance of atleast minDistancecm, but a distance of
                    optDistancecm would be better.`,
                    secondParagraph: `Please enter the distance that you will use in cm:`,
                    firstHint: `Please use more distance atleast minDistancecm
                    better optDistancecm. Please adjust the distance.`,
                    secondHint: `You can do the test but a distance of at least optDistancecm would
                    better. Please Press "Continue" or adjust the distance.`,
                    thirdHint: `Optimal Distance you are safe to go. Please Press "Continue".`,
                },
                thirdPage: {
                    title: `Vision test instructions`,
                    firstParagraph: `You will see squares of different sizes. Each square has a gap on one side.`,
                    secondParagraph: `Press the arrow button which is on the same side as the gap.`,
                    thirdParagraph: `For example: If you saw this shape Π you would press the arrow &darr; below the symbol.`,
                    fourthParagraph: `Some squares may be hard to see. 
                    If you are unsure which side the gap is on, please take a guess.`,
                    fifthParagraph: ``,
                    firstHint: `Press "Continue" to begin the vision test.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Vision questionnaire instructions`,
                    firstParagraph: `There are about 20 questions about your vision.<br> 
                    Please choose the answer which best describes you.<br> 
                    Please always select one of the responses and click “Continue”.`,
                }
            },
            questionnaireResult: {
                noResult: 'No result possible'
            }
        }
    }
};
