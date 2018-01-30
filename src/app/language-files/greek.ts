import { ILanguageFile } from '../interfaces/ILanguage.interface';

export const greek: ILanguageFile = {
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
                miniInstructions: 'Has this word been presented after the test started?',
                no: 'No',
                yes: 'Yes',
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
                    soundFile: 'TestMemorySound.gr.mp3'
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
                    firstParagraph: `Tώρα θα θέλαμε να θυμηθείτε πως ήταν ο/η φίλος/η / συγγενής σας πριν 10 χρόνια 
                    και να τον/την συγκρίνετε με το πως είναι τώρα. <br>
                    Πιο κάτω βρίσκονται καταστάσεις στις οποίες το άτομο αυτό πρέπει 
                    να χρησιμοποιήσει τη μνήμη του/της ή ευφυΐα του/της και θα
                     θέλαμε να υποδείξετε κατά πόσο έχει βελτιωθεί, 
                     έχει παραμείνει σταθερός/ή, ή έχει χειροτερέψει στην αντίστοιχη 
                     κατάσταση τα τελευταία 10 χρόνια. <br>
                     Σημειώστε ότι είναι πολύ σημαντικό να συγκρίνετε την απόδοση 
                     του τότε (πριν 10 χρόνια) και τώρα. 
                     Έτσι, αν πριν 10 χρόνια αυτό το άτομο πάντα ξεχνούσε που 
                     άφηνε τα πράγματα του και ακόμη το κάνει, τότε θα πρέπει να εκληφθεί 
                     ως «Όχι ιδιαίτερη αλλαγή». <br>
                     Παρακαλώ σημειώστε τις αλλαγές που έχετε παρατηρήσει, 
                     κυκλώνοντας την κατάλληλη απάντηση.`,
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
                continueHint: 'Enter the recognized digits with the number pad below.<br>Use &larr; button to delete a number.<br>If you are unsure about a number, please take a guess.',
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
                    soundFile: 'TestTripleSound.gr.mp3'
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
            test: {
                miniInstructions: '<h1>Press the arrow at the side of the gap, or guess if you are unsure.</h1>',
            },
            testDescription: {
                firstPage: {
                    title: `Vision test`,
                    firstParagraph: `Before we start the vision test, we need to make sure that the screen is set correctly. 
                    You will need a credit card (or a card that is the same size as a credit card).`,
                    secondParagraph: `Please do NOT change the browser zoom from 100% to a different value.`,
                    firstHint: `Press continue when you are ready to check the screen setting.`,
                    secondHint: ``
                },
                secondPage: {
                    title: `Vision test`,
                    firstParagraph: `Now place your credit card against the screen. 
                    Adjust the width of the rectangle below so that it is the same size as the credit card 
                    using the small and large - and + buttons.`,
                    secondParagraph: ``,
                    firstHint: `Press continue when the rectangle is the same width as the card.`
                },
                thirdPage: {
                    title: `Vision test instructions`,
                    firstParagraph: `Use a distance of at least minDistancecm. 
                    A distance of optDistancecm would be best.`,
                    secondParagraph: `Please enter the distance that you will use in cm:`,
                    firstHint: `Please use a greater distance, at least minDistancecm.
                    optDistancecm would be best. Please adjust the distance.`,
                    secondHint: `You can do the test, but a distance of optDistancecm would be better. 
                    Please press "Continue" to start or adjust the distance.`,
                    thirdHint: `This distance is great. Please press "Continue" to start.`,
                },
                fourthPage: {
                    title: `Vision test instructions`,
                    firstParagraph: `You will see squares of different sizes. Each square has a gap on one side.`,
                    secondParagraph: `Press the arrow button according to the side that the gap is on.`,
                    thirdParagraph: `For example: If you saw this shape Π you would press the arrow &darr; below the symbol.`,
                    fourthParagraph: `Some squares may be hard to see. 
                    If you are unsure which side the gap is on, please take a guess.`,
                    fifthParagraph: ``,
                    firstHint: `Press "Continue" to begin the vision test.`,
                }
            },
            testResult: {
                firstCase: 'No result, threshold greater than 6/$X$',
                secondCase: 'Threshold is 6/$X$ or less',
                thirdCase: 'Threshold is 6/$X$'
            },
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
