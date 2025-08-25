import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export default function ServiceCard({ service, index }) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className={`glass-strong p-8 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
        service.premium ? 'border-teal-400/30 glow-teal' : 'hover:border-teal-400/20'
      }`}
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(10, 182, 188, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Premium Badge */}
      {service.premium && (
        <motion.div
          className="absolute top-4 right-4 bg-teal-500 text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Crown className="w-3 h-3" />
          Premium
        </motion.div>
      )}

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-colors duration-300"
          whileHover={{ rotate: 5 }}
        >
          <service.icon className="w-7 h-7 text-teal-400" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {service.description}
        </p>

        {/* Hover Arrow */}
        <motion.div
          className="mt-6 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
        >
          Learn More →
        </motion.div>
      </div>
    </motion.div>
  );
}