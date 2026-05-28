import { MapPin, Coffee, Utensils, Store, Building, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SmartMap() {
  const places = [
    { name: "Vietnamese Pho Restaurant", type: "Food", icon: <Utensils className="w-4 h-4 text-white" />, color: "bg-rose-500", dist: "3 mins walk" },
    { name: "CU Convenience Store", type: "Store", icon: <Store className="w-4 h-4 text-white" />, color: "bg-ai-cyan", dist: "1 min walk" },
    { name: "Kyungmin University Hospital", type: "Hospital", icon: <Building className="w-4 h-4 text-white" />, color: "bg-amber-500", dist: "10 mins bus" },
    { name: "Study Cafe 24/7", type: "Cafe", icon: <Coffee className="w-4 h-4 text-white" />, color: "bg-ai-purple", dist: "5 mins walk" }
  ];

  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Map</h2>
        <p className="text-slate-600 dark:text-slate-400">Discover essential spots around Kyungmin University.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* POI List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass dark:glass-dark p-4 rounded-xl mb-6 flex items-center justify-between border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-semibold flex items-center"><MapPin className="w-5 h-5 text-ai-cyan mr-2" /> Current Location</span>
            <span className="text-sm text-slate-500">Kyungmin Uni.</span>
          </div>

          <h3 className="text-lg font-bold mb-4">Recommended for you</h3>
          
          {places.map((place, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass dark:glass-dark p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`${place.color} p-2 rounded-lg shadow-sm`}>
                  {place.icon}
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-white text-sm">{place.name}</h4>
                  <span className="text-xs text-slate-500">{place.type}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-ai-purple">{place.dist}</span>
                <Navigation className="w-3 h-3 text-slate-400 mt-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Mockup */}
        <div className="lg:col-span-2 glass dark:glass-dark rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative h-[500px]">
          {/* Abstract Map Background */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{
            backgroundImage: `radial-gradient(#6366F1 2px, transparent 2px)`,
            backgroundSize: `30px 30px`
          }}></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 glass dark:glass-dark rounded-2xl max-w-sm relative z-10 border border-white/20">
              <MapPin className="w-12 h-12 text-ai-cyan mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold mb-2">Interactive Map Area</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                In the production version, this area will integrate with Google Maps or Naver Maps API to show real-time locations and directions around Kyungmin University.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
