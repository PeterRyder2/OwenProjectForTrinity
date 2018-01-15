export class ILanguageFile {
    components: {
        navbar: {
            skip: string;
        },
        identification: {
            name: string;
            continue: string;
        }
        procedureContainer: {
            continue: string;
        },
        home: {
            firstPage: {
                title: string;
                firstParagraph: string;
                secondParagraph: string;
                firstHint: string;
            }
        },
        chapterSelection: {
            title: string;
            Cognition: string;
            Hearing: string;
            Vision: string;
        },
        cognition: {
            chapterDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    firstHint: string;
                }
            },
            test: {
                miniInstructions: string;
                no: string;
                yes: string;
                firstIntro: string;
                secondIntro: string;
                continue: string;
                outro: string;
            },
            testDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    firstHint: string;
                    secondHint: string;
                    thirdHint: string;
                    soundFile: string;
                },
                secondPage: {
                    title: string;
                    firstParagraph: string;
                    firstHint: string;
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                },
                secondPage: {
                    title: string;
                    firstParagraph: string;
                }
            },
            questionnaireResult: {}
        },
        hearing: {
            chapterDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    thirdParagraph: string;
                    firstHint: string;
                }
            },
            test: {
                startHint: string;
                continueHint: string;
                continue: string;
            },
            testDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    firstHint: string;
                    secondHint: string;
                    thirdHint: string;
                    soundFile: string;
                },
                secondPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    thirdParagraph: string;
                    firstHint: string;
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                }
            },
            questionnaireResult: {}
        },
        vision: {
            chapterDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    thirdParagraph: string;
                    firstHint: string;
                }
            },
            test: {
                miniInstructions: string;
            },
            testDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    firstHint: string;
                    secondHint: string;
                },
                secondPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    firstHint: string;
                },
                thirdPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    firstHint: string;
                    secondHint: string;
                    thirdHint: string;
                },
                fourthPage: {
                    title: string;
                    firstParagraph: string;
                    secondParagraph: string;
                    thirdParagraph: string;
                    fourthParagraph: string;
                    fifthParagraph: string;
                    firstHint: string;
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: string;
                    firstParagraph: string;
                }
            },
            questionnaireResult: {
                noResult: string;
            }
        }
    }
}
