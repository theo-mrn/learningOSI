"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"

export default function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const questions = [
    {
      question: "Quelle est la fonction principale de la couche 3 du modèle OSI ?",
      options: ["Gestion des sessions", "Routage des paquets", "Contrôle d'accès au média", "Chiffrement des données"],
      correct: 1,
      explanation: "La couche 3 (réseau) est responsable du routage des paquets entre différents réseaux.",
    },
    {
      question: "Combien d'octets contient une adresse IPv4 ?",
      options: ["2 octets", "4 octets", "8 octets", "16 octets"],
      correct: 1,
      explanation: "Une adresse IPv4 est composée de 32 bits, soit 4 octets de 8 bits chacun.",
    },
    {
      question: "Que signifie la notation CIDR /24 ?",
      options: [
        "24 hôtes disponibles",
        "24 bits pour la partie réseau",
        "24 sous-réseaux possibles",
        "24 routeurs maximum",
      ],
      correct: 1,
      explanation:
        "/24 signifie que les 24 premiers bits sont utilisés pour identifier le réseau, laissant 8 bits pour les hôtes.",
    },
    {
      question: "Quel protocole est utilisé pour résoudre une adresse IP en adresse MAC ?",
      options: ["DHCP", "DNS", "ARP", "ICMP"],
      correct: 2,
      explanation:
        "ARP (Address Resolution Protocol) permet de résoudre une adresse IP en adresse MAC sur un réseau local.",
    },
    {
      question: "Quelle est la plage d'adresses de la classe B en IPv4 ?",
      options: [
        "1.0.0.0 à 126.255.255.255",
        "128.0.0.0 à 191.255.255.255",
        "192.0.0.0 à 223.255.255.255",
        "224.0.0.0 à 239.255.255.255",
      ],
      correct: 1,
      explanation: "La classe B couvre les adresses de 128.0.0.0 à 191.255.255.255 avec un masque par défaut de /16.",
    },
    {
      question: "Que fait le champ TTL dans un paquet IP ?",
      options: [
        "Indique la taille du paquet",
        "Limite le nombre de sauts",
        "Définit la priorité",
        "Spécifie le protocole",
      ],
      correct: 1,
      explanation:
        "Le TTL (Time To Live) limite le nombre de sauts qu'un paquet peut faire pour éviter les boucles infinies.",
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const isQuizComplete = currentQuestion === questions.length - 1 && showResult
  const progressPercentage = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100

  return (
    <div className="space-y-6">
      {/* En-tête du quiz */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quiz Couche 3 OSI</h3>
          <p className="text-sm text-gray-600">
            Question {currentQuestion + 1} sur {questions.length}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progression</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {!isQuizComplete ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === questions[currentQuestion].correct
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-blue-500 bg-blue-50"
                      : showResult && index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <div>
                        {index === questions[currentQuestion].correct ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div
                className={`p-4 rounded-lg ${
                  selectedAnswer === questions[currentQuestion].correct
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {selectedAnswer === questions[currentQuestion].correct ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-semibold">
                    {selectedAnswer === questions[currentQuestion].correct ? "Correct !" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{questions[currentQuestion].explanation}</p>
              </div>
            )}

            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null || showResult} className="w-full">
              {currentQuestion === questions.length - 1 ? "Terminer le quiz" : "Question suivante"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Quiz terminé !</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score} / {questions.length}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                Score final : {Math.round((score / questions.length) * 100)}%
              </div>

              <Badge
                variant={
                  score >= questions.length * 0.8
                    ? "default"
                    : score >= questions.length * 0.6
                      ? "secondary"
                      : "destructive"
                }
                className="text-sm px-4 py-2"
              >
                {score >= questions.length * 0.8
                  ? "Excellent !"
                  : score >= questions.length * 0.6
                    ? "Bien joué !"
                    : "À revoir"}
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-center">Résumé des réponses</h4>
              <div className="grid gap-2">
                {answers.map((isCorrect, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <span className="text-sm">Question {index + 1}</span>
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={resetQuiz} className="w-full bg-transparent" variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer le quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
