import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Wifi, 
  Globe, 
  Server, 
  Router, 
  Monitor,
  Cable,
  Shield,
  Zap,
  Network,
  Database,
  Check,
  X,
  ArrowRight,
  ArrowDown
} from 'lucide-react'

// Composant pour définir ce qu'est un réseau
export function NetworkDefinition() {
  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Network className="h-6 w-6" />
          Qu'est-ce qu'un réseau informatique ?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">
          Un réseau informatique est un ensemble d'équipements reliés entre eux 
          pour échanger des informations et partager des ressources.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">✅ Permet de :</h4>
            <ul className="space-y-1 text-sm">
              <li>• Partager des fichiers</li>
              <li>• Communiquer (email, chat)</li>
              <li>• Accéder à Internet</li>
              <li>• Partager des imprimantes</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">🔧 Composé de :</h4>
            <ul className="space-y-1 text-sm">
              <li>• Ordinateurs/appareils</li>
              <li>• Câbles ou WiFi</li>
              <li>• Routeurs et switches</li>
              <li>• Protocoles de communication</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Composant pour les types de réseaux
export function NetworkTypes() {
  const networkTypes = [
    {
      name: "LAN",
      fullName: "Local Area Network",
      description: "Réseau local d'une maison ou bureau",
      range: "Quelques mètres à 1 km",
      icon: Monitor,
      color: "green"
    },
    {
      name: "WAN", 
      fullName: "Wide Area Network",
      description: "Réseau étendu comme Internet",
      range: "Villes, pays, continents",
      icon: Globe,
      color: "blue"
    },
    {
      name: "MAN",
      fullName: "Metropolitan Area Network", 
      description: "Réseau métropolitain d'une ville",
      range: "10 à 100 km",
      icon: Router,
      color: "purple"
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Types de réseaux</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {networkTypes.map((type, index) => (
          <motion.div
            key={type.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <type.icon className={`h-5 w-5 text-${type.color}-500`} />
                  {type.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{type.fullName}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{type.description}</p>
                <Badge variant="outline" className="text-xs">
                  Portée: {type.range}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Composant pour les équipements réseau
export function NetworkEquipment() {
  const equipment = [
    {
      name: "Switch",
      description: "Relie plusieurs appareils dans un réseau local",
      icon: Database,
      ports: "4, 8, 16, 24, 48 ports",
      level: "Couche 2 (Liaison)"
    },
    {
      name: "Routeur", 
      description: "Connecte différents réseaux entre eux",
      icon: Router,
      ports: "2-4 ports WAN/LAN",
      level: "Couche 3 (Réseau)"
    },
    {
      name: "Point d'accès WiFi",
      description: "Permet la connexion sans fil",
      icon: Wifi,
      ports: "1 port Ethernet",
      level: "Couche 2 (Liaison)"
    },
    {
      name: "Pare-feu",
      description: "Protège le réseau des intrusions",
      icon: Shield,
      ports: "Multiple interfaces",
      level: "Couches 3-7"
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Équipements réseau essentiels</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {equipment.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="outline">{item.ports}</Badge>
                      <Badge variant="secondary">{item.level}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Composant pour les protocoles
export function ProtocolTable() {
  const protocols = [
    { name: "HTTP", port: "80", description: "Navigation web", secure: false },
    { name: "HTTPS", port: "443", description: "Navigation web sécurisée", secure: true },
    { name: "FTP", port: "21", description: "Transfert de fichiers", secure: false },
    { name: "SSH", port: "22", description: "Connexion sécurisée", secure: true },
    { name: "DNS", port: "53", description: "Résolution de noms", secure: false },
    { name: "DHCP", port: "67/68", description: "Attribution IP automatique", secure: false }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protocoles courants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Protocole</th>
                <th className="text-left p-2">Port</th>
                <th className="text-left p-2">Description</th>
                <th className="text-center p-2">Sécurisé</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((protocol, index) => (
                <motion.tr 
                  key={protocol.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-muted/50"
                >
                  <td className="p-2 font-mono font-semibold">{protocol.name}</td>
                  <td className="p-2 font-mono">{protocol.port}</td>
                  <td className="p-2">{protocol.description}</td>
                  <td className="p-2 text-center">
                    {protocol.secure ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Composant pour les adresses IP
export function IPAddressExplainer() {
  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-300">
            Adresse IP : L'identifiant unique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Chaque appareil sur un réseau a une adresse IP unique, 
              comme une adresse postale pour recevoir des données.
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-blue-600">
                  192.168.1.100
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Exemple d'adresse IP
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">📍 Adresses privées</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div>• 192.168.x.x</div>
                  <div>• 10.x.x.x</div>
                  <div>• 172.16-31.x.x</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🌐 Adresses publiques</h4>
                <div className="space-y-1 text-sm">
                  <div>• Visibles sur Internet</div>
                  <div>• Uniques mondialement</div>
                  <div>• Fournies par le FAI</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Composant pour schéma réseau simple
export function SimpleNetworkDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schéma d'un réseau local simple</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-8 p-6">
          {/* Internet */}
          <div className="flex items-center gap-2 text-blue-600">
            <Globe className="h-8 w-8" />
            <span className="font-semibold">Internet</span>
          </div>
          
          <ArrowDown className="h-6 w-6 text-gray-400" />
          
          {/* Routeur */}
          <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
            <Router className="h-6 w-6 text-purple-600" />
            <span className="font-semibold">Routeur</span>
          </div>
          
          <ArrowDown className="h-6 w-6 text-gray-400" />
          
          {/* Switch */}
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
            <Database className="h-6 w-6 text-green-600" />
            <span className="font-semibold">Switch</span>
          </div>
          
          {/* Appareils */}
          <div className="flex gap-8 mt-4">
            <div className="flex flex-col items-center gap-2">
              <Monitor className="h-6 w-6 text-gray-600" />
              <span className="text-sm">PC 1</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Monitor className="h-6 w-6 text-gray-600" />
              <span className="text-sm">PC 2</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Wifi className="h-6 w-6 text-orange-600" />
              <span className="text-sm">WiFi</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Composant pour comparaison Ethernet vs WiFi
export function EthernetVsWifi() {
  const comparison = [
    {
      aspect: "Vitesse",
      ethernet: "Jusqu'à 10 Gbps",
      wifi: "Jusqu'à 1-2 Gbps",
      winner: "ethernet"
    },
    {
      aspect: "Stabilité", 
      ethernet: "Très stable",
      wifi: "Variable selon distance",
      winner: "ethernet"
    },
    {
      aspect: "Mobilité",
      ethernet: "Aucune (câble)",
      wifi: "Totale dans la zone",
      winner: "wifi"
    },
    {
      aspect: "Sécurité",
      ethernet: "Très sécurisé", 
      wifi: "Sécurisé si configuré",
      winner: "ethernet"
    },
    {
      aspect: "Installation",
      ethernet: "Câblage nécessaire",
      wifi: "Simple et rapide", 
      winner: "wifi"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ethernet vs WiFi : Que choisir ?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Critère</th>
                <th className="text-center p-3">
                  <div className="flex items-center justify-center gap-2">
                    <Cable className="h-4 w-4" />
                    Ethernet
                  </div>
                </th>
                <th className="text-center p-3">
                  <div className="flex items-center justify-center gap-2">
                    <Wifi className="h-4 w-4" />
                    WiFi
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <tr key={row.aspect} className="border-b">
                  <td className="p-3 font-semibold">{row.aspect}</td>
                  <td className={`p-3 text-center ${row.winner === 'ethernet' ? 'bg-green-50 dark:bg-green-950/30 font-semibold' : ''}`}>
                    {row.ethernet}
                  </td>
                  <td className={`p-3 text-center ${row.winner === 'wifi' ? 'bg-green-50 dark:bg-green-950/30 font-semibold' : ''}`}>
                    {row.wifi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <p className="text-sm">
            <strong>💡 Conseil :</strong> Utilisez Ethernet pour les postes fixes qui nécessitent 
            stabilité et performance, WiFi pour la mobilité et les appareils temporaires.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 