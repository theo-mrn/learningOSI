"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  Shield, 
  Zap, 
  Network, 
  Router, 
  Wifi, 
  Cable,
  ArrowDown,
  ArrowUp,
  Play,
  Pause
} from "lucide-react"

interface OSILayer {
  number: number
  name: string
  color: string
  textColor: string
  description: string
  examples: string[]
  equipment: string[]
  icon: any
  role: string
}

const osiLayers: OSILayer[] = [
  {
    number: 7,
    name: "Application",
    color: "bg-red-500",
    textColor: "text-red-600",
    description: "Interface utilisateur et services réseau",
    examples: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "SSH"],
    equipment: ["Navigateurs web", "Clients email", "Applications"],
    icon: Globe,
    role: "Fournit les services réseau aux applications utilisateur"
  },
  {
    number: 6,
    name: "Présentation",
    color: "bg-orange-500",
    textColor: "text-orange-600",
    description: "Traduction, chiffrement et compression des données",
    examples: ["SSL/TLS", "JPEG", "GIF", "ASCII", "MPEG"],
    equipment: ["Systèmes de chiffrement", "Codecs", "Compresseurs"],
    icon: Shield,
    role: "Traduit les données pour l'application"
  },
  {
    number: 5,
    name: "Session",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    description: "Établissement et gestion des sessions",
    examples: ["NetBIOS", "RPC", "SQL", "NFS"],
    equipment: ["Gestionnaires de session", "APIs", "Services web"],
    icon: Zap,
    role: "Contrôle les dialogues entre ordinateurs"
  },
  {
    number: 4,
    name: "Transport",
    color: "bg-green-500",
    textColor: "text-green-600",
    description: "Transport fiable des données de bout en bout",
    examples: ["TCP", "UDP", "SPX", "SCTP"],
    equipment: ["Passerelles", "Firewalls", "Load balancers"],
    icon: Network,
    role: "Assure la livraison fiable des données"
  },
  {
    number: 3,
    name: "Réseau",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    description: "Routage et adressage logique",
    examples: ["IP", "ICMP", "ARP", "OSPF", "BGP"],
    equipment: ["Routeurs", "Switches L3", "Passerelles"],
    icon: Router,
    role: "Détermine le chemin optimal pour les données"
  },
  {
    number: 2,
    name: "Liaison",
    color: "bg-indigo-500",
    textColor: "text-indigo-600",
    description: "Contrôle d'erreurs et accès au média",
    examples: ["Ethernet", "Wi-Fi", "PPP", "Frame Relay"],
    equipment: ["Switches", "Ponts", "Points d'accès"],
    icon: Wifi,
    role: "Assure une transmission sans erreur sur un lien"
  },
  {
    number: 1,
    name: "Physique",
    color: "bg-purple-500",
    textColor: "text-purple-600",
    description: "Transmission physique des bits",
    examples: ["Câbles RJ45", "Fibre optique", "Ondes radio", "Bluetooth"],
    equipment: ["Hubs", "Répéteurs", "Câbles", "Antennes"],
    icon: Cable,
    role: "Transmet les bits sur le support physique"
  }
]

interface OSILayerDiagramProps {
  interactive?: boolean
  showAnimation?: boolean
  compact?: boolean
  selectedLayer?: number
  onLayerSelect?: (layer: number) => void
}

