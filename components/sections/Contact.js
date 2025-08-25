"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Validate fields before sending
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form via FormSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/mhadhbijassem7@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully! 🚀",
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setFormStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setFormStatus({
        type: "error",
        message: "Network error. Please try later.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setFormStatus({ type: "", message: "" });
      }, 4000);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@tunivaraservices.com",
      subtext: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+216 XX XXX XXX",
      subtext: "Mon-Fri 9AM-6PM GMT+1",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Tunis, Tunisia",
      subtext: "North Africa Hub",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "< 24 Hours",
      subtext: "Average response time",
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
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
            <span className="text-sm text-teal-400 font-medium">Get In Touch</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start{" "}
            <span className="text-teal-400 block">Your Project?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Let's discuss your vision and turn it into reality. Book a free consultation today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12" ref={ref}>
          {/* Contact Form */}
          <motion.div
            className="glass-strong p-8 rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`glass bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                      errors.name ? "border-red-500" : "focus:border-teal-400"
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`glass bg-white/5 border-white/20 text-white placeholder-gray-400 ${
                      errors.email ? "border-red-500" : "focus:border-teal-400"
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Company */}
              <Input
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="glass bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-400"
              />

              {/* Message */}
              <div>
                <Textarea
                  placeholder="Tell us about your project *"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={`glass bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none ${
                    errors.message ? "border-red-500" : "focus:border-teal-400"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 glow-teal"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Book a Consultation
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info + FAQ */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-strong p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>
              <p className="text-gray-400 mb-8">
                Ready to transform your digital presence? We're here to help you every step of the way.
              </p>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center group-hover:bg-teal-500/30 transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                      <p className="text-teal-400 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-400">{info.subtext}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="glass-strong p-8 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Quick Answers</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-teal-400 mb-1">How long does a project take?</h4>
                  <p className="text-sm text-gray-400">Typically 4-12 weeks depending on complexity and scope.</p>
                </div>
                <div>
                  <h4 className="font-medium text-teal-400 mb-1">Do you work with startups?</h4>
                  <p className="text-sm text-gray-400">Absolutely! We love helping startups scale their digital presence.</p>
                </div>
                <div>
                  <h4 className="font-medium text-teal-400 mb-1">What's included in the consultation?</h4>
                  <p className="text-sm text-gray-400">Strategy session, technical assessment, and project roadmap.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Toasts */}
      <AnimatePresence>
        {formStatus.message && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl ${
              formStatus.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {formStatus.type === "success" ? <CheckCircle size={26} /> : <XCircle size={26} />}
            <p className="font-medium">{formStatus.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
