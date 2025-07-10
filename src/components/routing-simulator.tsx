"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw } from "lucide-react"

export default function RoutingSimulator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const network = {
    routers: [
      { id: "R1", name: "Routeur A", x: 100, y: 100, interfaces: ["192.168.1.1", "10.0.0.1"] },
      { id: "R2", name: "Routeur B", x: 300, y: 100, interfaces: ["10.0.0.2", "172.16.0.1"] },
      { id: "R3", name: "Routeur C", x: 500, y: 100, interfaces: ["172.16.0.2", "192.168.2.1"] },
    ],
    hosts: [
      { id: "H1", name: "PC-A", ip: "192.168.1.10", x: 50, y: 200, router: "R1" },
      { id: "H2", name: "PC-B", ip: "192.168.2.10", x: 550, y: 200, router: "R3" },
    ],
    connections: [
      { from: "R1", to: "R2", network: "10.0.0.0/24" },
      { from: "R2", to: "R3", network: "172.16.0.0/24" },
    ],
  }

  const routingSteps = [
    {
      title: "Initialisation",
      description: "PC-A (192.168.1.10) veut envoyer un paquet à PC-B (192.168.2.10)",
      activeElements: ["H1", "H2"],
    },
    {
      title: "Consultation table de routage",
      description: "PC-A consulte sa table de routage et trouve que la destination n'est pas locale",
      activeElements: ["H1"],
    },
    {
      title: "Envoi vers passerelle",
      description: "PC-A envoie le paquet à sa passerelle par défaut (Routeur A)",
      activeElements: ["H1", "R1"],
    },
    {
      title: "Routage par R1",
      description: "Routeur A consulte sa table et détermine que le paquet doit aller vers Routeur B",
      activeElements: ["R1", "R2"],
    },
    {
      title: "Transit par R2",
      description: "Routeur B reçoit le paquet et le transmet vers Routeur C",
      activeElements: ["R2", "R3"],
    },
    {
      title: "Livraison finale",
      description: "Routeur C livre le paquet à PC-B sur son réseau local",
      activeElements: ["R3", "H2"],
    },
  ]

  const startSimulation = () => {
    setIsRunning(true)
    setCurrentStep(0)

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= routingSteps.length - 1) {
          setIsRunning(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 2000)
  }

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsRunning(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Simulateur de routage</span>
          <div className="space-x-2">
            <Button onClick={startSimulation} disabled={isRunning} size="sm">
              <Play className="h-4 w-4 mr-1" />
              Démarrer
            </Button>
            <Button onClick={resetSimulation} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Diagramme réseau */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <svg width="600" height="250" className="w-full">
            {/* Connexions */}
            {network.connections.map((conn, i) => {
              const fromRouter = network.routers.find((r) => r.id === conn.from)
              const toRouter = network.routers.find((r) => r.id === conn.to)
              if (!fromRouter || !toRouter) return null

              return (
                <g key={i}>
                  <line
                    x1={fromRouter.x + 25}
                    y1={fromRouter.y + 25}
                    x2={toRouter.x + 25}
                    y2={toRouter.y + 25}
                    stroke="#666"
                    strokeWidth="2"
                  />
                  <text
                    x={(fromRouter.x + toRouter.x) / 2 + 25}
                    y={(fromRouter.y + toRouter.y) / 2 + 15}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {conn.network}
                  </text>
                </g>
              )
            })}

            {/* Routeurs */}
            {network.routers.map((router) => (
              <g key={router.id}>
                <rect
                  x={router.x}
                  y={router.y}
                  width="50"
                  height="50"
                  rx="5"
                  className={`${
                    routingSteps[currentStep]?.activeElements.includes(router.id) ? "fill-blue-500" : "fill-gray-300"
                  } transition-colors duration-500`}
                />
                <text x={router.x + 25} y={router.y + 30} textAnchor="middle" className="text-xs fill-white font-bold">
                  {router.id}
                </text>
                <text x={router.x + 25} y={router.y - 5} textAnchor="middle" className="text-xs fill-gray-700">
                  {router.name}
                </text>
              </g>
            ))}

            {/* Hôtes */}
            {network.hosts.map((host) => (
              <g key={host.id}>
                <circle
                  cx={host.x + 15}
                  cy={host.y + 15}
                  r="15"
                  className={`${
                    routingSteps[currentStep]?.activeElements.includes(host.id) ? "fill-green-500" : "fill-gray-400"
                  } transition-colors duration-500`}
                />
                <text x={host.x + 15} y={host.y + 20} textAnchor="middle" className="text-xs fill-white font-bold">
                  PC
                </text>
                <text x={host.x + 15} y={host.y - 5} textAnchor="middle" className="text-xs fill-gray-700">
                  {host.name}
                </text>
                <text x={host.x + 15} y={host.y + 45} textAnchor="middle" className="text-xs fill-gray-600">
                  {host.ip}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Étapes de simulation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Étapes du routage</h4>
            <Badge variant="outline">
              Étape {currentStep + 1} / {routingSteps.length}
            </Badge>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {currentStep + 1}
              </div>
              <h5 className="font-semibold">{routingSteps[currentStep]?.title}</h5>
            </div>
            <p className="text-gray-700 text-sm">{routingSteps[currentStep]?.description}</p>
          </div>

          {/* Barre de progression */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progression</span>
              <span>{Math.round(((currentStep + 1) / routingSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / routingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
