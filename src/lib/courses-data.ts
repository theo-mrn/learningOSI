export interface Lesson {
  id: string
  title: string
  description: string
  duration: number // en minutes
  type: 'interactive' | 'text' | 'quiz' | 'lab' | 'simulation' | 'video'
  difficulty: 'debutant' | 'intermediaire' | 'avance' | 'expert'
  content?: string
  resources?: string[]
  completed?: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'debutant' | 'intermediaire' | 'avance' | 'expert'
  duration: number // durée totale en minutes
  lessons: Lesson[]
  prerequisites?: string[]
  tags: string[]
  thumbnail?: string
  instructor?: string
  rating?: number
  studentsCount?: number
}

export interface CourseCategory {
  id: string
  title: string
  description: string
  icon: string
  courses: Course[]
}

// Structure des cours
export const coursesData: CourseCategory[] = [
  {
    id: 'reseaux-fondamentaux',
    title: 'Réseaux Fondamentaux',
    description: 'Les bases essentielles des réseaux informatiques',
    icon: 'Globe',
    courses: [
      {
        id: 'intro-reseaux',
        title: 'Introduction aux Réseaux',
        description: 'Les concepts de base des réseaux informatiques',
        category: 'reseaux-fondamentaux',
        difficulty: 'debutant',
        duration: 180,
        tags: ['réseau', 'débutant', 'théorie'],
        instructor: 'À définir',
        lessons: [
          {
            id: 'qu-est-ce-qu-un-reseau',
            title: 'Qu\'est-ce qu\'un réseau ?',
            description: 'Définition et types de réseaux',
            duration: 30,
            type: 'video',
            difficulty: 'debutant'
          },
          {
            id: 'topologies-reseau',
            title: 'Topologies de réseau',
            description: 'Bus, étoile, anneau, maillage',
            duration: 45,
            type: 'interactive',
            difficulty: 'debutant'
          },
          {
            id: 'equipements-reseau',
            title: 'Équipements réseau',
            description: 'Hub, switch, routeur, modem',
            duration: 40,
            type: 'text',
            difficulty: 'debutant'
          },
          {
            id: 'quiz-intro-reseaux',
            title: 'Quiz - Introduction aux réseaux',
            description: 'Testez vos connaissances',
            duration: 15,
            type: 'quiz',
            difficulty: 'debutant'
          }
        ]
      },


      // Nouveau cours : Modèle OSI
      {
        id: 'modele-osi',
        title: 'Modèle OSI',
        description: 'Comprendre le modèle OSI et ses 7 couches',
        category: 'reseaux-fondamentaux',
        difficulty: 'debutant',
        duration: 240,
        tags: ['OSI', 'modèle', 'couches'],
        instructor: 'À définir',
        lessons: [
          {
            id: 'introduction-osi',
            title: 'Introduction au modèle OSI',
            description: 'Vue d\'ensemble du modèle OSI',
            duration: 30,
            type: 'video',
            difficulty: 'debutant'
          },
          {
            id: 'couche-physique',
            title: 'Couche 1 - Physique',
            description: 'Transmission des bits et signaux',
            duration: 30,
            type: 'interactive',
            difficulty: 'debutant'
          },
          {
            id: 'couche-liaison',
            title: 'Couche 2 - Liaison de données',
            description: 'Trames et adressage MAC',
            duration: 30,
            type: 'text',
            difficulty: 'debutant'
          },
          {
            id: 'couche-reseau',
            title: 'Couche 3 - Réseau',
            description: 'Routage et adressage IP',
            duration: 30,
            type: 'interactive',
            difficulty: 'debutant'
          },
          {
            id: 'couche-transport',
            title: 'Couche 4 - Transport',
            description: 'TCP et UDP',
            duration: 30,
            type: 'text',
            difficulty: 'debutant'
          },
          {
            id: 'couche-session',
            title: 'Couche 5 - Session',
            description: 'Gestion des sessions',
            duration: 30,
            type: 'text',
            difficulty: 'debutant'
          },
          {
            id: 'couche-presentation',
            title: 'Couche 6 - Présentation',
            description: 'Encodage et chiffrement',
            duration: 30,
            type: 'text',
            difficulty: 'debutant'
          },
          {
            id: 'couche-application',
            title: 'Couche 7 - Application',
            description: 'Protocoles applicatifs',
            duration: 30,
            type: 'interactive',
            difficulty: 'debutant'
          }
        ]
      }
    ]
  }
]

// Fonctions utilitaires
export function getCategoryById(id: string): CourseCategory | undefined {
  return coursesData.find(category => category.id === id)
}

export function getCourseById(courseId: string): Course | undefined {
  for (const category of coursesData) {
    const course = category.courses.find(c => c.id === courseId)
    if (course) return course
  }
  return undefined
}

export function getLessonById(courseId: string, lessonId: string): Lesson | undefined {
  const course = getCourseById(courseId)
  return course?.lessons.find(lesson => lesson.id === lessonId)
}

export function getCoursesCount(): number {
  return coursesData.reduce((total, category) => total + category.courses.length, 0)
}

export function getLessonsCount(): number {
  return coursesData.reduce((total, category) => 
    total + category.courses.reduce((courseTotal, course) => 
      courseTotal + course.lessons.length, 0), 0)
}

// Système de progression (localStorage)
export function saveProgress(courseId: string, lessonId: string, completed: boolean = true) {
  if (typeof window === 'undefined') return
  
  const progress = getProgress()
  if (!progress[courseId]) {
    progress[courseId] = {}
  }
  progress[courseId][lessonId] = completed
  localStorage.setItem('course-progress', JSON.stringify(progress))
}

export function getProgress(): Record<string, Record<string, boolean>> {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem('course-progress')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function getCourseProgress(courseId: string): number {
  const course = getCourseById(courseId)
  if (!course) return 0
  
  const progress = getProgress()
  const courseProgress = progress[courseId] || {}
  const completedLessons = Object.values(courseProgress).filter(Boolean).length
  
  return Math.round((completedLessons / course.lessons.length) * 100)
}

export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  const progress = getProgress()
  return progress[courseId]?.[lessonId] || false
} 