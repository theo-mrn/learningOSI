"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowDown, 
  ArrowUp, 
  Play, 
  Pause, 
  RotateCcw,
  Package,
  Mail
} from "lucide-react"

interface DataUnit {
  name: string
  color: string
  description: string
  header: string
}

const dataUnits: DataUnit[] = [
  {
    name: "Application Data",
    color: "bg-red-100 border-red-300 text-red-800",
    description: "Message original",
    header: ""
  },
  {
    name: "Presentation Data Unit",
    color: "bg-orange-100 border-orange-300 text-orange-800", 
    description: "Données formatées/chiffrées",
    header: "P-Header"
  },
  {
    name: "Session Data Unit",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    description: "Données avec contrôle de session",
    header: "S-Header"
  },
  {
    name: "Segment/Datagram",
    color: "bg-green-100 border-green-300 text-green-800",
    description: "Données segmentées",
    header: "T-Header"
  },
  {
    name: "Packet/Datagram",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    description: "Paquet avec adresse IP",
    header: "IP-Header"
  },
  {
    name: "Frame",
    color: "bg-indigo-100 border-indigo-300 text-indigo-800",
    description: "Trame avec adresse MAC",
    header: "L2-Header"
  },
  {
    name: "Bits",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    description: "Signaux physiques",
    header: "Physical"
  }
]

export default function EncapsulationVisualizer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'down' | 'up'>('down')
  const [animationSpeed, setAnimationSpeed] = useState(1000)

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setDirection('down')
  }

  const stopAnimation = () => {
    setIsAnimating(false)
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setCurrentStep(0)
    setDirection('down')
  }

  useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      setCurrentStep(prev => {
        if (direction === 'down') {
          if (prev >= 6) {
            setDirection('up')
            return 6
          }
          return prev + 1
        } else {
          if (prev <= 0) {
            setIsAnimating(false)
            return 0
          }
          return prev - 1
        }
      })
    }, animationSpeed)

    return () => clearTimeout(timer)
  }, [currentStep, isAnimating, direction, animationSpeed])

  const getDataVisualization = (step: number) => {
    const headers = []
    const data = "Hello World!"
    
    for (let i = step; i >= 0; i--) {
      if (i < dataUnits.length && dataUnits[i].header) {
        headers.push(dataUnits[i].header)
      }
    }

    return { headers, data }
  }

  const isStepActive = (stepIndex: number) => {
    if (!isAnimating) return false
    return stepIndex === currentStep
  }

  const isStepProcessed = (stepIndex: number) => {
    if (direction === 'down') {
      return stepIndex <= currentStep
    } else {
      return stepIndex >= currentStep
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Visualiseur d'Encapsulation OSI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Contrôles */}
            <div className="flex items-center gap-3 justify-center">
              <Button 
                onClick={startAnimation}
                disabled={isAnimating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="mr-2 h-4 w-4" />
                Démarrer
              </Button>
              
              <Button 
                onClick={stopAnimation}
                disabled={!isAnimating}
                variant="outline"
              >
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              
              <Button 
                onClick={resetAnimation}
                variant="outline"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>

              <div className="flex items-center gap-2 ml-4">
                <label className="text-sm">Vitesse:</label>
                <select 
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="text-sm border rounded px-2 py-1"
                  disabled={isAnimating}
                >
                  <option value={2000}>Lente</option>
                  <option value={1000}>Normale</option>
                  <option value={500}>Rapide</option>
                </select>
              </div>
            </div>

            {/* Indicateur de direction */}
            <div className="text-center">
              <Badge className={`${
                direction === 'down' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {direction === 'down' ? (
                  <>
                    <ArrowDown className="mr-1 h-3 w-3" />
                    Encapsulation (Émission)
                  </>
                ) : (
                  <>
                    <ArrowUp className="mr-1 h-3 w-3" />
                    Décapsulation (Réception)
                  </>
                )}
              </Badge>
            </div>

            {/* Visualisation du processus */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Côté émission */}
              <div className="space-y-3">
                <h4 className="font-semibold text-center">📤 Émission (Encapsulation)</h4>
                
                {dataUnits.map((unit, index) => {
                  const isActive = direction === 'down' && isStepActive(index)
                  const isProcessed = direction === 'down' && isStepProcessed(index)
                  
                  return (
                    <div 
                      key={`send-${index}`}
                      className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                        isActive 
                          ? `${unit.color} shadow-lg scale-105 border-dashed`
                          : isProcessed
                          ? `${unit.color} opacity-80`
                          : "bg-gray-50 border-gray-200 opacity-40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">
                          Couche {7 - index} - {unit.name}
                        </span>
                        <ArrowDown className="h-4 w-4" />
                      </div>
                      
                      <div className="text-xs opacity-75 mb-2">
                        {unit.description}
                      </div>

                      {/* Données avec en-têtes */}
                      {isProcessed && (
                        <div className="bg-white/60 p-2 rounded text-xs font-mono">
                          <div className="flex flex-wrap gap-1">
                            {direction === 'down' && getDataVisualization(index).headers.map((header, i) => (
                              <span key={i} className="bg-red-200 px-1 rounded">
                                {header}
                              </span>
                            ))}
                            <span className="bg-blue-200 px-1 rounded">
                              {getDataVisualization(index).data}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Côté réception */}
              <div className="space-y-3">
                <h4 className="font-semibold text-center">📥 Réception (Décapsulation)</h4>
                
                {[...dataUnits].reverse().map((unit, index) => {
                  const originalIndex = dataUnits.length - 1 - index
                  const isActive = direction === 'up' && isStepActive(originalIndex)
                  const isProcessed = direction === 'up' && isStepProcessed(originalIndex)
                  
                  return (
                    <div 
                      key={`receive-${originalIndex}`}
                      className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                        isActive 
                          ? `${unit.color} shadow-lg scale-105 border-dashed`
                          : isProcessed
                          ? `${unit.color} opacity-80`
                          : "bg-gray-50 border-gray-200 opacity-40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <ArrowUp className="h-4 w-4" />
                        <span className="font-semibold text-sm">
                          Couche {originalIndex + 1} - {unit.name}
                        </span>
                      </div>
                      
                      <div className="text-xs opacity-75 mb-2">
                        {unit.description}
                      </div>

                      {/* Données après traitement */}
                      {isProcessed && (
                        <div className="bg-white/60 p-2 rounded text-xs font-mono">
                          <div className="flex flex-wrap gap-1">
                            {direction === 'up' && getDataVisualization(originalIndex).headers.map((header, i) => (
                              <span key={i} className="bg-red-200 px-1 rounded line-through opacity-50">
                                {header}
                              </span>
                            ))}
                            <span className="bg-blue-200 px-1 rounded">
                              {getDataVisualization(originalIndex).data}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Message de transmission réussie */}
            {!isAnimating && direction === 'up' && currentStep === 0 && (
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-800">Message transmis avec succès !</div>
                <div className="text-sm text-green-600">
                  Le message "Hello World!" a été encapsulé, transmis et décapsulé
                </div>
              </div>
            )}

            {/* Légende */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">Légende</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 rounded"></div>
                  <span>En-têtes ajoutés</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-200 rounded"></div>
                  <span>Données utilisateur</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-3 w-3" />
                  <span>Encapsulation (ajout)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-3 w-3" />
                  <span>Décapsulation (retrait)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 