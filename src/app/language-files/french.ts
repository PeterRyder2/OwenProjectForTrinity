import { ILanguageFile } from '../interfaces/ILanguage.interface';

export const french: ILanguageFile = {
    components: {
        navbar: {
            skip: `Passer`,
        },
        identification: {
            name: 'ID',
            continue: 'Continuer'
        },
        procedureContainer: {
            continue: `Continuer`,
        },
        home: {
            firstPage: {
                title: `Bienvenue sur le test « eChecker »`,
                firstParagraph: `Le eChecker teste votre audition, votre vision et votre mémoire. 
                Le eChecker utilise des courts questionnaires et des tests interactifs. 
                Chaque partie prend seulement quelques minutes.`,
                secondParagraph: `Veuillez-vous assurer que vous êtes dans une pièce tranquille  
                et sans distraction lorsque vous passez le eChecker.`,
                firstHint: `Appuyer sur « Continuer » pour commencer !`,
            }
        },
        chapterSelection: {
            title: `Quel test souhaitez-vous passer ?`,
            Cognition: `Test de mémoire`,
            Hearing: `Test d’audition`,
            Vision: `Test de vision`,
        },
        cognition: {
            chapterDescription: {
                firstPage: {
                    title: `Test de mémoire`,
                    firstParagraph: `Le test de mémoire inclut un questionnaire sur votre mémoire 
                    et votre cognition ainsi qu’un jeu de mémoire de mots vous demandant de vous souvenir de certains mots.`,
                    secondParagraph: ``,
                    firstHint: `Veuillez cliquer sur « Continuer » pour commencer le questionnaire.`,
                }
            },
            test: {
                miniInstructions: 'Est-ce que ce mot vous a déjà été présenté au cours de ce test ?',
                no: 'Non',
                yes: 'Oui',
                firstIntro: 'Maintenant, nous allons vous poser quelques questions.<br>Répondez le plus rapidement et précisément possible.<br><br>Appuyez sur « Continuer » pour commencer.',
                secondIntro: 'Maintenant, nous allons vous montrer quelques mots.<br>Vous devrez dire si vous les avez déjà vus ou pas.<br><br>Appuyez sur « Continuer » pour continuer.',
                continue: 'Continuer',
                outro: 'Bravo !<br>Vous avez terminé le « jeu de mémoire de mots ». Appuyez sur « Continuer » pour continuer.'
            },
            testDescription: {
                firstPage: {
                    title: `Consignes pour le jeu de mémoire de mots`,
                    firstParagraph: `Voici le jeu de mémoire de mots.`,
                    secondParagraph: `Vous allez maintenant entendre des conversations. 
                    Merci de régler le volume (si nécessaire) sur votre appareil afin d’entendre clairement ces conversations.`,
                    firstHint: `Vous pouvez utiliser des haut-parleurs externes ou un casque si nécessaire.`,
                    secondHint: `Appuyez sur « Continuer » pour lancer le test sonore.`,
                    thirdHint: `Appuyez sur « Continuer » lorsque le discours est clairement audible.`,
                    soundFile: 'TestMemorySound.fr.mp3'
                },
                secondPage: {
                    title: `Consignes pour le jeu de mémoire de mots`,
                    firstParagraph: `Nous allons vous montrer quelques mots. Essayez de les mémoriser. Nous vous demanderons de les rappeler plus tard.`,
                    firstHint: `Appuyez sur « Continuer » pour commencer le test de mémoire.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Consignes pour le questionnaire de mémoire`,
                    firstParagraph: `Ce questionnaire doit être complété par une personne 
                    qui vous connait depuis au moins 10 ans. Il peut être complété par un proche ou un ami.<br> 
                    Si personne n’est disponible pour compléter le questionnaire pour vous, merci de cliquer sur le bouton « Passer » ci-dessus.<br> 
                    Si un proche ou un ami est présent pour compléter le questionnaire pour vous, 
                    veuillez cliquer sur « Continuer » pour commencer le questionnaire.
                    `
                },
                secondPage: {
                    title: `Consignes pour le questionnaire de mémoire`,
                    firstParagraph: `Maintenant nous voulons que vous vous souveniez de comment était votre proche ou ami 10 ans plus tôt et 
                    que vous le compariez avec comment il est maintenant.<br> 
                    Les questions suivantes font référence à  
                    des situations pour lesquelles votre proche ou ami(e) doit utiliser sa mémoire ou son intelligence. 
                    Pour chaque situation, vous devez indiquer si cela s’est amélioré, 
                    est resté stable ou s'est aggravé au cours des 10 dernières années.<br> 
                    Attention à bien comparer ses performances actuelles avec celles d’il y a 10 ans.
                    Ainsi, si 10 ans auparavant votre proche ou ami oubliait toujours où il/elle avait laissé les choses, 
                    et qu’il/elle le fait toujours, alors cette situation sera considérée comme
                    « N’a pas beaucoup changé ».<br> 
                    Veuillez indiquer les changements que vous avez observés en
                    sélectionnant la réponse appropriée.`
                }
            },
            questionnaireResult: {}
        },
        hearing: {
            chapterDescription: {
                firstPage: {
                    title: `Test d’audition`,
                    firstParagraph: `Le test d’audition comprend un questionnaire et un test d’intelligibilité vocale.`,
                    secondParagraph: `Le questionnaire comporte des questions sur votre audition.`,
                    thirdParagraph: `Le test d’intelligibilité vocale consiste en la reconnaissance de chiffres énoncés avec un bruit de fond.`,
                    firstHint: `Appuyer sur « Continuer »  pour commencer le questionnaire.`,
                }
            },
            test: {
                startHint: 'Appuyer sur « Continuer »  pour commencer le test d’audition.',
                continueHint: 'Entrer les chiffres reconnus à l’aide du clavier numérique ci-dessous.<br>Utilisez le bouton &larr; pour effacer un nombre.<br>Si vous n’êtes pas sûr d’un chiffre, essayez de deviner.',
                continue: 'Continue'
            },
            testDescription: {
                firstPage: {
                    title: `Consignes pour le test d’intelligibilité vocale`,
                    firstParagraph: `Le test d’intelligibilité vocale est le suivant.`,
                    secondParagraph: `Vous allez maintenant entendre des conversations.  
                    Merci de régler le volume (si nécessaire) sur votre appareil afin d’entendre clairement ces conversations.`,
                    firstHint: `Vous pouvez utiliser des hauts parleurs externes ou un casque si nécessaire.`,
                    secondHint: `Appuyer sur « Continuer » pour commencer le test sonore.`,
                    thirdHint: `Appuyer sur « Continuer » lorsque le discours est clairement audible.`,
                    soundFile: 'TestTripleSound.fr.mp3'
                },
                secondPage: {
                    title: `Instructions pour le test d’intelligibilité vocale`,
                    firstParagraph: `Vous allez entendre trois chiffres, avec la présence d’un bruit de fond 
                    (par exemple, « Les chiffres un, cinq, trois »). 
                    Veuillez entrer les trois chiffres que vous entendrez en utilisant le clavier numérique de l’écran 
                    (par exemple, 1, 5, 3). 
                    Vous pouvez utiliser le bouton &larr; pour effacer un nombre si vous avez fait une erreur.`,
                    secondParagraph: `Certains chiffres peuvent être difficiles à entendre. 
                    Merci de toujours entrer 3 chiffres. Si vous n’êtes pas sûr, essayez de deviner.`,
                    thirdParagraph: ``,
                    firstHint: `Appuyer sur « Continuez » pour commencer le test d’audition.`,
                }
            },
            testResult: {},
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Consignes pour le questionnaire d’audition`,
                    firstParagraph: `Il y a 12 questions à propos de votre audition.<br> 
                    Veuillez choisir la réponse qui vous décrit le mieux.<br> 
                    Merci de toujours sélectionner une des réponses avant de cliquer sur « Continuer ».`,
                }
            },
            questionnaireResult: {}
        },
        vision: {
            chapterDescription: {
                firstPage: {
                    title: `Test de vision`,
                    firstParagraph: `Ce test de vision comprend un questionnaire et un test d’acuité visuelle.`,
                    secondParagraph: `Le questionnaire concerne votre vision.`,
                    thirdParagraph: `Pendant le test d’acuité visuelle, vous verrez des carrés de différentes tailles. 
                    Chaque carré possède un côté ouvert. 
                    Vous devrez indiquer quel est le côté ouvert.`,
                    firstHint: `Appuyez sur « Continuer » pour commencer le questionnaire.`,
                }
            },
            test: {
                miniInstructions: '<h1>Appuyez sur la flèche qui est du côté ouvert, ou essayez de deviner si vous n’êtes pas sûr(e).</h1>',
            },
            testDescription: {
                firstPage: {
                    title: `Test de vision`,
                    firstParagraph: `Avant de commencer le test de vision, nous devons nous assurer que l’écran est bien réglé. 
                    Vous aurez besoin d’une carte de crédit (ou d’une carte de format identique).`,
                    secondParagraph: `Assurez-vous que le zoom de votre navigateur est bien réglé sur 100%.`,
                    firstHint: `Appuyez sur « Continuer » si vous êtes prêt(e) à passer au réglage de l’écran.`,
                    secondHint: ``
                },
                secondPage: {
                    title: `Test de vision`,
                    firstParagraph: `Maintenant, placez votre carte de crédit sur l’écran. 
                    Ajustez la taille du rectangle ci-dessous afin qu’il fasse les mêmes dimensions que la carte de crédit,  
                    à l’aide des boutons – et +.`,
                    secondParagraph: ``,
                    bankCardHint: `Comparez la taille avec<br>votre carte bancaire`,
                    firstHint: `Appuyez sur « Continuer » lorsque le rectangle a la même largeur que la carte.`
                },
                thirdPage: {
                    title: `Consignes pour le test de vision`,
                    firstParagraph: `Placez-vous à une distance d’au moins minDistance cm. 
                    Une distance de optDistance cm serait idéale.`,
                    secondParagraph: `Ecrivez la distance à laquelle vous vous placez en cm :`,
                    firstHint: `Veuillez utiliser une distance plus grande, au moins minDistance cm.
                    optDistance cm serait le mieux. Veuillez ajuster la distance.`,
                    secondHint: `Vous pouvez faire le test, mais une distance de optDistance cm serait mieux. 
                    Veuillez appuyer sur « Continuer » pour commencer ou ajuster la distance.`,
                    thirdHint: `Cette distance est parfaite. Appuyez sur « Continuer » pour commencer.`,
                },
                fourthPage: {
                    title: `Consignes pour le test de vision`,
                    firstParagraph: `Vous allez voir des carrés de différentes tailles. Chaque carré possède un côté ouvert.`,
                    secondParagraph: `Appuyez sur la flèche pointant vers le côté ouvert.`,
                    thirdParagraph: `Par exemple, si vous voyez cette forme Π, vous appuierez sur la flèche &darr; en dessous du symbole.`,
                    fourthParagraph: `Certains carrés seront plus difficiles à voir. 
                    Si vous n’êtes pas sûr(e) de savoir quel est le côté ouvert, essayez de deviner.`,
                    fifthParagraph: ``,
                    firstHint: `Appuyez sur « Continuer » pour commencer le test de vue.`,
                }
            },
            testResult: {
                firstCase: 'Aucun résultat, le seuil est supérieur à 6/X',
                secondCase: 'Le seuil est de 6/X ou moins',
                thirdCase: 'Le seuil est de 6/X'
            },
            questionnaire: {},
            questionnaireDescription: {
                firstPage: {
                    title: `Consignes pour le questionnaire concernant votre vision`,
                    firstParagraph: `Il y aura 20 questions concernant votre vision.<br> 
                    Choisissez la réponse qui vous correspond le mieux.<br> 
                    Merci de toujours sélectionner une des réponses avant de cliquer sur « Continuer ».`,
                }
            },
            questionnaireResult: {
                noResult: 'Aucun résultat possible'
            }
        }
    }
};
