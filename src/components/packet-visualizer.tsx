"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Layers } from "lucide-react"

export default function PacketVisualizer() {
  const [selectedPacket, setSelectedPacket] = useState("icmp")

  const packets = {
    icmp: {
      name: "Paquet ICMP (Ping)",
      layers: [
        {
          name: "Couche Physique",
          color: "bg-purple-100 border-purple-300",
          data: "Signaux électriques/optiques",
        },
        {
          name: "Couche Liaison",
          color: "bg-indigo-100 border-indigo-300",
          data: "MAC Src: 00:1A:2B:3C:4D:5E | MAC Dst: 00:5E:4D:3C:2B:1A | Type: 0x0800",
        },
        {
          name: "Couche Réseau (IP)",
          color: "bg-blue-100 border-blue-500 border-2",
          data: "Version: 4 | IHL: 5 | ToS: 0 | Length: 84 | ID: 12345 | Flags: DF | TTL: 64 | Protocol: 1 | Src: 192.168.1.10 | Dst: 8.8.8.8",
        },
        {
          name: "ICMP",
          color: "bg-green-100 border-green-300",
          data: "Type: 8 (Echo Request) | Code: 0 | Checksum: 0x1234 | ID: 1 | Sequence: 1 | Data: 'Hello World'",
        },
      ],
    },
    tcp: {
      name: "Paquet TCP",
      layers: [
        {
          name: "Couche Physique",
          color: "bg-purple-100 border-purple-300",
          data: "Signaux électriques/optiques",
        },
        {
          name: "Couche Liaison",
          color: "bg-indigo-100 border-indigo-300",
          data: "MAC Src: 00:1A:2B:3C:4D:5E | MAC Dst: 00:5E:4D:3C:2B:1A | Type: 0x0800",
        },
        {
          name: "Couche Réseau (IP)",
          color: "bg-blue-100 border-blue-500 border-2",
          data: "Version: 4 | IHL: 5 | ToS: 0 | Length: 60 | ID: 54321 | Flags: DF | TTL: 64 | Protocol: 6 | Src: 192.168.1.10 | Dst: 93.184.216.34",
        },
        {
          name: "TCP",
          color: "bg-yellow-100 border-yellow-300",
          data: "Src Port: 45678 | Dst Port: 80 | Seq: 1000 | Ack: 0 | Flags: SYN | Window: 65535 | Checksum: 0xABCD",
        },
        {
          name: "Données HTTP",
          color: "bg-red-100 border-red-300",
          data: "GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n",
        },
      ],
    },
    arp: {
      name: "Paquet ARP",
      layers: [
        {
          name: "Couche Physique",
          color: "bg-purple-100 border-purple-300",
          data: "Signaux électriques/optiques",
        },
        {
          name: "Couche Liaison",
          color: "bg-indigo-100 border-indigo-300",
          data: "MAC Src: 00:1A:2B:3C:4D:5E | MAC Dst: FF:FF:FF:FF:FF:FF | Type: 0x0806",
        },
        {
          name: "ARP",
          color: "bg-green-100 border-green-500 border-2",
          data: "Hardware Type: 1 | Protocol Type: 0x0800 | HW Len: 6 | Proto Len: 4 | Opcode: 1 (Request) | Sender MAC: 00:1A:2B:3C:4D:5E | Sender IP: 192.168.1.10 | Target MAC: 00:00:00:00:00:00 | Target IP: 192.168.1.1",
        },
      ],
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Visualiseur de paquets</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedPacket} onValueChange={setSelectedPacket}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="icmp">ICMP</TabsTrigger>
            <TabsTrigger value="tcp">TCP</TabsTrigger>
            <TabsTrigger value="arp">ARP</TabsTrigger>
          </TabsList>

          {Object.entries(packets).map(([key, packet]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{packet.name}</h4>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Layers className="h-3 w-3" />
                  <span>{packet.layers.length} couches</span>
                </Badge>
              </div>

              <div className="space-y-3">
                {packet.layers.map((layer, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${layer.color} transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-sm">{layer.name}</h5>
                      <Badge variant="secondary" className="text-xs">
                        Couche {packet.layers.length - index}
                      </Badge>
                    </div>
                    <div className="bg-white/50 p-3 rounded border font-mono text-xs break-all">{layer.data}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-sm mb-2">Analyse du paquet :</h5>
                <div className="text-sm text-gray-700 space-y-1">
                  {key === "icmp" && (
                    <>
                      <p>• Ce paquet ICMP est utilisé pour tester la connectivité réseau (ping)</p>
                      <p>• La couche 3 (IP) contient les adresses source et destination</p>
                      <p>• Le TTL (Time To Live) limite le nombre de sauts</p>
                    </>
                  )}
                  {key === "tcp" && (
                    <>
                      <p>• Ce paquet TCP établit une connexion HTTP vers un serveur web</p>
                      <p>• Le flag SYN indique le début d'une connexion TCP</p>
                      <p>• La couche 3 route le paquet vers la destination</p>
                    </>
                  )}
                  {key === "arp" && (
                    <>
                      <p>• ARP résout une adresse IP en adresse MAC</p>
                      <p>• Diffusé en broadcast (FF:FF:FF:FF:FF:FF)</p>
                      <p>• Essentiel pour la communication sur le réseau local</p>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
