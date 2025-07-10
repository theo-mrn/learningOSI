"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/sections/Header"
import { Footer } from "@/components/sections/Footer"
import { 
  Globe, 
  Shield, 
  Server, 
  Cloud, 
  Code, 
  Activity,
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Search,
  Filter,
  ChevronRight,
  Play,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { coursesData, getCourseProgress, type CourseCategory } from "@/lib/courses-data"

// Mapping des icônes
const iconMap = {
  Globe,
  Shield,
  Server,
  Cloud,
  Code,
  Activity
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const categories = coursesData
  const allCourses = categories.flatMap(cat => cat.courses)

  // Filtrage des cours
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'debutant': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'intermediaire': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'avance': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'expert': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'debutant': return 'Débutant'
      case 'intermediaire': return 'Intermédiaire'
      case 'avance': return 'Avancé'
      case 'expert': return 'Expert'
      default: return difficulty
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 border-b">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Catalogue de{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Cours
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Découvrez tous nos cours organisés par catégories pour apprendre les réseaux et l'informatique étape par étape
              </p>
              
              {/* Statistiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{categories.length}</div>
                  <div className="text-sm text-muted-foreground">Catégories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{allCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Cours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {allCourses.reduce((total, course) => total + course.lessons.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Leçons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(allCourses.reduce((total, course) => total + course.duration, 0) / 60)}h
                  </div>
                  <div className="text-sm text-muted-foreground">Contenu</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filtres et Recherche */}
        <section className="py-8 border-b bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Recherche */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtres */}
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">Tous niveaux</option>
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation par Onglets */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Tous
                </TabsTrigger>
                {categories.map(category => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                  return (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      <span className="hidden sm:inline">{category.title}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {/* Vue Tous les cours */}
              <TabsContent value="all">
                <CoursesGrid courses={filteredCourses} getDifficultyColor={getDifficultyColor} getDifficultyLabel={getDifficultyLabel} />
              </TabsContent>

              {/* Vue par catégorie */}
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <CategoryView category={category} getDifficultyColor={getDifficultyColor} getDifficultyLabel={getDifficultyLabel} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Composant pour afficher une grille de cours
function CoursesGrid({ 
  courses, 
  getDifficultyColor, 
  getDifficultyLabel 
}: { 
  courses: any[], 
  getDifficultyColor: (difficulty: string) => string,
  getDifficultyLabel: (difficulty: string) => string
}) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Aucun cours trouvé</h3>
        <p className="text-muted-foreground">Essayez de modifier vos filtres de recherche</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard 
          key={course.id} 
          course={course} 
          index={index}
          getDifficultyColor={getDifficultyColor}
          getDifficultyLabel={getDifficultyLabel}
        />
      ))}
    </div>
  )
}

// Composant pour afficher une catégorie complète
function CategoryView({ 
  category, 
  getDifficultyColor, 
  getDifficultyLabel 
}: { 
  category: CourseCategory,
  getDifficultyColor: (difficulty: string) => string,
  getDifficultyLabel: (difficulty: string) => string
}) {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap]

  return (
    <div className="space-y-8">
      {/* En-tête de catégorie */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-2xl">
            {IconComponent && <IconComponent className="h-12 w-12 text-primary" />}
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
      </div>



      {/* Cours de la catégorie */}
      {category.courses.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Cours disponibles</h3>
          <CoursesGrid 
            courses={category.courses} 
            getDifficultyColor={getDifficultyColor}
            getDifficultyLabel={getDifficultyLabel}
          />
        </div>
      )}

      {category.courses.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Cours bientôt disponibles</h3>
          <p className="text-muted-foreground">Les cours pour cette catégorie sont en cours de développement</p>
        </div>
      )}
    </div>
  )
}

// Composant pour une carte de cours
function CourseCard({ 
  course, 
  index,
  getDifficultyColor,
  getDifficultyLabel
}: { 
  course: any, 
  index: number,
  getDifficultyColor: (difficulty: string) => string,
  getDifficultyLabel: (difficulty: string) => string
}) {
  const progress = getCourseProgress(course.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            <Badge className={`${getDifficultyColor(course.difficulty)} border`}>
              {getDifficultyLabel(course.difficulty)}
            </Badge>
            {progress > 0 && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                {progress}%
              </div>
            )}
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* Informations du cours */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {Math.round(course.duration / 60)}h
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {course.lessons.length} leçons
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Barre de progression */}
            {progress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progression</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Bouton d'action */}
            <Link href={`/courses/${course.id}`} className="block">
              <Button className="w-full group">
                {progress > 0 ? 'Continuer' : 'Commencer'}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