export default function OSILayerDiagram({ 
  interactive = true, 
  showAnimation = false,
  compact = false,
  selectedLayer = 7,
  onLayerSelect 
}: OSILayerDiagramProps) {
  const [activeLayer, setActiveLayer] = useState(selectedLayer)
  const [animationRunning, setAnimationRunning] = useState(false)
  const [currentAnimationStep, setCurrentAnimationStep] = useState(0)

  const handleLayerClick = (layerNumber: number) => {
    if (interactive) {
      setActiveLayer(layerNumber)
      onLayerSelect?.(layerNumber)
    }
  }

  const startAnimation = () => {
    setAnimationRunning(true)
    setCurrentAnimationStep(0)
    
    const timer = setInterval(() => {
      setCurrentAnimationStep(prev => {
        if (prev >= 14) { // 7 couches down + 7 couches up
          setAnimationRunning(false)
          clearInterval(timer)
          return 0
        }
        return prev + 1
      })
    }, 800)
  }

  const getAnimationState = (layerNumber: number) => {
    if (!animationRunning) return 'idle'
    
    // Phase descendante (encapsulation)
    if (currentAnimationStep <= 7) {
      return layerNumber === (8 - currentAnimationStep) ? 'active' : 'idle'
    }
    
    // Phase montante (décapsulation)
    const upStep = currentAnimationStep - 7
    return layerNumber === upStep ? 'active' : 'idle'
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {osiLayers.map((layer) => {
          const IconComponent = layer.icon
          const isActive = activeLayer === layer.number
          
          return (
            <div
              key={layer.number}
              className={`flex items-center p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                isActive 
                  ? `${layer.color} text-white shadow-md` 
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => handleLayerClick(layer.number)}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <span className="font-bold text-sm">{layer.number}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold">{layer.name}</div>
                <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                  {layer.description}
                </div>
              </div>
              <IconComponent className="h-5 w-5 flex-shrink-0" />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showAnimation && (
        <div className="text-center">
          <Button 
            onClick={startAnimation}
            disabled={animationRunning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {animationRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Animation en cours...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Voir l'encapsulation
              </>
            )}
          </Button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Diagramme des couches */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-center mb-4">
            Les 7 Couches du Modèle OSI
          </h3>
          
          {osiLayers.map((layer) => {
            const IconComponent = layer.icon
            const isActive = activeLayer === layer.number
            const animState = getAnimationState(layer.number)
            
            return (
              <div
                key={layer.number}
                className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                  interactive ? 'cursor-pointer' : ''
                } ${
                  isActive 
                    ? `${layer.color} text-white border-transparent shadow-lg transform scale-105` 
                    : animState === 'active'
                    ? `${layer.color} text-white border-transparent shadow-lg`
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => handleLayerClick(layer.number)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-bold">{layer.number}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{layer.name}</div>
                      <div className={`text-sm ${
                        isActive || animState === 'active' ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {layer.description}
                      </div>
                    </div>
                  </div>
                  <IconComponent className="h-6 w-6 flex-shrink-0" />
                </div>
                
                {animationRunning && animState === 'active' && (
                  <div className="mt-2 text-xs opacity-90">
                    {currentAnimationStep <= 7 ? '+ En-tête ajouté' : '- En-tête retiré'}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Détails de la couche sélectionnée */}
        <div className="space-y-6">
          {osiLayers.find(l => l.number === activeLayer) && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${
                    osiLayers.find(l => l.number === activeLayer)?.color
                  } text-white flex items-center justify-center font-bold text-lg`}>
                    {activeLayer}
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Couche {activeLayer} - {osiLayers.find(l => l.number === activeLayer)?.name}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      {osiLayers.find(l => l.number === activeLayer)?.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800">Description</h4>
                  <p className="text-gray-600">
                    {osiLayers.find(l => l.number === activeLayer)?.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-gray-800">Protocoles & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {osiLayers.find(l => l.number === activeLayer)?.examples.map((example) => (
                      <Badge key={example} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-gray-800">Équipements & Outils</h4>
                  <div className="flex flex-wrap gap-2">
                    {osiLayers.find(l => l.number === activeLayer)?.equipment.map((equip) => (
                      <Badge key={equip} variant="secondary" className="text-xs">
                        {equip}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Flux de données */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flux de données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <ArrowDown className="h-4 w-4 text-blue-500" />
                  <span><strong>Émission :</strong> Encapsulation des données (haut → bas)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span><strong>Réception :</strong> Décapsulation des données (bas → haut)</span>
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
                  Chaque couche ajoute ses propres informations (en-têtes) lors de l'envoi 
                  et les retire lors de la réception.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
