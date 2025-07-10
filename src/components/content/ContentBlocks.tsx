import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Lightbulb, 
  BookOpen, 
  Code, 
  Quote,
  Star,
  Target,
  Zap,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Types pour les variantes de couleurs
type ColorVariant = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' | 'pink' | 'gray'

interface ContentBlockProps {
  children: ReactNode
  className?: string
}

interface VariantBlockProps extends ContentBlockProps {
  variant?: ColorVariant
  icon?: ReactNode
  title?: string
}

// Bloc d'information avec icône et couleurs
export function InfoBlock({ 
  children, 
  variant = 'blue', 
  icon, 
  title,
  className = '' 
}: VariantBlockProps) {
  const variantClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200',
    green: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-200',
    red: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200',
    purple: 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-200',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-950/30 dark:border-indigo-800 dark:text-indigo-200',
    pink: 'bg-pink-50 border-pink-200 text-pink-800 dark:bg-pink-950/30 dark:border-pink-800 dark:text-pink-200',
    gray: 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-950/30 dark:border-gray-800 dark:text-gray-200'
  }

  const defaultIcons = {
    blue: <Info className="h-5 w-5" />,
    green: <CheckCircle className="h-5 w-5" />,
    yellow: <AlertTriangle className="h-5 w-5" />,
    red: <XCircle className="h-5 w-5" />,
    purple: <Star className="h-5 w-5" />,
    indigo: <Lightbulb className="h-5 w-5" />,
    pink: <Quote className="h-5 w-5" />,
    gray: <BookOpen className="h-5 w-5" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border-l-4 p-4 rounded-r-lg ${variantClasses[variant]} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icon || defaultIcons[variant]}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2">{title}</h4>
          )}
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Bloc de code avec coloration syntaxique
export function CodeBlock({ 
  children, 
  language = 'text',
  title,
  variant = 'gray',
  className = ''
}: VariantBlockProps & { language?: string }) {
  const variantClasses = {
    blue: 'bg-blue-950 border-blue-800',
    green: 'bg-green-950 border-green-800', 
    yellow: 'bg-yellow-950 border-yellow-800',
    red: 'bg-red-950 border-red-800',
    purple: 'bg-purple-950 border-purple-800',
    indigo: 'bg-indigo-950 border-indigo-800',
    pink: 'bg-pink-950 border-pink-800',
    gray: 'bg-gray-950 border-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      {title && (
        <div className="px-4 py-2 border-b border-gray-700 bg-gray-900/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">{title}</span>
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
          </div>
        </div>
      )}
      <div className="p-4">
        <pre className="text-sm text-gray-100 overflow-x-auto">
          <code>{children}</code>
        </pre>
      </div>
    </motion.div>
  )
}

// Bloc de définition
export function DefinitionBlock({ 
  term, 
  children, 
  variant = 'indigo',
  className = ''
}: VariantBlockProps & { term: string }) {
  return (
    <InfoBlock variant={variant} className={className}>
      <div>
        <dt className="font-bold text-lg mb-2">{term}</dt>
        <dd>{children}</dd>
      </div>
    </InfoBlock>
  )
}

// Bloc de citation
export function QuoteBlock({ 
  children, 
  author,
  variant = 'pink',
  className = ''
}: VariantBlockProps & { author?: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`border-l-4 pl-6 py-4 italic bg-gradient-to-r from-transparent to-gray-50/50 dark:to-gray-950/50 ${className}`}
    >
      <div className="text-lg leading-relaxed">
        {children}
      </div>
      {author && (
        <footer className="mt-3 text-sm text-muted-foreground">
          — {author}
        </footer>
      )}
    </motion.blockquote>
  )
}

// Bloc de résumé/récapitulatif
export function SummaryBlock({ 
  children, 
  title = "Résumé",
  variant = 'purple',
  className = ''
}: VariantBlockProps) {
  return (
    <Card className={`border-2 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

// Bloc de conseil/tip
export function TipBlock({ 
  children, 
  type = 'tip',
  className = ''
}: ContentBlockProps & { type?: 'tip' | 'warning' | 'important' | 'note' }) {
  const configs = {
    tip: {
      variant: 'green' as ColorVariant,
      icon: <Lightbulb className="h-5 w-5" />,
      title: 'Conseil'
    },
    warning: {
      variant: 'yellow' as ColorVariant,
      icon: <AlertTriangle className="h-5 w-5" />,
      title: 'Attention'
    },
    important: {
      variant: 'red' as ColorVariant,
      icon: <Zap className="h-5 w-5" />,
      title: 'Important'
    },
    note: {
      variant: 'blue' as ColorVariant,
      icon: <Info className="h-5 w-5" />,
      title: 'Note'
    }
  }

  const config = configs[type]

  return (
    <InfoBlock 
      variant={config.variant}
      icon={config.icon}
      title={config.title}
      className={className}
    >
      {children}
    </InfoBlock>
  )
}

// Bloc d'étapes/procédure
export function StepsBlock({ 
  steps, 
  variant = 'blue',
  className = ''
}: { 
  steps: string[]
  variant?: ColorVariant
  className?: string 
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Procédure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="flex-1">{step}</span>
            </motion.li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

// Bloc de temps de lecture/durée
export function TimeBlock({ 
  duration, 
  type = 'reading',
  className = ''
}: { 
  duration: string
  type?: 'reading' | 'exercise' | 'total'
  className?: string 
}) {
  const icons = {
    reading: <BookOpen className="h-4 w-4" />,
    exercise: <Users className="h-4 w-4" />,
    total: <Clock className="h-4 w-4" />
  }

  const labels = {
    reading: 'Temps de lecture',
    exercise: 'Durée d\'exercice', 
    total: 'Durée totale'
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm ${className}`}>
      {icons[type]}
      <span className="text-muted-foreground">{labels[type]} :</span>
      <span className="font-medium">{duration}</span>
    </div>
  )
}

// Bloc de titre de section
export function SectionTitle({ 
  children, 
  level = 2,
  variant = 'blue',
  className = ''
}: ContentBlockProps & { 
  level?: 1 | 2 | 3 | 4
  variant?: ColorVariant 
}) {
  const variantClasses = {
    blue: 'text-blue-600 border-blue-200',
    green: 'text-green-600 border-green-200',
    yellow: 'text-yellow-600 border-yellow-200',
    red: 'text-red-600 border-red-200',
    purple: 'text-purple-600 border-purple-200',
    indigo: 'text-indigo-600 border-indigo-200',
    pink: 'text-pink-600 border-pink-200',
    gray: 'text-gray-600 border-gray-200'
  }

  const sizes = {
    1: 'text-3xl md:text-4xl',
    2: 'text-2xl md:text-3xl',
    3: 'text-xl md:text-2xl', 
    4: 'text-lg md:text-xl'
  }

  const titleClass = `font-bold border-l-4 pl-4 py-2 ${sizes[level]} ${variantClasses[variant]}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {level === 1 && <h1 className={titleClass}>{children}</h1>}
      {level === 2 && <h2 className={titleClass}>{children}</h2>}
      {level === 3 && <h3 className={titleClass}>{children}</h3>}
      {level === 4 && <h4 className={titleClass}>{children}</h4>}
    </motion.div>
  )
} 