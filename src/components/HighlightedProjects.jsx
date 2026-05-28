import { motion } from 'framer-motion';
import { BookOpen, Heart, Users, Compass } from 'lucide-react';

const projects = [
  {
    title: "AI Survival Guide",
    description: "Step-by-step interactive guide for your first 30 days in South Korea.",
    icon: <BookOpen className="w-8 h-8 text-ai-cyan" />,
    color: "from-ai-cyan/20 to-transparent"
  },
  {
    title: "Emotional Support AI",
    description: "Feeling homesick? Chat with our empathetic AI designed to listen and help.",
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    color: "from-rose-500/20 to-transparent"
  },
  {
    title: "Student Community",
    description: "Connect with other international students at Kyungmin University.",
    icon: <Users className="w-8 h-8 text-ai-purple" />,
    color: "from-ai-purple/20 to-transparent"
  },
  {
    title: "Recommendation System",
    description: "Smart suggestions for housing, food, and activities based on your budget.",
    icon: <Compass className="w-8 h-8 text-amber-500" />,
    color: "from-amber-500/20 to-transparent"
  }
];

export default function HighlightedProjects() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Platform Features</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to thrive as an international student, powered by cutting-edge AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass dark:glass-dark rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="bg-white/50 dark:bg-slate-800/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
