"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export default function IPCalculator() {
  const [ipAddress, setIpAddress] = useState("192.168.1.100")
  const [subnetMask, setSubnetMask] = useState("255.255.255.0")
  const [results, setResults] = useState<any>(null)

  const calculateSubnet = () => {
    try {
      const ipParts = ipAddress.split(".").map(Number)
      const maskParts = subnetMask.split(".").map(Number)

      // Calcul de l'adresse réseau
      const networkParts = ipParts.map((ip, i) => ip & maskParts[i])
      const networkAddress = networkParts.join(".")

      // Calcul de l'adresse de diffusion
      const broadcastParts = networkParts.map((net, i) => net | (255 - maskParts[i]))
      const broadcastAddress = broadcastParts.join(".")

      // Calcul du nombre d'hôtes
      const hostBits = maskParts.reduce((acc, octet) => {
        return acc + (8 - octet.toString(2).split("1").length + 1)
      }, 0)
      const totalHosts = Math.pow(2, hostBits) - 2

      // Première et dernière adresse utilisable
      const firstUsableParts = [...networkParts]
      firstUsableParts[3] += 1
      const firstUsable = firstUsableParts.join(".")

      const lastUsableParts = [...broadcastParts]
      lastUsableParts[3] -= 1
      const lastUsable = lastUsableParts.join(".")

      // Notation CIDR
      const cidr = maskParts.reduce((acc, octet) => {
        return acc + octet.toString(2).split("1").length - 1
      }, 0)

      setResults({
        networkAddress,
        broadcastAddress,
        firstUsable,
        lastUsable,
        totalHosts,
        cidr: `/${cidr}`,
        subnetMask,
      })
    } catch (error) {
      console.error("Erreur de calcul:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Calculateur de sous-réseau</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ip">Adresse IP</Label>
            <Input
              id="ip"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="192.168.1.100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mask">Masque de sous-réseau</Label>
            <Input
              id="mask"
              value={subnetMask}
              onChange={(e) => setSubnetMask(e.target.value)}
              placeholder="255.255.255.0"
            />
          </div>
        </div>

        <Button onClick={calculateSubnet} className="w-full">
          Calculer
        </Button>

        {results && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold">Résultats :</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="font-medium">Adresse réseau :</span>
                  <span className="font-mono">{results.networkAddress}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="font-medium">Première utilisable :</span>
                  <span className="font-mono">{results.firstUsable}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="font-medium">Dernière utilisable :</span>
                  <span className="font-mono">{results.lastUsable}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="font-medium">Adresse diffusion :</span>
                  <span className="font-mono">{results.broadcastAddress}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="font-medium">Nombre d'hôtes :</span>
                  <span className="font-mono">{results.totalHosts}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-indigo-50 rounded">
                  <span className="font-medium">Notation CIDR :</span>
                  <span className="font-mono">{results.cidr}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
