# Composants Networking Spécialisés

Ces composants sont spécifiquement conçus pour le contenu pédagogique sur les réseaux informatiques. 
Ils remplacent l'approche générique par des éléments adaptés au domaine.

## 🎯 Philosophie

Au lieu de créer des composants génériques (InfoBlock, CodeBlock...), ces composants sont **spécialisés pour le contenu réseau** :
- Plus faciles à utiliser dans le contexte spécifique
- Contenu pré-structuré et adapté
- Visuels et données pertinents pour les réseaux
- Moins de configuration, plus d'efficacité

## 📦 Composants disponibles

### NetworkDefinition
Explique ce qu'est un réseau informatique avec structure claire.

```tsx
import { NetworkDefinition } from '@/components/networking'

<NetworkDefinition />
```

### NetworkTypes  
Présente les types de réseaux (LAN, WAN, MAN) sous forme de cartes.

```tsx
import { NetworkTypes } from '@/components/networking'

<NetworkTypes />
```

### NetworkEquipment
Affiche les équipements réseau essentiels avec leurs caractéristiques.

```tsx
import { NetworkEquipment } from '@/components/networking'

<NetworkEquipment />
```

### ProtocolTable
Tableau des protocoles courants avec ports et niveau de sécurité.

```tsx
import { ProtocolTable } from '@/components/networking'

<ProtocolTable />
```

### IPAddressExplainer
Explique les adresses IP avec exemples et différences privé/public.

```tsx
import { IPAddressExplainer } from '@/components/networking'

<IPAddressExplainer />
```

### SimpleNetworkDiagram
Schéma visuel d'un réseau local simple.

```tsx
import { SimpleNetworkDiagram } from '@/components/networking'

<SimpleNetworkDiagram />
```

### EthernetVsWifi
Tableau comparatif Ethernet vs WiFi sur différents critères.

```tsx
import { EthernetVsWifi } from '@/components/networking'

<EthernetVsWifi />
```

## 🏗️ Structure d'une leçon type

Voir l'exemple concret dans `/courses/intro-reseaux/lessons/qu-est-ce-qu-un-reseau/page.tsx` :

```tsx
import { 
  NetworkDefinition,
  NetworkTypes,
  NetworkEquipment,
  ProtocolTable,
  IPAddressExplainer,
  SimpleNetworkDiagram,
  EthernetVsWifi
} from '@/components/networking'

export default function MaLecon() {
  return (
    <div className="space-y-12">
      {/* En-tête avec objectifs */}
      
      {/* Section 1 */}
      <section>
        <h2>1. Définition</h2>
        <NetworkDefinition />
      </section>

      {/* Section 2 */}
      <section>
        <h2>2. Types de réseaux</h2>
        <NetworkTypes />
      </section>

      {/* etc... */}
    </div>
  )
}
```

## ✅ Avantages de cette approche

1. **Contenu pré-fait** : Pas besoin de retaper les définitions de base
2. **Cohérence visuelle** : Tous les composants suivent le même design
3. **Facilité d'usage** : Un seul composant = une section complète
4. **Maintenance simple** : Modifier un composant = toutes les leçons mises à jour
5. **Spécialisé** : Adapté au domaine des réseaux, pas générique

## 🔧 Extension

Pour ajouter un nouveau composant networking :

1. Créer la fonction dans `NetworkingComponents.tsx`
2. L'exporter dans `index.ts`
3. L'utiliser dans vos leçons

Exemple pour un composant sur les VLANs :

```tsx
export function VLANExplainer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Les VLANs (Virtual LANs)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Contenu spécialisé VLAN */}
      </CardContent>
    </Card>
  )
}
```

## 🎨 Personnalisation

Chaque composant peut être personnalisé via className :

```tsx
<NetworkDefinition className="my-custom-style" />
```

Les composants utilisent Tailwind CSS et s'adaptent au thème sombre/clair automatiquement. 