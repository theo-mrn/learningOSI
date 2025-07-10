"use client"

import { useRef } from "react"
import { Header } from "@/components/sections/Header"
import { Footer } from "@/components/sections/Footer"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { DotPattern } from "@/components/magicui/dot-pattern"
import BackToTop from "@/components/magicui/back-to-top"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  NetworkIcon, 
  BookOpen, 
  Users, 
  Trophy, 
  Settings, 
  ArrowRight, 
  PlayCircle,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Server,
  Database,
  Cpu
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null!)
  const featuresRef = useRef<HTMLDivElement>(null!)
  const coursesRef = useRef<HTMLDivElement>(null!)
  const statsRef = useRef<HTMLDivElement>(null!)

  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const features = [
    {
      icon: BookOpen,
      title: "Cours Interactifs",
      description: "Apprenez avec des cours pratiques et des simulations en temps réel",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "Labs Pratiques",
      description: "Configurez des réseaux virtuels et testez vos compétences",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Échangez avec d'autres apprenants et experts réseau",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Trophy,
      title: "Défis & Certifications",
      description: "Validez vos compétences avec des défis pratiques",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const courseCategories = [
    {
      icon: Globe,
      title: "Réseaux Fondamentaux",
      description: "Modèle OSI, TCP/IP, Adressage IP",
      lessons: 24,
      level: "Débutant"
    },
    {
      icon: Shield,
      title: "Sécurité Réseau",
      description: "Firewalls, VPN, Détection d'intrusion",
      lessons: 18,
      level: "Intermédiaire"
    },
    {
      icon: Server,
      title: "Administration Système",
      description: "Serveurs, DNS, DHCP, Active Directory",
      lessons: 32,
      level: "Avancé"
    },
    {
      icon: Database,
      title: "Infrastructure Cloud",
      description: "AWS, Azure, Kubernetes, Docker",
      lessons: 28,
      level: "Expert"
    }
  ]

  const stats = [
    { value: "15K+", label: "Étudiants Actifs" },
    { value: "200+", label: "Cours Disponibles" },
    { value: "95%", label: "Taux de Réussite" },
    { value: "24/7", label: "Support Disponible" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress className="top-[73px]" />
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <DotPattern
          width={32} 
          height={32} 
          cx={2} 
          cy={2} 
          cr={1.5} 
          className={cn(
            "absolute inset-0 w-full h-full opacity-30",
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
          )}
        />
        
        <div className="container mx-auto px-4 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
                <Zap className="mr-2 h-4 w-4" />
                Nouvelle plateforme d&apos;apprentissage
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Maîtrisez les{" "}
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Réseaux
                </span>{" "}
                de A à Z
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Apprenez les technologies réseau avec des cours interactifs, 
              des labs pratiques et une communauté d&apos;experts
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button size="lg" className="text-lg px-8 py-6 group">
                Commencer Maintenant
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 group">
                <PlayCircle className="mr-2 h-5 w-5" />
                Voir la Démo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 p-8 rounded-2xl backdrop-blur-sm border border-primary/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                NetLearn
              </span>
              ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une approche moderne et interactive pour maîtriser les technologies réseau
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group border-primary/10 hover:border-primary/30">
                  <CardHeader className="text-center">
                    <div className={cn(
                      "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                      feature.color
                    )}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section ref={coursesRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Parcours d&apos;Apprentissage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des formations structurées pour tous les niveaux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseCategories.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <course.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription>
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{course.lessons} leçons</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Populaire
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/courses">
              <Button size="lg" className="group">
                Voir Tous les Cours
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à devenir un expert réseau ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Rejoignez des milliers d&apos;étudiants qui développent leurs compétences 
              avec NetLearn chaque jour
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Inscription Gratuite
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Contacter un Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  )
} 