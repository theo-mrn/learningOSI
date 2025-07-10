# Guide d'utilisation des Composants de Contenu

Ces composants réutilisables ont été créés pour structurer et présenter le contenu pédagogique de manière cohérente et attrayante.

## 🎨 Variantes de couleurs disponibles

Tous les composants supportent les variantes suivantes :
- `blue` - Information générale (par défaut)
- `green` - Succès, validation, conseils positifs
- `yellow` - Attention, avertissements
- `red` - Erreurs, points critiques
- `purple` - Contenu avancé, fonctionnalités spéciales
- `indigo` - Astuces, conseils techniques
- `pink` - Citations, témoignages
- `gray` - Documentation, références

## 📋 Composants disponibles

### 1. InfoBlock
Bloc d'information polyvalent avec icône et titre.

```tsx
import { InfoBlock } from '@/components/content/ContentBlocks'

<InfoBlock variant="blue" title="Titre optionnel" icon={<CustomIcon />}>
  <p>Contenu de l'information...</p>
</InfoBlock>
```

### 2. CodeBlock
Affichage de code avec titre et langage.

```tsx
import { CodeBlock } from '@/components/content/ContentBlocks'

<CodeBlock title="Configuration réseau" language="bash" variant="gray">
{`#!/bin/bash
echo "Configuration réseau"`}
</CodeBlock>
```

### 3. DefinitionBlock
Bloc spécialisé pour les définitions avec terme en gras.

```tsx
import { DefinitionBlock } from '@/components/content/ContentBlocks'

<DefinitionBlock term="TCP" variant="green">
  <p>Transmission Control Protocol...</p>
</DefinitionBlock>
```

### 4. QuoteBlock
Citations avec auteur optionnel et effet visuel spécial.

```tsx
import { QuoteBlock } from '@/components/content/ContentBlocks'

<QuoteBlock author="Expert en réseau">
  Citation inspirante sur les réseaux...
</QuoteBlock>
```

### 5. TipBlock
Conseils avec types prédéfinis (tip, warning, important, note).

```tsx
import { TipBlock } from '@/components/content/ContentBlocks'

<TipBlock type="tip">
  <p>Conseil utile...</p>
</TipBlock>

<TipBlock type="warning">
  <p>Attention importante...</p>
</TipBlock>
```

### 6. StepsBlock
Procédures étape par étape avec numérotation automatique.

```tsx
import { StepsBlock } from '@/components/content/ContentBlocks'

<StepsBlock steps={[
  "Étape 1 : Configuration initiale",
  "Étape 2 : Tests de connectivité",
  "Étape 3 : Validation finale"
]} />
```

### 7. SummaryBlock
Résumé ou récapitulatif dans une carte avec icône.

```tsx
import { SummaryBlock } from '@/components/content/ContentBlocks'

<SummaryBlock title="Points clés">
  <ul>
    <li>Point important 1</li>
    <li>Point important 2</li>
  </ul>
</SummaryBlock>
```

### 8. TimeBlock
Indicateur de durée (lecture, exercice, total).

```tsx
import { TimeBlock } from '@/components/content/ContentBlocks'

<TimeBlock duration="15 min" type="reading" />
<TimeBlock duration="5 min" type="exercise" />
<TimeBlock duration="20 min" type="total" />
```

### 9. SectionTitle
Titres de section avec niveaux hiérarchiques et couleurs.

```tsx
import { SectionTitle } from '@/components/content/ContentBlocks'

<SectionTitle level={1} variant="blue">
  Titre principal
</SectionTitle>

<SectionTitle level={2} variant="green">
  Sous-titre
</SectionTitle>
```

## 🚀 Exemples d'utilisation complète

### Page de cours typique

```tsx
import { 
  SectionTitle, 
  InfoBlock, 
  DefinitionBlock, 
  CodeBlock, 
  TipBlock, 
  StepsBlock, 
  SummaryBlock,
  TimeBlock 
} from '@/components/content'

export default function CoursePage() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4 mb-8">
        <TimeBlock duration="20 min" type="reading" />
        <TimeBlock duration="10 min" type="exercise" />
      </div>

      <SectionTitle level={1} variant="blue">
        Introduction aux Réseaux
      </SectionTitle>

      <InfoBlock variant="blue" title="Objectifs">
        <p>À la fin de ce cours, vous saurez...</p>
      </InfoBlock>

      <DefinitionBlock term="Réseau informatique" variant="green">
        <p>Un réseau informatique est...</p>
      </DefinitionBlock>

      <TipBlock type="tip">
        <p>Conseil pratique...</p>
      </TipBlock>

      <CodeBlock title="Exemple de configuration" language="bash">
        {`sudo ip addr show`}
      </CodeBlock>

      <StepsBlock steps={[
        "Analyser les besoins",
        "Concevoir l'architecture",
        "Implémenter la solution"
      ]} />

      <SummaryBlock>
        <p>Récapitulatif des points essentiels...</p>
      </SummaryBlock>
    </div>
  )
}
```

## 🎯 Bonnes pratiques

### Choix des couleurs
- Utilisez `blue` pour l'information générale
- `green` pour les succès et validations
- `yellow` pour les avertissements non critiques
- `red` pour les erreurs ou points très importants
- `purple` pour le contenu avancé
- `indigo` pour les conseils techniques
- `pink` pour les citations
- `gray` pour les références et documentation

### Structure recommandée
1. **TimeBlock** en début de section
2. **SectionTitle** pour structurer le contenu
3. **InfoBlock** pour les informations importantes
4. **DefinitionBlock** pour les termes techniques
5. **CodeBlock** pour les exemples pratiques
6. **TipBlock** pour les conseils
7. **StepsBlock** pour les procédures
8. **SummaryBlock** en fin de section

### Accessibilité
- Tous les composants sont conçus pour être accessibles
- Les couleurs sont accompagnées d'icônes pour l'identification
- Le contraste est optimisé pour la lisibilité
- Les animations respectent les préférences de mouvement réduit

## 🔧 Personnalisation

Chaque composant accepte une prop `className` pour des personnalisations supplémentaires :

```tsx
<InfoBlock 
  variant="blue" 
  className="my-custom-spacing border-2"
>
  Contenu personnalisé
</InfoBlock>
```

Les composants utilisent Tailwind CSS et peuvent être facilement étendus ou modifiés selon vos besoins spécifiques. 