"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Router, Globe, Shield, Zap, BookOpen, Play, Brain } from "lucide-react"
import IPCalculator from "@/components/ip-calculator"
import RoutingSimulator from "@/components/routing-simulator"
import PacketVisualizer from "@/components/packet-visualizer"
import OSILayerDiagram from "@/components/osi-layer-diagram"
import InteractiveQuiz from "@/components/interactive-quiz"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "Vue d'ensemble", icon: BookOpen },
    { id: "addressing", title: "Adressage IP", icon: Network },
    { id: "routing", title: "Routage", icon: Router },
    { id: "protocols", title: "Protocoles", icon: Globe },
    { id: "subnetting", title: "Sous-réseaux", icon: Shield },
    { id: "interactive", title: "Outils interactifs", icon: Play },
    { id: "quiz", title: "Quiz", icon: Brain },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Couche 3 OSI</h1>
                <p className="text-sm text-gray-600">Couche Réseau - Network Layer</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Niveau Intermédiaire
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {section.title}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Introduction à la Couche 3 - Couche Réseau</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      La couche 3 du modèle OSI, appelée <strong>couche réseau</strong> (Network Layer), est responsable
                      du routage des paquets de données entre différents réseaux. Elle détermine le meilleur chemin pour
                      acheminer les données de la source vers la destination.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">Fonctions principales :</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-800">
                        <li>Adressage logique (adresses IP)</li>
                        <li>Routage des paquets</li>
                        <li>Fragmentation et réassemblage</li>
                        <li>Contrôle de congestion</li>
                        <li>Gestion des erreurs</li>
                      </ul>
                    </div>

                    <OSILayerDiagram />
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                        Protocoles principaux
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">IP (Internet Protocol)</span>
                          <Badge>IPv4/IPv6</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">ICMP</span>
                          <Badge variant="secondary">Contrôle</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">ARP</span>
                          <Badge variant="outline">Résolution</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Router className="h-5 w-5 mr-2 text-green-500" />
                        Équipements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">Routeurs</span>
                          <Badge>Niveau 3</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">Commutateurs L3</span>
                          <Badge variant="secondary">Hybride</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">Pare-feu</span>
                          <Badge variant="outline">Sécurité</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "addressing" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Network className="h-5 w-5" />
                      <span>Adressage IP - Fondamentaux</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs defaultValue="ipv4" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="ipv4">IPv4</TabsTrigger>
                        <TabsTrigger value="ipv6">IPv6</TabsTrigger>
                      </TabsList>

                      <TabsContent value="ipv4" className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-lg mb-3">Adresses IPv4</h4>
                          <p className="text-gray-700 mb-4">
                            Une adresse IPv4 est composée de 32 bits, représentée par 4 octets séparés par des points.
                          </p>

                          <div className="bg-white p-4 rounded border font-mono text-center text-lg">192.168.1.100</div>

                          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                            <div className="bg-red-100 p-2 rounded">
                              <div className="font-bold">192</div>
                              <div className="text-xs">11000000</div>
                            </div>
                            <div className="bg-green-100 p-2 rounded">
                              <div className="font-bold">168</div>
                              <div className="text-xs">10101000</div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded">
                              <div className="font-bold">1</div>
                              <div className="text-xs">00000001</div>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded">
                              <div className="font-bold">100</div>
                              <div className="text-xs">01100100</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Classe A</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <strong>Plage :</strong> 1.0.0.0 - 126.255.255.255
                                </div>
                                <div>
                                  <strong>Masque :</strong> 255.0.0.0 (/8)
                                </div>
                                <div>
                                  <strong>Hôtes :</strong> 16,777,214
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Classe B</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <strong>Plage :</strong> 128.0.0.0 - 191.255.255.255
                                </div>
                                <div>
                                  <strong>Masque :</strong> 255.255.0.0 (/16)
                                </div>
                                <div>
                                  <strong>Hôtes :</strong> 65,534
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Classe C</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <strong>Plage :</strong> 192.0.0.0 - 223.255.255.255
                                </div>
                                <div>
                                  <strong>Masque :</strong> 255.255.255.0 (/24)
                                </div>
                                <div>
                                  <strong>Hôtes :</strong> 254
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="ipv6" className="space-y-4">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-lg mb-3">Adresses IPv6</h4>
                          <p className="text-gray-700 mb-4">
                            IPv6 utilise des adresses de 128 bits, représentées en hexadécimal et séparées par des
                            deux-points.
                          </p>

                          <div className="bg-white p-4 rounded border font-mono text-center text-lg">
                            2001:0db8:85a3:0000:0000:8a2e:0370:7334
                          </div>

                          <div className="mt-4 space-y-2">
                            <div className="text-sm">
                              <strong>Forme compressée :</strong>
                            </div>
                            <div className="bg-white p-2 rounded border font-mono">2001:db8:85a3::8a2e:370:7334</div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "routing" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Router className="h-5 w-5" />
                      <span>Routage - Acheminement des paquets</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">Principe du routage</h4>
                      <p className="text-gray-700 mb-4">
                        Le routage est le processus de sélection du meilleur chemin dans un réseau pour acheminer les
                        paquets de données de la source vers la destination.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded border">
                          <h5 className="font-medium mb-2">Routage statique</h5>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Routes configurées manuellement</li>
                            <li>• Adapté aux petits réseaux</li>
                            <li>• Contrôle total de l'administrateur</li>
                            <li>• Pas de surcharge processeur</li>
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded border">
                          <h5 className="font-medium mb-2">Routage dynamique</h5>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Routes apprises automatiquement</li>
                            <li>• Adapté aux grands réseaux</li>
                            <li>• Adaptation aux changements</li>
                            <li>• Utilise des protocoles (RIP, OSPF, BGP)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Table de routage</h4>
                      <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Réseau de destination</th>
                              <th className="text-left p-2">Masque</th>
                              <th className="text-left p-2">Passerelle</th>
                              <th className="text-left p-2">Interface</th>
                              <th className="text-left p-2">Métrique</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono">
                            <tr className="border-b">
                              <td className="p-2">192.168.1.0</td>
                              <td className="p-2">255.255.255.0</td>
                              <td className="p-2">0.0.0.0</td>
                              <td className="p-2">eth0</td>
                              <td className="p-2">1</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2">10.0.0.0</td>
                              <td className="p-2">255.0.0.0</td>
                              <td className="p-2">192.168.1.1</td>
                              <td className="p-2">eth0</td>
                              <td className="p-2">2</td>
                            </tr>
                            <tr>
                              <td className="p-2">0.0.0.0</td>
                              <td className="p-2">0.0.0.0</td>
                              <td className="p-2">192.168.1.1</td>
                              <td className="p-2">eth0</td>
                              <td className="p-2">1</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <RoutingSimulator />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "protocols" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Protocoles de la couche 3</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="ip" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="ip">IP</TabsTrigger>
                        <TabsTrigger value="icmp">ICMP</TabsTrigger>
                        <TabsTrigger value="arp">ARP</TabsTrigger>
                        <TabsTrigger value="dhcp">DHCP</TabsTrigger>
                      </TabsList>

                      <TabsContent value="ip" className="space-y-4">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-lg mb-3">Internet Protocol (IP)</h4>
                          <p className="text-gray-700 mb-4">
                            Le protocole IP est responsable de l'adressage et du routage des paquets dans un réseau. Il
                            fournit un service de livraison sans connexion.
                          </p>

                          <div className="bg-white p-4 rounded border">
                            <h5 className="font-medium mb-3">Structure d'un paquet IP</h5>
                            <div className="grid grid-cols-8 gap-1 text-xs text-center">
                              <div className="bg-red-100 p-2 rounded">Version</div>
                              <div className="bg-orange-100 p-2 rounded">IHL</div>
                              <div className="bg-yellow-100 p-2 rounded">Type of Service</div>
                              <div className="bg-green-100 p-2 rounded col-span-2">Total Length</div>
                              <div className="bg-blue-100 p-2 rounded col-span-2">Identification</div>
                              <div className="bg-purple-100 p-2 rounded">Flags</div>
                              <div className="bg-pink-100 p-2 rounded col-span-2">Fragment Offset</div>
                              <div className="bg-indigo-100 p-2 rounded">TTL</div>
                              <div className="bg-cyan-100 p-2 rounded">Protocol</div>
                              <div className="bg-teal-100 p-2 rounded col-span-3">Header Checksum</div>
                              <div className="bg-lime-100 p-2 rounded col-span-4">Source Address</div>
                              <div className="bg-emerald-100 p-2 rounded col-span-4">Destination Address</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="icmp" className="space-y-4">
                        <div className="bg-red-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-lg mb-3">Internet Control Message Protocol (ICMP)</h4>
                          <p className="text-gray-700 mb-4">
                            ICMP est utilisé pour envoyer des messages d'erreur et des informations opérationnelles sur
                            la livraison des paquets IP.
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded border">
                              <h5 className="font-medium mb-2">Messages d'erreur</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Destination Unreachable</li>
                                <li>• Time Exceeded</li>
                                <li>• Parameter Problem</li>
                                <li>• Source Quench</li>
                              </ul>
                            </div>

                            <div className="bg-white p-4 rounded border">
                              <h5 className="font-medium mb-2">Messages informatifs</h5>
                              <ul className="text-sm space-y-1">
                                <li>• Echo Request/Reply (ping)</li>
                                <li>• Timestamp Request/Reply</li>
                                <li>• Information Request/Reply</li>
                                <li>• Address Mask Request/Reply</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="arp" className="space-y-4">
                        <div className="bg-green-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-lg mb-3">Address Resolution Protocol (ARP)</h4>
                          <p className="text-gray-700 mb-4">
                            ARP permet de résoudre une adresse IP en adresse MAC (physique) dans un réseau local
                            Ethernet.
                          </p>

                          <div className="bg-white p-4 rounded border">
                            <h5 className="font-medium mb-3">Processus ARP</h5>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                  1
                                </div>
                                <span className="text-sm">L'hôte A veut communiquer avec l'hôte B (IP connue)</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                  2
                                </div>
                                <span className="text-sm">A diffuse une requête ARP : "Qui a l'IP x.x.x.x ?"</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                  3
                                </div>
                                <span className="text-sm">B répond avec son adresse MAC</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                  4
                                </div>
                                <span className="text-sm">A stocke l'association IP-MAC dans sa table ARP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="dhcp" className="space-y-4">
                        <div className="bg-purple-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-lg mb-3">Dynamic Host Configuration Protocol (DHCP)</h4>
                          <p className="text-gray-700 mb-4">
                            DHCP permet l'attribution automatique d'adresses IP et d'autres paramètres de configuration
                            réseau aux clients.
                          </p>

                          <div className="bg-white p-4 rounded border">
                            <h5 className="font-medium mb-3">Processus DHCP (DORA)</h5>
                            <div className="grid grid-cols-4 gap-2 text-center text-sm">
                              <div className="bg-yellow-100 p-3 rounded">
                                <div className="font-bold">DISCOVER</div>
                                <div className="text-xs mt-1">Client cherche serveur</div>
                              </div>
                              <div className="bg-blue-100 p-3 rounded">
                                <div className="font-bold">OFFER</div>
                                <div className="text-xs mt-1">Serveur propose IP</div>
                              </div>
                              <div className="bg-green-100 p-3 rounded">
                                <div className="font-bold">REQUEST</div>
                                <div className="text-xs mt-1">Client demande IP</div>
                              </div>
                              <div className="bg-purple-100 p-3 rounded">
                                <div className="font-bold">ACK</div>
                                <div className="text-xs mt-1">Serveur confirme</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "subnetting" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Sous-réseaux (Subnetting)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">Concept du sous-réseau</h4>
                      <p className="text-gray-700 mb-4">
                        Le sous-réseau permet de diviser un réseau IP en plusieurs segments plus petits, améliorant
                        ainsi la gestion, la sécurité et les performances.
                      </p>

                      <div className="bg-white p-4 rounded border">
                        <h5 className="font-medium mb-3">Exemple : Réseau 192.168.1.0/24</h5>
                        <div className="space-y-2 font-mono text-sm">
                          <div className="flex justify-between">
                            <span>Adresse réseau :</span>
                            <span className="bg-blue-100 px-2 py-1 rounded">192.168.1.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Masque de sous-réseau :</span>
                            <span className="bg-green-100 px-2 py-1 rounded">255.255.255.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Première adresse utilisable :</span>
                            <span className="bg-yellow-100 px-2 py-1 rounded">192.168.1.1</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dernière adresse utilisable :</span>
                            <span className="bg-yellow-100 px-2 py-1 rounded">192.168.1.254</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Adresse de diffusion :</span>
                            <span className="bg-red-100 px-2 py-1 rounded">192.168.1.255</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Notation CIDR</h4>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          <div className="flex justify-between items-center">
                            <span>/24</span>
                            <span className="text-sm text-gray-600">255.255.255.0</span>
                            <Badge>254 hôtes</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>/25</span>
                            <span className="text-sm text-gray-600">255.255.255.128</span>
                            <Badge>126 hôtes</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>/26</span>
                            <span className="text-sm text-gray-600">255.255.255.192</span>
                            <Badge>62 hôtes</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>/27</span>
                            <span className="text-sm text-gray-600">255.255.255.224</span>
                            <Badge>30 hôtes</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>/28</span>
                            <span className="text-sm text-gray-600">255.255.255.240</span>
                            <Badge>14 hôtes</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Calcul rapide</h4>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="space-y-3 text-sm">
                            <div>
                              <strong>Nombre d'hôtes :</strong>
                              <div className="font-mono bg-white p-2 rounded mt-1">2^(32-masque) - 2</div>
                            </div>
                            <div>
                              <strong>Nombre de sous-réseaux :</strong>
                              <div className="font-mono bg-white p-2 rounded mt-1">2^(bits empruntés)</div>
                            </div>
                            <div>
                              <strong>Incrément :</strong>
                              <div className="font-mono bg-white p-2 rounded mt-1">256 - dernier octet du masque</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <IPCalculator />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "interactive" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Outils interactifs</span>
                    </CardTitle>
                    <CardDescription>Explorez les concepts de la couche 3 avec ces outils interactifs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="calculator" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="calculator">Calculateur IP</TabsTrigger>
                        <TabsTrigger value="simulator">Simulateur</TabsTrigger>
                        <TabsTrigger value="visualizer">Visualiseur</TabsTrigger>
                      </TabsList>

                      <TabsContent value="calculator">
                        <IPCalculator />
                      </TabsContent>

                      <TabsContent value="simulator">
                        <RoutingSimulator />
                      </TabsContent>

                      <TabsContent value="visualizer">
                        <PacketVisualizer />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "quiz" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Quiz interactif</span>
                    </CardTitle>
                    <CardDescription>Testez vos connaissances sur la couche 3 du modèle OSI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InteractiveQuiz />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
