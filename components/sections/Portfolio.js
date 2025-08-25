"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with advanced analytics and seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    category: "Web Development"
  },
  {
    title: "SaaS Dashboard",
    description: "Comprehensive dashboard for data visualization and business intelligence.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    category: "SaaS Application"
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking experience with advanced security features.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    technologies: ["React Native", "Firebase", "Stripe", "TypeScript"],
    category: "Mobile Development"
  },
  {
    title: "Heritage Tourism Platform",
    description: "Cultural tourism platform showcasing Carthaginian heritage with immersive experiences.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d8d136?w=800&h=600&fit=crop",
    technologies: ["Next.js", "Three.js", "Contentful", "Framer Motion"],
    category: "Heritage Experience"
  },
  {
    title: "FinTech Trading Platform",
    description: "Real-time trading platform with advanced charting and portfolio management.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    technologies: ["Vue.js", "WebSocket", "Python", "Redis"],
    category: "Financial Technology"
  },
  {
    title: "Healthcare Management System",
    description: "Comprehensive healthcare platform for patient management and telemedicine.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    technologies: ["Angular", "Express.js", "MySQL", "Socket.io"],
    category: "Healthcare"
  }
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm text-green-400 font-medium">Our Work</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Portfolio &
            <span className="text-green-400 block">Case Studies</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover how we've helped businesses transform their digital presence with innovative solutions.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}