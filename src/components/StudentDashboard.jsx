import { Calendar, CheckCircle, CreditCard, Home, Bell, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const stats = [
    { label: "Visa Status", value: "D-2 Active", icon: <CheckCircle className="text-green-500" />, desc: "Expires in 180 days" },
    { label: "Next Deadline", value: "Oct 15", icon: <Calendar className="text-rose-500" />, desc: "Course Registration" },
    { label: "Tuition", value: "Paid", icon: <CreditCard className="text-ai-cyan" />, desc: "Fall Semester 2026" },
    { label: "Dormitory", value: "Room 402", icon: <Home className="text-ai-purple" />, desc: "Building B" },
  ];

  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Dashboard</h2>
          <p className="text-slate-600 dark:text-slate-400">Your personalized academic and lifestyle hub.</p>
        </div>
        <div className="hidden sm:flex space-x-3">
          <button className="p-2 rounded-full glass dark:glass-dark hover:bg-slate-200 dark:hover:bg-slate-800 relative">
            <Bell className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass dark:glass-dark p-6 rounded-2xl flex flex-col border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Expenses Chart Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass dark:glass-dark p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center"><Wallet className="mr-2 w-5 h-5 text-ai-purple" /> Monthly Expenses</h3>
            <select className="bg-transparent border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 text-sm outline-none">
              <option>September 2026</option>
              <option>August 2026</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Housing & Utilities</span>
                <span className="font-medium">₩450,000</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-ai-cyan h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Food & Groceries</span>
                <span className="font-medium">₩320,000</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-ai-purple h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Transportation</span>
                <span className="font-medium">₩80,000</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Entertainment & Shopping</span>
                <span className="font-medium">₩150,000</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* University Announcements */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass dark:glass-dark p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50"
        >
          <h3 className="text-lg font-bold mb-6">University Announcements</h3>
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs text-ai-cyan font-bold uppercase tracking-wider mb-1 block">New</span>
              <p className="text-sm font-medium hover:text-ai-purple cursor-pointer transition-colors">International Student Festival Registration Open</p>
            </div>
            <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">Important</span>
              <p className="text-sm font-medium hover:text-ai-purple cursor-pointer transition-colors">Mandatory Health Check-up Schedule</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">Academic</span>
              <p className="text-sm font-medium hover:text-ai-purple cursor-pointer transition-colors">Midterm Exam Timetable Published</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
