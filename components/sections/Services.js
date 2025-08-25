"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ServiceCard from "../ui/ServiceCard";
import { Code, Palette, Rocket, TrendingUp, Users, Crown } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks and best practices for performance and scalability."
  },
  {
    icon: Rocket,
    title: "SaaS & Web Applications",
    description: "Full-stack applications with robust backends, intuitive frontends, and seamless user experiences."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, user-centered designs that convert visitors into customers and create memorable experiences."
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & Growth",
    description: "Strategic marketing solutions to grow your online presence and drive meaningful business results."
  },
  {
    icon: Users,
    title: "Consulting & Digital Strategy",
    description: "Expert guidance on digital transformation, technology choices, and strategic business decisions."
  },
  {
    icon: Crown,
    title: "Carthage Heritage Digital Experiences",
    description: "Premium culturally-rooted digital solutions that honor heritage while embracing modern innovation.",
    premium: true
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent"></div>
      
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
            <span className="text-sm text-teal-400 font-medium">Our Services</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comprehensive Digital
            <span className="text-teal-400 block">Solutions</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From concept to launch, we provide end-to-end digital services that drive growth and create lasting impact.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}