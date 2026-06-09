"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from 'sweetalert2';
import { AnimatedMenu } from '@/components/AnimatedMenu';
import { AnimatedHeader } from '@/components/AnimatedHeader';
import { motion } from 'framer-motion'
import ParallaxBackground from '@/components/ParallaxBackground';
import { FaArrowUp } from "react-icons/fa"; // Add this import at the top
import { EnhancedButton, FloatingHireButton, MagneticButton } from '@/components/EnhancedButton';

// const menuVariants = {
//   closed: {
//     x: "100%",
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 40
//     }
//   },
//   open: {
//     x: 0,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 40
//     }
//   }
// };

// const menuItemVariants = {
//   closed: { opacity: 0, x: 50 },
//   open: (i: number) => ({
//     opacity: 1,
//     x: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.3
//     }
//   })
// };

// const contentVariants = {
//   hidden: { 
//     opacity: 0,
//     y: 20,
//     scale: 0.95
//   },
//   visible: { 
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 20,
//       staggerChildren: 0.03
//     }
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     scale: 0.95,
//     transition: {
//       duration: 0.2
//     }
//   }
// };

// Typing Effect Component
const TypingEffect = ({ text, delay = 0, speed = 100, className = "" }: { 
  text: string; 
  delay?: number; 
  speed?: number; 
  className?: string; 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset states when text changes
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(false);
    setShowCursor(true);

    const startTyping = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(typingTimeout);
    } else {
      // Typing completed
      setTimeout(() => setShowCursor(false), 500);
    }
  }, [currentIndex, isTyping, text, speed]);

  useEffect(() => {
    // Cursor blinking effect - only when typing is active or not finished
    if (!showCursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => currentIndex >= text.length ? false : !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [currentIndex, text.length, showCursor]);

  return (
    <span className={className}>
      {displayText}
      {(showCursor || currentIndex < text.length) && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
          animate={{ opacity: showCursor ? [1, 0, 1] : 0 }}
          transition={{ duration: 0.5, repeat: showCursor ? Infinity : 0 }}
        />
      )}
    </span>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  //const [isRotating, setIsRotating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const menuItems = ["About", "Skills", "Certifications", "Experience", "Projects", "Automation Portfolio", "Contact"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "I'll get back to you soon!",
          icon: "success",
          confirmButtonColor: '#0891b2'
        });

        const form = e.target as HTMLFormElement;
        if (form && typeof form.reset === 'function') {
          form.reset();
        }
      } else {
        throw new Error(result.message);
      }
    } catch {
      Swal.fire({ 
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: '#0891b2'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionRefs = {
    about: React.useRef<HTMLDivElement>(null),
    skills: React.useRef<HTMLDivElement>(null),
    certifications: React.useRef<HTMLDivElement>(null),
    experience: React.useRef<HTMLDivElement>(null),
    projects: React.useRef<HTMLDivElement>(null),
    "automation portfolio": React.useRef<HTMLDivElement>(null),
    contact: React.useRef<HTMLDivElement>(null),
  };
  const contentSections = {
    about: {   
  content: (     
    <div className="relative">       
      {/* Background Elements */}       
      <div className="absolute inset-0">         
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"></div>         
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>       
      </div>        

      <div className="relative grid lg:grid-cols-5 gap-12 items-start">   
        {/* Left Column - Enhanced Image and Quick Info */}   
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >     
          <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer">   
            <Image     
              src="/profile.jpg"     
              alt="Kanokporn Hudsree — ERP Developer & Automation Engineer (SAP, RPA, AI)"     
              fill     
              className="object-cover transition-transform duration-700 group-hover:scale-110"   
            />   
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>    

            {/* Contact Hover Overlay */}
<motion.div 
  className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
  initial={{ opacity: 0 }}
  whileHover={{ opacity: 1 }}
  transition={{ duration: 0.12 }} // เพิ่มบรรทัดนี้ ลด duration ให้สั้นลง
>
  <motion.div 
    className="text-center space-y-4"
    initial={{ y: 20, opacity: 0 }}
    whileHover={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.12 }} // ลด duration และลบ delay
  >
                <div className="text-white text-lg font-semibold">Let&apos;s Connect!</div>
                <motion.button
                  onClick={() => handleSectionChange("contact")}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <span>📧</span>
                    Contact Me
                  </span>
                </motion.button>
                <div className="text-cyan-200/80 text-sm space-y-1">
                  <div>📧 Laybabaka2@gmail.com</div>
                  <div>📱 +66 096-856-6296</div>
                  <div>📍 Bangkok, Thailand</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Professional Status Badge */}   
            <motion.div 
              className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/90 to-green-500/90 backdrop-blur-sm border border-emerald-400/30 shadow-lg group-hover:opacity-50 transition-opacity duration-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >     
              <div className="flex items-center gap-2">       
                <motion.span 
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>       
                <span className="text-white text-sm font-medium">Available for Global Opportunities</span>     
              </div>   
            </motion.div> 

            {/* Academic Excellence Badge */}
            <motion.div 
              className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-lg p-3 border border-yellow-400/30 group-hover:opacity-50 transition-opacity duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">🎓</div>
                <div className="text-xs text-white/80 font-semibold">First Class</div>
                <div className="text-xs text-yellow-300">Honors</div>
              </div>
            </motion.div>
          </div>   

          {/* Professional Info Cards */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {[
              { icon: "🎯", title: "Specialization", value: "Process Automation & RPA" },
              { icon: "🎓", title: "Education", value: "Computer & Robotics Eng." },
              { icon: "📊", title: "GPA", value: "3.53 / 4.00 (First-Class)" }
            ].map((info, index) => (
  <motion.div
    key={info.title}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <div className="text-xl mb-1 group-hover:scale-110 transition-transform duration-300">{info.icon}</div>
                <div className="text-xs text-cyan-200/60 mb-1">{info.title}</div>
                <div className="text-xs font-semibold text-white leading-tight">{info.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Academic Highlights */}
          <motion.div 
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎓</span>
              <h3 className="text-sm font-semibold text-yellow-300">Academic Excellence</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/70">Automation Systems</span>
                <span className="text-green-400 font-semibold">A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Programming & AI</span>
                <span className="text-green-400 font-semibold">A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Database Systems</span>
                <span className="text-green-400 font-semibold">A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Software Engineering</span>
                <span className="text-blue-400 font-semibold">B+</span>
              </div>
            </div>
            <motion.button
              onClick={() => window.open('/transcript.pdf', '_blank')}
              className="mt-3 w-full px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg text-yellow-300 text-xs font-medium hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 border border-yellow-500/30"
              whileHover={{ scale: 1.02 }}
            >
              📄 View Full Transcript
            </motion.button>
          </motion.div>

          {/* Language & Global Skills */}
          <motion.div 
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🌐</span>
              <h3 className="text-sm font-semibold text-purple-300">Global Communication</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span>🇹🇭</span>
                  <span className="text-white/70">Thai (Native)</span>
                </div>
                <span className="text-purple-400 font-semibold">Fluent</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span>🇺🇸</span>
                  <span className="text-white/70">English</span>
                </div>
                <span className="text-green-400 font-semibold">Intermediate (Working)</span>
              </div>
              <div className="text-xs text-purple-200/60 mt-2 italic">
                Comfortable with technical reading, writing, and async collaboration.
              </div>
            </div>
          </motion.div>
        </motion.div>           

        {/* Right Column - Enhanced About Content */}         
        <motion.div 
          className="lg:col-span-3 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >           
          <div>             
            <motion.h2 
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >               
              About Me             
            </motion.h2>             
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <p className="text-cyan-100/80 leading-relaxed">
                <TypingEffect
                  text="Hi, I&apos;m Kanokporn"
                  delay={800}
                  speed={120}
                  className="text-cyan-400 font-semibold"
                />
                {" "}(Lay), an <span className="text-cyan-400 font-semibold">ERP Developer &amp; Automation Engineer</span> with a Computer &amp; Robotics Engineering degree from Bangkok University — graduated with <span className="text-yellow-400 font-semibold">First-Class Honors</span>.
              </p>
              <p className="text-cyan-100/80 leading-relaxed">
                I engineer <span className="text-purple-400 font-semibold">SAP</span>, <span className="text-purple-400 font-semibold">RPA</span>, <span className="text-purple-400 font-semibold">API</span>, and <span className="text-purple-400 font-semibold">AI</span> together to improve business processes and drive <span className="text-emerald-400 font-semibold">Digital Transformation</span> at enterprise scale — working on <span className="text-purple-400 font-semibold">SAP S/4HANA financial workflows</span>, <span className="text-purple-400 font-semibold">SAP Build Process Automation</span>, and end-to-end RPA delivery in production.
              </p>
              <p className="text-cyan-100/80 leading-relaxed">
                My toolkit spans <span className="text-purple-400 font-semibold">SAP S/4HANA &amp; BTP</span>, <span className="text-purple-400 font-semibold">UiPath / Blue Prism / Power Automate</span>, <span className="text-purple-400 font-semibold">Document AI &amp; IDP</span>, and <span className="text-purple-400 font-semibold">LLM-based pipelines</span>. I bring an enterprise mindset from ERP work and a builder&apos;s mindset from a self-built LINE Bot production system — the same architectural patterns (idempotent webhooks, defer queues, structured logging) reused directly in UiPath workflows at AIS.
              </p>

              {/* Positioning Statement */}
              <motion.div
                className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-cyan-100/90 leading-relaxed text-sm font-medium italic">
                  &quot;I&apos;m not here to write bots. I&apos;m here to engineer SAP, RPA, API, and AI into business processes that actually move the numbers — with production-grade logging, error handling, and measurable outcomes.&quot;
                </p>
              </motion.div>
            </motion.div>
          </div>            

          {/* Value Proposition */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-xl">💎</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-300">What I Bring</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { skill: "SAP S/4HANA & BTP Engineering", level: "Hands-on", icon: "🏛️" },
                  { skill: "Enterprise RPA Delivery", level: "Production", icon: "🤖" },
                  { skill: "Financial Process Automation", level: "Hands-on", icon: "💰" },
                  { skill: "Digital Transformation Mindset", level: "Engineer-led", icon: "🚀" }
                ].map((item, index) => (
                  <motion.div
    key={item.skill}
                    className="text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-sm font-medium text-white mb-1">{item.skill}</div>
                    <div className="text-xs text-cyan-300">{item.level}</div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-blue-300 mb-2">🎯 Immediate Impact:</div>
                {[
                  { capability: "Process Discovery", impact: "PDD/SDD authored" },
                  { capability: "RPA Development", impact: "8+ bots in production" },
                  { capability: "SAP Automation", impact: "OB83, PND54, BG Alert" },
                  { capability: "Bot Governance", impact: "Logging + error handling by default" }
                ].map((item, index) => (
                  <motion.div
                    key={item.capability}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/20 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <span className="text-sm font-medium text-white">{item.capability}</span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">{item.impact}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technical Expertise */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Technical Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "RPA Platforms (UiPath, Blue Prism, PAD)", icon: "🤖", years: "2+ yrs", projects: "8+ bots in production", cert: "UiPath & Blue Prism Certified" },
                { title: "Process Analysis & BI", icon: "📈", years: "2 yrs", projects: "12+ PDDs/SDDs delivered", cert: "BPMN 2.0" },
                { title: "Python & Automation", icon: "🐍", years: "3 yrs", projects: "Pandas/FastAPI/OCR scripts", cert: "Coursera certified" },
                { title: "Database & SQL", icon: "🗄️", years: "2 yrs", projects: "PostgreSQL/MySQL queries + reports", cert: "" },
                { title: "API Integration", icon: "🔗", years: "2 yrs", projects: "REST + OAuth + Webhooks", cert: "" },
                { title: "SAP Automation", icon: "🏢", years: "1+ yr", projects: "BG Alert, Payment Advice, PND54, OB83", cert: "ERP Developer @ PPP" },
                { title: "GenAI & LLM Apps", icon: "🧠", years: "1 yr", projects: "Kai Ja LINE bot + Claude tooling", cert: "" },
                { title: "OCR & Document AI", icon: "📄", years: "1 yr", projects: "Tesseract + ocrmypdf + Doc Intelligence", cert: "" }
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white leading-tight">{skill.title}</div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        <span className="text-[11px] font-medium text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-full">{skill.years}</span>
                        {skill.cert && (
                          <span className="text-[11px] font-medium text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full">{skill.cert}</span>
                        )}
                      </div>
                      <div className="text-xs text-cyan-100/70 mt-1.5">{skill.projects}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call-to-Action Section */}
          <motion.div 
            className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-6 border border-emerald-500/20 backdrop-blur-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.div
              className="text-2xl mb-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🚀
            </motion.div>
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">Ready to Automate Smarter Together?</h3>
            <p className="text-emerald-100/80 text-sm mb-4">
              Let&apos;s connect to discuss automation excellence and digital transformation!
            </p>
            <motion.button
              onClick={() => handleSectionChange("contact")}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-white font-medium hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <span>💬</span>
                Let&apos;s Connect & Innovate!
              </span>
            </motion.button>
          </motion.div>            

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >   
            <MagneticButton     
  variant="primary"     
  size="md"     
  icon={<span>📄</span>}     
  onClick={() => window.open('/resume.pdf', '_blank')}
  className="group"   
>     
  <span className="group-hover:mr-2 transition-all duration-300">Download Resume</span>
  <motion.span
    className="inline-block"
    whileHover={{ rotate: 360 }}
    transition={{ duration: 0.5 }}
  >
    ⬇️
  </motion.span>   
</MagneticButton>

            <EnhancedButton     
              variant="secondary"     
              size="md"     
              icon={<span>🎓</span>}     
              onClick={() => window.open('/transcript.pdf', '_blank')}
              className="group"   
            >     
              <span className="group-hover:mr-2 transition-all duration-300">View Transcript</span>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                📊
              </motion.span>   
            </EnhancedButton>   
            
            <EnhancedButton     
              variant="secondary"     
              size="md"     
              icon={<span>💼</span>}     
              onClick={() => handleSectionChange("projects")}
              className="group"   
            >     
              <span className="group-hover:mr-2 transition-all duration-300">View Projects</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span> 
            </EnhancedButton> 
          </motion.div>

          {/* Professional Qualifications */}
          <motion.div 
            className="flex flex-wrap gap-3 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {[
              { label: "SAP S/4HANA", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: "🏛️" },
              { label: "SAP Build", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", icon: "⚙️" },
              { label: "UiPath & Blue Prism", color: "bg-orange-500/20 text-orange-300 border-orange-500/30", icon: "🤖" },
              { label: "Financial Automation", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: "💰" },
              { label: "Digital Transformation", color: "bg-purple-500/20 text-purple-300 border-purple-500/30", icon: "🚀" },
              { label: "First-Class Honors", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", icon: "🎓" }
            ].map((badge, index) => (
              <motion.span
    key={badge.label}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border ${badge.color} backdrop-blur-sm flex items-center gap-1.5 hover:scale-105 transition-transform duration-300`}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <span>{badge.icon}</span>
                {badge.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>       
      </div>     
    </div>   
  ) 
},
   skills: {
  content: (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-3xl font-bold text-white mb-2 px-4">Skills & Expertise</h2>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" style={{ width: "100%" }}></div>
        </div>
        <p className="text-cyan-200/70 mt-4 max-w-2xl mx-auto">
          Tools I use to engineer SAP, RPA, API, and AI into measurable business process improvement.
        </p>
      </div>
        
        {/* Skills Categories - Reorganized */}
        <div className="space-y-12">
          {/* Automation Tools */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
  <span className="text-2xl sm:text-3xl">🛠️</span>
  Automation Tools
</h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "UiPath", icon: "🤖" },
                { name: "Blue Prism", icon: "🟦" },
                { name: "Power Automate Desktop", icon: "⚡" },
                { name: "Power Automate Cloud", icon: "☁️" },
                { name: "Power Apps (Canvas)", icon: "📱" },
                { name: "Power Fx", icon: "🧮" },
                { name: "Dataverse", icon: "🗃️" },
                { name: "AI Builder (OCR + Form)", icon: "🧠" },
                { name: "Custom Connector", icon: "🔌" },
                { name: "Solution & ALM", icon: "📦" },
                { name: "SAP S/4HANA", icon: "🏛️" },
                { name: "SAP GUI Scripting", icon: "🏢" },
                { name: "SAP Web GUI", icon: "🌐" },
                { name: "SAP OData / BAPI", icon: "🔗" },
                { name: "SAP Build Process Automation", icon: "⚙️" },
                { name: "SAP Build Apps", icon: "🧱" },
                { name: "SAP Build Work Zone", icon: "🏗️" },
                { name: "SAP Mobile Start", icon: "📲" },
                { name: "SAP BTP", icon: "☁️" },
                { name: "SAP Integration Suite", icon: "🪢" },
                { name: "SAP AI Core", icon: "🧬" },
                { name: "SAP Joule Studio", icon: "✨" },
                { name: "ERP Development", icon: "💼" },
                { name: "Google Apps Script", icon: "📜" },
                { name: "LINE Messaging API", icon: "💬" },
                { name: "Airflow", icon: "🌬️" },
                { name: "n8n", icon: "🔁" },
                { name: "Make.com", icon: "🧩" },
                { name: "Excel VBA", icon: "📊" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* GenAI & LLM - Agoda Priority */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12 ring-2 ring-fuchsia-400/40 rounded-2xl p-4 bg-fuchsia-500/5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-fuchsia-300 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">🧠</span>
                GenAI & LLM
              </h3>
              <span className="text-xs font-bold text-fuchsia-300 bg-fuchsia-500/20 px-3 py-1 rounded-full border border-fuchsia-400/40">⭐ Agoda Top Priority</span>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "Claude API (Anthropic)", icon: "🤖" },
                { name: "OpenAI API", icon: "🧬" },
                { name: "Gemini API", icon: "✨" },
                { name: "Prompt Engineering", icon: "✍️" },
                { name: "RAG (concept)", icon: "🔍" },
                { name: "MCP (Model Context Protocol)", icon: "🔌" },
                { name: "AI Agent / Tool Use", icon: "🛠️" },
                { name: "Claude Code (AI Dev)", icon: "⌨️" },
                { name: "Token & Cost Optimization", icon: "💰" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-fuchsia-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* OCR & Document AI - Agoda Priority */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12 ring-2 ring-teal-400/40 rounded-2xl p-4 bg-teal-500/5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-teal-300 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">📄</span>
                OCR & Document AI
              </h3>
              <span className="text-xs font-bold text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-400/40">⭐ Agoda Priority</span>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "Power Automate AI Builder (OCR)", icon: "⚡" },
                { name: "Azure Document Intelligence", icon: "🔷" },
                { name: "AWS Textract", icon: "🟠" },
                { name: "Google Document AI", icon: "🟢" },
                { name: "SAP Document AI", icon: "🏛️" },
                { name: "Intelligent Document Processing (IDP)", icon: "📋" },
                { name: "Tesseract OCR", icon: "📝" },
                { name: "UiPath Document Understanding", icon: "🤖" },
                { name: "ocrmypdf", icon: "📎" },
                { name: "pdfplumber", icon: "📑" },
                { name: "PyMuPDF", icon: "📄" },
                { name: "PyPDF2", icon: "📕" },
                { name: "Table Extraction", icon: "📊" },
                { name: "Layout Detection", icon: "🗺️" },
                { name: "Image Preprocessing", icon: "🖼️" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Programming */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">💻</span>
              Programming
            </h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "Python", icon: "🐍" },
                { name: "Pandas", icon: "🐼" },
                { name: "NumPy", icon: "🔢" },
                { name: "FastAPI", icon: "⚡" },
                { name: "Pydantic", icon: "✅" },
                { name: "pytest", icon: "🧪" },
                { name: "requests / httpx", icon: "🌐" },
                { name: "asyncio", icon: "🔄" },
                { name: "Regex", icon: "🔣" },
                { name: "Poetry / venv", icon: "📦" },
                { name: "C#", icon: "💻" },
                { name: "C/C++", icon: "⚙️" },
                { name: "JavaScript / TypeScript", icon: "🟨" },
                { name: ".NET", icon: "🔷" },
                { name: "SQL", icon: "🗃️" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* AI/ML & Computer Vision */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              AI/ML & Computer Vision
            </h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "YOLOv5 / v8", icon: "📷" },
                { name: "OpenCV", icon: "📸" },
                { name: "Roboflow", icon: "🎯" },
                { name: "OCR (Tesseract)", icon: "📝" },
                { name: "UiPath OCR", icon: "🔍" },
                { name: "Jupyter Lab", icon: "📓" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Cloud / DevOps */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">☁️</span>
              Cloud / DevOps
            </h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "AWS S3", icon: "🪣" },
                { name: "AWS Lambda", icon: "λ" },
                { name: "AWS EC2", icon: "🖥️" },
                { name: "AWS IAM", icon: "🔐" },
                { name: "AWS Secrets Manager", icon: "🗝️" },
                { name: "AWS CloudWatch", icon: "📡" },
                { name: "Azure Cloud", icon: "☁️" },
                { name: "Docker", icon: "🐳" },
                { name: "Git / Branching / Rebase", icon: "🌿" },
                { name: "GitHub Actions (CI/CD)", icon: "⚙️" },
                { name: "Semantic Versioning", icon: "🏷️" },
                { name: "Jira", icon: "📋" },
                { name: "REST API", icon: "🌐" },
                { name: "OAuth 2.0 / JWT", icon: "🔑" },
                { name: "Swagger / OpenAPI", icon: "📘" },
                { name: "Webhook", icon: "🪝" },
                { name: "Postman", icon: "📮" },
                { name: "Serverless Framework", icon: "🚀" },
                { name: "System Monitoring", icon: "📊" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* System Design Patterns */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-rose-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏗️</span>
              System Design Patterns
            </h3>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "Retry Pattern", icon: "🔁" },
                { name: "Dead Letter Queue (concept)", icon: "💀" },
                { name: "Idempotency", icon: "🔒" },
                { name: "Rate Limiting", icon: "🚦" },
                { name: "Event-Driven Architecture", icon: "📡" },
                { name: "Cron / Scheduled Jobs", icon: "⏰" },
                { name: "Microservice vs Monolith", icon: "🧩" },
                { name: "Encryption (Rest/Transit)", icon: "🛡️" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Database & Data Analytics */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-indigo-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">💾</span>
              Database & Data Analytics
            </h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "PostgreSQL", icon: "🗄️" },
                { name: "MySQL", icon: "🐬" },
                { name: "MongoDB", icon: "🍃" },
                { name: "SQL JOIN (All Types)", icon: "🔗" },
                { name: "Window Functions", icon: "🪟" },
                { name: "CTE", icon: "🧱" },
                { name: "Stored Procedure", icon: "📜" },
                { name: "Query Optimization", icon: "⚡" },
                { name: "Data Warehouse", icon: "🏛️" },
                { name: "Power Query (M)", icon: "🔌" },
                { name: "Power BI", icon: "📊" },
                { name: "A/B Testing", icon: "🧪" },
                { name: "KPI Design", icon: "🎯" },
                { name: "Data Mining", icon: "⛏️" },
                { name: "Dashboarding", icon: "📈" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Process Consulting */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12 ring-2 ring-yellow-400/40 rounded-2xl p-4 bg-yellow-500/5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl font-semibold text-yellow-300 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Process Consulting
              </h3>
              <span className="text-xs font-bold text-yellow-300 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-400/40">⭐ Agoda Priority</span>
            </div>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "BPMN 2.0", icon: "🔄" },
                { name: "Swimlane Diagram", icon: "🏊" },
                { name: "Process Discovery", icon: "🔍" },
                { name: "Task Mining", icon: "🛠️" },
                { name: "Value Stream Mapping", icon: "📈" },
                { name: "PDD Writing", icon: "📝" },
                { name: "SDD Writing", icon: "📐" },
                { name: "ROI Calculation", icon: "💰" },
                { name: "FTE Saved Calc", icon: "👥" },
                { name: "Feasibility Assessment", icon: "✅" },
                { name: "Root Cause Analysis", icon: "🌳" },
                { name: "5 Why / Fishbone", icon: "🐟" },
                { name: "Workflow Design", icon: "🔀" },
                { name: "Change Management", icon: "⚡" },
                { name: "Stakeholder Management", icon: "🤝" },
                { name: "Agile / Scrum", icon: "🏃" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Embedded & IoT */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-orange-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Embedded & IoT
            </h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "Arduino", icon: "🔌" },
                { name: "PlatformIO", icon: "📡" },
                { name: "LVGL", icon: "📱" },
                { name: "Stepper Motor", icon: "⚙️" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Development Tools */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              Development Tools
            </h3>
            <div className="overflow-x-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-[340px]">
              {[
                { name: "VS Code", icon: "💙" },
                { name: "API Integration", icon: "🔗" },
                { name: "Version Control", icon: "📝" },
                { name: "Testing", icon: "🧪" }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gray-500/50 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <h3 className="text-xl font-semibold text-pink-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Professional Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  name: "Problem Solving", 
                  icon: "🧩",
                  description: "Analytical thinking & creative solutions"
                },
                { 
                  name: "Collaboration", 
                  icon: "🤝",
                  description: "Effective communication & teamwork"
                },
                { 
                  name: "Continuous Learning", 
                  icon: "📚",
                  description: "Quick adaptation to new technologies"
                },
                { 
                  name: "Attention to Detail", 
                  icon: "🔍",
                  description: "Precision in process automation"
                },
                { 
                  name: "Self-Motivated", 
                  icon: "🚀",
                  description: "Independent & responsible approach"
                },
                { 
                  name: "Adaptability", 
                  icon: "🌟",
                  description: "Flexible in dynamic environments"
                }
              ].map((skill) => (
                <div
    key={skill.name}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                      <div>
                        <div className="text-lg font-medium text-white mb-1">{skill.name}</div>
                        <div className="text-sm text-gray-300">{skill.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
},
    certifications: {
  content: (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-3xl font-bold text-white mb-2 px-4">Certificates & Training</h2>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" style={{ width: "100%" }}></div>
        </div>
        <p className="text-cyan-200/70 mt-4 max-w-2xl mx-auto">
          Professional certifications and continuous learning in automation, development, and emerging technologies.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="overflow-x-auto">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 min-w-[340px]">
        {[
          {
            title: "UiPath RPA Developer Foundation",
            issuer: "UiPath Academy",
            date: "2023",
            icon: "🏆",
            color: "from-orange-500/20 to-red-500/20",
            description: "Basic to intermediate RPA development skills",
            level: "Foundation",
            skills: ["Process Automation", "Studio Development", "Orchestrator"]
          },
          {
            title: "Blue Prism Developer Certification",
            issuer: "Blue Prism University",
            date: "2023",
            icon: "🔷",
            color: "from-blue-500/20 to-indigo-500/20",
            description: "Automation development and process design",
            level: "Professional",
            skills: ["Process Studio", "Object Studio", "Control Room"]
          },
          {
            title: "Python for Automation & Data Science",
            issuer: "Coursera",
            date: "2022",
            icon: "🐍",
            color: "from-green-500/20 to-emerald-500/20",
            description: "Python scripting for automation and data analysis",
            level: "Intermediate",
            skills: ["Pandas", "NumPy", "Automation Scripts"]
          },
          {
            title: "AI & Computer Vision with YOLO",
            issuer: "Online Workshop",
            date: "2022",
            icon: "👁️",
            color: "from-purple-500/20 to-pink-500/20",
            description: "Hands-on experience with object detection models",
            level: "Advanced",
            skills: ["YOLO", "OpenCV", "Deep Learning"]
          },
          {
            title: "Docker & Containerization",
            issuer: "Udemy",
            date: "2021",
            icon: "🐳",
            color: "from-cyan-500/20 to-blue-500/20",
            description: "Container deployment and management",
            level: "Intermediate",
            skills: ["Docker", "Kubernetes", "DevOps"]
          },
          {
            title: "PostgreSQL Database Management",
            issuer: "Online Course",
            date: "2021",
            icon: "🗃️",
            color: "from-indigo-500/20 to-purple-500/20",
            description: "Database design and query optimization",
            level: "Intermediate",
            skills: ["SQL", "Database Design", "Performance Tuning"]
          }
        ].map((cert) => (
          <div
            key={cert.title}
            className="group relative"
          >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
            
            {/* Card Content */}
            <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              {/* Icon and Level Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                  {cert.level}
                </span>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                {cert.description}
              </p>

              {/* Issuer and Date */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-cyan-200/70 text-sm font-medium">
                  {cert.issuer}
                </div>
                <div className="text-cyan-400 text-sm font-semibold">
                  {cert.date}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-white/10 text-cyan-200 rounded-md border border-white/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Verification Badge (Optional) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Additional Training Section */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-2xl mr-3">📚</span>
          Continuous Learning
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-gray-300">Regular participation in automation webinars</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-gray-300">Active in RPA developer communities</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-gray-300">Following latest AI/ML trends and tools</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-gray-300">Exploring cloud automation platforms</span>
          </div>
        </div>
      </div>
    </div>
  )
},
    experience: {
  content: (
    <div className="relative">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-3xl font-bold text-white mb-2 px-4">Experience</h2>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" style={{ width: "100%" }}></div>
        </div>
        <p className="text-cyan-200/70 mt-4 max-w-2xl mx-auto">
          Professional experience in automation, software engineering, and RPA development.
        </p>
      </div>
      {/* Timeline */}
      <div className="space-y-8">
        {[
          {
            role: "ERP Developer & Automation Engineer",
            company: "AIS (Advanced Info Service)",
            period: "Sep 2025 - Present",
            duration: "Ongoing",
            location: "Bangkok, Thailand",
            isActive: true,
            type: "work" as const,
            technologies: ["UiPath", "SAP S/4HANA", "SAP Web GUI", "SAP Build Process Automation", "Power Automate", "Power Automate AI Builder (OCR)", "Excel Automation", "Outlook Automation", "SQL"],
            achievements: [
              "Delivered enterprise SAP automation across Finance, Procurement, and Sales domains",
              "Built end-to-end RPA workflows with exception handling, structured logging, and stakeholder reporting",
              "Enhanced SAP S/4HANA financial processes via configuration and integration (THOR / SOFR reference rates)",
              "Collaborated with business users on requirement gathering, UAT, and production rollout"
            ],
            projects: [
              { name: "BG Alert Automation", detail: "Automated Bank Guarantee expiration monitoring in SAP — classifies by 30d / 7d / expired, generates and distributes email alerts to stakeholders. UiPath + SAP Web GUI + Excel + Outlook." },
              { name: "GR Process Automation", detail: "Automated Goods Receipt workflow in SAP — reduced manual data entry and validation, improved exception handling for procurement operations. UiPath + SAP." },
              { name: "Mass Sales Order Automation", detail: "High-volume Sales Order creation and updates with optimized business rules. Investigated production issues and shipped enhancements. UiPath + SAP SD + SQL." },
              { name: "Market Rate Maintenance (THOR & SOFR)", detail: "Enhanced SAP S/4HANA transaction OB83 — redesigned rate classification to use Reference fields instead of date-based identification. SAP S/4HANA + API + Financial Process." },
              { name: "Payment Advice Automation (with OCR)", detail: "End-to-end Power Automate flow with built-in OCR (AI Builder) to extract payment data from incoming documents, validate against SAP, and auto-generate + distribute payment advice via email. Reduced manual data entry and improved payment communication accuracy and timeliness. Power Automate + AI Builder OCR + SAP + Outlook + Excel." }
            ]
          },
          {
            role: "Founder & Solo Builder",
            company: "Sunrise LINE Bots Suite — Self-built Production System",
            period: "2025 - Present",
            duration: "16+ weeks in production",
            location: "Bangkok, Thailand",
            isActive: true,
            type: "work" as const,
            technologies: ["Google Apps Script", "LINE Messaging API v2", "Flex Messages", "Rich Menu API", "Google Sheets (state DB)", "CacheService", "Properties Service", "JavaScript ES6+"],
            achievements: [
              "Designed, built, deployed, and operated solo a 2-bot LINE OA suite (KaiJa + Stock Sunrise) automating end-to-end daily operations for a cake cafe",
              "Engineered Reply-200-First webhook architecture — sustained P95 response under 1.5s on serverless runtime (vs LINE's 2s hard SLA)",
              "Built idempotent webhook processing with CacheService-based deduplication — eliminated duplicate side effects from LINE retry storms",
              "Implemented defer queue pattern for tasks exceeding 60s runtime (slip OCR) with retry + dead-letter handling",
              "Established mandatory structured logging (TRACE/INFO/WARN/ERROR) with persistent error sheet — production-grade observability on serverless runtime",
              "Reduced daily bookkeeping + stock entry from ~30 min/day to ~5 min/day (~83% reduction)",
              "Pattern library (Reply-200-First, idempotent webhook, defer queue, adaptive renderer) reused directly in enterprise UiPath workflows at AIS"
            ],
            projects: [
              { name: "KaiJa Bot", detail: "Expense tracking, customer order intake, slip payment OCR pipeline, per-user state machine with auto-expiring sessions, group-chat wake-word filter with Thai NL keyword detection." },
              { name: "Stock Sunrise", detail: "Stock management, Flex-based reporting, 3-tab Rich Menu with Switch Alias API for instant client-side navigation, adaptive Flex renderer with size guard auto-degrading to text fallback." }
            ]
          },
          {
            role: "Software Engineer",
            company: "PTT Digital Solutions",
            period: "Jan 2025 - Aug 2025",
            duration: "8 months",
            location: "Bangkok, Thailand",
            isActive: false,
            type: "work" as const,
            technologies: ["Python", "YOLOv5", "OpenCV", "EasyOCR", "GPS", "REST API", "PostgreSQL"],
            achievements: [
              "Developed AI-integrated automation for industrial traffic detection",
              "Built YOLOv5-based traffic light detection system with GPS coordination",
              "Led API integrations and data pipeline automation across backend services"
            ],
            projects: [
              { name: "Real-time Computer Vision Pipeline", detail: "YOLOv5 + OCR + GPS for traffic light detection — high-throughput image classification with 92.5% accuracy on Thai traffic scenarios" },
              { name: "API Integration & Data Pipeline", detail: "Automated backend data flows between internal services" }
            ]
          },
          {
            role: "RPA Developer",
            company: "PTT Digital Solutions",
            period: "Aug 2024 - Dec 2024",
            duration: "5 months",
            location: "Bangkok, Thailand",
            isActive: false,
            type: "work" as const,
            technologies: ["Blue Prism", "Python", "SAP GUI", "REST API", "Web Scraping", "TikTok Shop API", "JSON"],
            achievements: [
              "Developed automation workflows using Blue Prism for E-Commerce and ERP processes",
              "Analyzed and improved business processes through RPA, reducing manual effort and improving data accuracy",
              "Integrated external systems via REST API with secure HMAC signature authentication",
              "Built data integration pipelines between internal and external systems"
            ],
            projects: [
              { name: "Web Data Scraping Automation", detail: "Automated extraction of product and stock data from E-Commerce sites — reduced manual data collection effort. Blue Prism + Web Automation + Data Extraction." },
              { name: "Real-time Inventory Update via API", detail: "API integration for real-time stock synchronization. Blue Prism + REST API + JSON." },
              { name: "SAP Data Entry Automation", detail: "Automated keying of product data into SAP — reduced human error and improved accuracy. Blue Prism + SAP GUI + SAP Automation." }
            ]
          },
          {
            role: "R&D Engineer Intern",
            company: "Ultimate Technology Co., Ltd",
            period: "Jun 2023 - Jul 2023",
            duration: "2 months",
            location: "Bangkok, Thailand",
            isActive: false,
            type: "work" as const,
            technologies: ["YOLOv5s", "SSD", "Faster R-CNN", "Roboflow", "Python", "5G Smart Pole"],
            achievements: [
              "Worked on AI Project: Elephant Detection and Alert System integrated with 5G Smart Pole",
              "Trained machine learning and deep learning models using YOLOv5s, SSD, and Faster R-CNN",
              "Used Roboflow for dataset management, augmentation, and model optimization"
            ],
            projects: [
              { name: "Elephant Detection & Alert System (5G Smart Pole)", detail: "Object detection model trained on field data — benchmarked YOLOv5s vs SSD vs Faster R-CNN for the best accuracy/latency trade-off" }
            ]
          },
          {
            role: "Bachelor of Engineering — Computer & Robotics Engineering",
            company: "Bangkok University",
            period: "2020 - 2024",
            duration: "4 years",
            location: "Bangkok, Thailand",
            isActive: false,
            type: "education" as const,
            technologies: ["C/C++", "C#", "Python", "Assembly", "MySQL", "PostgreSQL", "Arduino", "PlatformIO", "LVGL"],
            achievements: [
              "Graduated with First-Class Honors — GPA 3.53 / 4.00",
              "Senior project recognized by faculty for hardware + software integration",
              "Strong foundation across embedded systems, databases, AI/ML, and software engineering"
            ],
            projects: [
              { name: "Senior Project: Smart Pill Dispenser", detail: "IoT medication dispenser — PostgreSQL backend, C# REST API, LVGL embedded UI, PlatformIO firmware, stepper-motor scheduling" },
              { name: "Purchase Reader Bot (UiPath)", detail: "Automated data extraction from purchase orders using UiPath + OCR" },
              { name: "Logistics Management System", detail: "Console application — C programming" },
              { name: "Bus Schedule System", detail: "Relational schema + queries — MySQL" },
              { name: "Smart Farm Watering System", detail: "Sensor-driven irrigation — Arduino" },
              { name: "Microprocessor Controller", detail: "Low-level register programming — Assembly Language" }
            ],
            workshops: [
              { name: "SAP Build Process Automation Workshop", detail: "Designed low-code workflow automations and approval processes; integrated with SAP applications and external services." },
              { name: "SAP Adoption Lab: End-to-End IDP", detail: "Hands-on with SAP AI Core + SAP Document AI for intelligent document processing — automated extraction and validation in BTP." },
              { name: "SAP Adoption Lab: Central Entry Dashboard", detail: "Built centralized digital workplace with SAP Build Work Zone + SAP Mobile Start — role-based content management and unified app access." }
            ]
          }
        ].map((exp, index, arr) => (
          <div key={exp.role + '-' + exp.company} className="relative group">
            {/* Timeline line — drawn for every entry except the last */}
            {index !== arr.length - 1 && (
              <div className="absolute left-6 top-16 bottom-[-2rem] w-px bg-gradient-to-b from-cyan-500/70 via-cyan-400/40 to-transparent"></div>
            )}

            <div className="relative pl-16">
              {/* Timeline dot */}
              <div className={`absolute left-0 top-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                exp.isActive
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/25'
                  : exp.type === 'education'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-yellow-500/25'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/25'
              }`}>
                {exp.isActive ? (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                ) : exp.type === 'education' ? (
                  <span className="text-base">🎓</span>
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      {exp.isActive && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                          Current
                        </span>
                      )}
                      {exp.type === 'education' && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                          Education
                        </span>
                      )}
                    </div>
                    <div className="text-lg text-cyan-200 font-medium mb-1">{exp.company}</div>
                    <div className="text-sm text-cyan-200/60">{exp.location}</div>
                  </div>
                  <div className="flex flex-col items-start lg:items-end">
                    <div className="text-cyan-400 font-medium">{exp.period}</div>
                    <div className="text-sm text-cyan-200/60 mt-1">{exp.duration}</div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-2">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-200 rounded-full border border-cyan-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-3">
                    {exp.type === 'education' ? 'Highlights' : 'Key Responsibilities'}
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-3 text-cyan-100/90 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects under this role */}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-3">
                      {exp.type === 'education' ? 'Academic Projects' : 'Projects Delivered'}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {exp.projects.map((p) => (
                        <div key={p.name} className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                          <div className="text-sm font-semibold text-white mb-1">{p.name}</div>
                          <div className="text-xs text-cyan-100/70 leading-relaxed">{p.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workshops / Adoption Labs (Education entry only) */}
                {"workshops" in exp && exp.workshops && exp.workshops.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                      <span>🧪</span> Workshops &amp; Adoption Labs
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {exp.workshops.map((w) => (
                        <div key={w.name} className="p-3 rounded-lg bg-yellow-500/[0.05] border border-yellow-500/20">
                          <div className="text-sm font-semibold text-white mb-1">{w.name}</div>
                          <div className="text-xs text-yellow-100/80 leading-relaxed">{w.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats — honest, resume-aligned */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">4</div>
            <div className="text-sm text-cyan-200/70">Professional Roles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">3</div>
            <div className="text-sm text-cyan-200/70">Organizations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">15+</div>
            <div className="text-sm text-cyan-200/70">Projects (Work + Academic + Self-built)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">3.53</div>
            <div className="text-sm text-cyan-200/70">GPA · First-Class Honors</div>
          </div>
        </div>
      </div>
    </div>
  )
},projects: {
  content: (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-3xl font-bold text-white mb-2 px-4">Featured Projects</h2>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" style={{ width: "100%" }}></div>
        </div>
        <p className="text-cyan-200/70 mt-4 max-w-2xl mx-auto">
          Showcase of technical projects demonstrating expertise in AI, automation, and full-stack development.
        </p>
      </div>

      {/* Main Projects Grid */}
      <div className="overflow-x-auto">
  <div className="grid lg:grid-cols-2 gap-8 mb-16 min-w-[340px]">
        {[
          {
            title: "Sunrise LINE Bots Suite — Self-built Production System",
            role: "Founder & Solo Builder",
            period: "2025 - Present",
            description: "End-to-end 2-bot LINE OA suite (KaiJa + Stock Sunrise) automating daily cafe operations — expense tracking, stock management, customer order intake, slip OCR payment, and Flex-based reporting. Designed, built, deployed, and operated solo to validate enterprise automation patterns at hobby scale and transfer the same architecture back into RPA at AIS.",
            image: "/project-sunrise.jpg",
            category: "Personal / Production System",
            status: "In Production · 16+ weeks",
            automationImpact: {
              title: "Solo-Built Production-Grade LINE Bot Suite",
              beforeAfter: {
                before: "Daily bookkeeping + stock entry took ~30 min/day with frequent missed records",
                after: "Reduced to ~5 min/day with zero silent webhook failures over 16+ weeks of continuous operation"
              },
              businessValue: "~83% reduction in manual effort — pattern library reused directly in enterprise UiPath workflows at AIS",
              processImprovement: "Validated Reply-200-First, idempotent webhook, and defer queue patterns at production scale before bringing them into the enterprise"
            },
            features: [
              "Reply-200-First webhook architecture sustaining P95 < 1.5s on serverless runtime",
              "Idempotent webhook processing with CacheService-based deduplication",
              "Defer queue pattern for tasks > 60s (slip OCR pipeline) with retry + dead-letter handling",
              "Adaptive Flex Message renderer with 1.2s build budget and 50KB payload guard",
              "3-tab Rich Menu using Switch Alias API for instant client-side navigation",
              "Per-user state machine for multi-step conversation flows with auto-expiring sessions",
              "Structured logging (TRACE/INFO/WARN/ERROR) with persistent error sheet"
            ],
            tech: ["Google Apps Script", "LINE Messaging API v2", "Flex Messages", "Rich Menu API", "Google Sheets", "CacheService", "JavaScript ES6+"],
            results: [
              { label: "Manual Effort", value: "↓83%", icon: "⏱️" },
              { label: "Silent Failures", value: "0", icon: "✅" },
              { label: "P95 Response", value: "< 1.5s", icon: "⚡" }
            ],
            highlights: ["Self-architected · solo-operated", "Patterns reused in enterprise RPA"]
          },
          {
            title: "BG Alert Automation (SAP Bank Guarantee)",
            role: "ERP Developer & Automation Engineer",
            period: "AIS · Sep 2025 - Present",
            description: "Automated monitoring process for Bank Guarantee expiration in SAP S/4HANA. Extracts BG information from SAP Web GUI, classifies guarantees by expiration window (30 days / 7 days / expired), and generates + distributes targeted email notifications to stakeholders. Replaces a manual compliance-monitoring workflow.",
            image: "/project-bg-alert.jpg",
            category: "Financial Process Automation · SAP S/4HANA",
            status: "Production",
            automationImpact: {
              title: "Enterprise SAP Compliance Automation",
              beforeAfter: {
                before: "Manual periodic checking of BG expirations across SAP — error-prone and slow to react",
                after: "Automated daily monitoring with classified notifications routed to the right stakeholder group"
              },
              businessValue: "Reduced manual compliance-monitoring effort and improved BG return-process discipline",
              processImprovement: "Transformed periodic manual review into continuous, auditable monitoring with email-traceable evidence"
            },
            features: [
              "BG data extraction from SAP Web GUI with validation",
              "Classification logic for 30d / 7d / expired buckets",
              "Grouping + reporting per business unit",
              "Outlook email distribution with structured content",
              "Exception handling and run-level logging"
            ],
            tech: ["UiPath", "SAP Web GUI", "SAP S/4HANA", "Excel Automation", "Outlook Automation"],
            results: [
              { label: "Coverage", value: "Daily", icon: "📅" },
              { label: "Manual Monitoring", value: "Eliminated", icon: "🚫" },
              { label: "Audit Trail", value: "Full", icon: "📋" }
            ],
            highlights: ["SAP S/4HANA financial workflow", "Compliance-grade automation"]
          },
          {
            title: "Payment Advice Automation (Power Automate + AI Builder OCR)",
            role: "ERP Developer & Automation Engineer",
            period: "AIS · Sep 2025 - Present",
            description: "End-to-end Power Automate Cloud Flow with AI Builder OCR — extracts payment data from incoming documents, validates against SAP, and auto-generates + distributes payment advice via email. Combines Microsoft Power Platform automation with intelligent document processing inside a regulated finance workflow.",
            image: "/project-payment-advice.jpg",
            category: "Document AI · Power Platform · Finance Automation",
            status: "Production",
            automationImpact: {
              title: "Intelligent Document Processing in a Finance Workflow",
              beforeAfter: {
                before: "Payment advice manually keyed and emailed — error-prone, slow, no audit trail",
                after: "OCR-driven extraction + SAP validation + automated email distribution with structured logging"
              },
              businessValue: "Reduced manual data entry effort and improved payment communication accuracy and timeliness",
              processImprovement: "Shifted payment communication from a manual back-office task to a self-running, auditable workflow"
            },
            features: [
              "AI Builder OCR for payment data extraction from incoming documents",
              "Field-level validation against SAP master data",
              "Auto-generation of payment advice content per beneficiary",
              "Outlook distribution with delivery tracking",
              "Excel-based reconciliation and audit log"
            ],
            tech: ["Power Automate Cloud", "AI Builder (OCR)", "SAP", "Outlook", "Excel"],
            results: [
              { label: "OCR Platform", value: "AI Builder", icon: "⚡" },
              { label: "Manual Entry", value: "Reduced", icon: "📉" },
              { label: "Delivery", value: "Auto-Distributed", icon: "📧" }
            ],
            highlights: ["Power Platform OCR mastery", "Finance-grade audit trail"]
          },
          {
            title: "Market Rate Maintenance (THOR & SOFR) — SAP S/4HANA OB83",
            role: "ERP Developer",
            period: "AIS · Sep 2025 - Present",
            description: "Enhanced SAP S/4HANA market rate maintenance process in transaction OB83 to support both THOR and SOFR reference rates. Redesigned the rate classification logic to use Reference fields instead of date-based identification — improving accuracy and maintainability of financial rate management.",
            image: "/project-thor-sofr.jpg",
            category: "SAP S/4HANA · Financial ERP Development",
            status: "Production",
            automationImpact: {
              title: "Direct SAP S/4HANA Financial Process Enhancement",
              beforeAfter: {
                before: "Date-based rate identification — fragile and hard to maintain as new reference rates are introduced",
                after: "Reference-field-based classification — supports both THOR and SOFR cleanly and is extensible to future rates"
              },
              businessValue: "Improved accuracy of financial rate management and reduced operational risk of misclassification",
              processImprovement: "Modernized rate management aligned with the THOR/SOFR transition, with cleaner logic for finance teams"
            },
            features: [
              "OB83 enhancement supporting THOR + SOFR rates",
              "Reference-field-based rate classification (replaced date-based)",
              "Backward-compatible with existing rate data",
              "Business-validated test scenarios with finance users",
              "Documented change for downstream financial processes"
            ],
            tech: ["SAP S/4HANA", "OB83", "API Integration", "Financial Process Automation"],
            results: [
              { label: "Rate Types", value: "THOR + SOFR", icon: "💱" },
              { label: "Classification", value: "Reference-based", icon: "🎯" },
              { label: "Maintainability", value: "Improved", icon: "🔧" }
            ],
            highlights: ["Direct S/4HANA development", "Financial domain expertise"]
          },
          {
            title: "Real-time Computer Vision Pipeline (YOLOv5)",
            role: "Computer Vision Developer",
            period: "Feb 2024 - Apr 2024",
            description: "High-throughput image classification pipeline using YOLOv5 + OCR for content validation and false-positive reduction — applicable to content moderation, image quality QA, and large-scale visual data verification.",
            image: "/project-traffic-light.jpg",
            category: "Computer Vision / Content QA",
            status: "Completed",
            // Enhanced Automation Impact
            automationImpact: {
              title: "Intelligent IVMS False Alarm Reduction",
              beforeAfter: {
                before: "Manual verification of traffic violations with 40% false positive rate",
                after: "Automated AI detection with 92.5% accuracy, reducing false alarms by 65%"
              },
              businessValue: "Saved ~120 hours/month in manual review time for fleet management teams",
              processImprovement: "Transformed reactive violation checking into proactive, real-time monitoring"
            },
            features: [
              "YOLOv5 model trained on 20 real Thai traffic scenarios",
              "OCR integration with EasyOCR for GPS coordinate extraction",
              "Geopy distance calculation with 60-meter proximity threshold",
              "Automated CSV/database logging system",
              "Real-time video processing pipeline"
            ],
            tech: ["YOLOv5", "Python", "OpenCV", "EasyOCR", "Geopy", "GPS"],
            results: [
              { label: "Model Accuracy", value: "92.5%", icon: "🎯" },
              { label: "OCR Accuracy", value: "81%", icon: "📝" },
              { label: "False Alarms", value: "↓65%", icon: "✅" }
            ],
            highlights: ["Award-winning accuracy", "Real-world deployment ready"]
          },
          {
            title: "Document Intelligence Pipeline (OCR + Validation)",
            role: "RPA Developer",
            period: "Mar 2024",
            description: "End-to-end document processing pipeline extracting structured data from heterogeneous sources (PDF, scanned forms, handwriting) using OCR + regex + validation rules — a pattern directly transferable to receipt, invoice, and document automation at scale.",
            image: "/project-purchase-reader.jpg",
            category: "Document AI / Data Extraction",
            status: "Completed",
            // Enhanced Automation Impact
            automationImpact: {
              title: "Document Processing Automation Revolution",
              beforeAfter: {
                before: "Manual data entry from purchase orders: 4-6 minutes per document, 15% error rate",
                after: "Automated extraction with 98.34% accuracy in under 30 seconds per document"
              },
              businessValue: "Eliminated ~80 hours/month of manual data entry work",
              processImprovement: "Reduced processing time by 90% while improving accuracy by 83%"
            },
            features: [
              "Multi-format document processing (PDF, scanned images, handwriting)",
              "Advanced OCR with Tesseract and regex pattern matching",
              "Intelligent error detection and exception handling",
              "Real-time accuracy dashboard and reporting",
              "Scalable workflow architecture"
            ],
            tech: ["UiPath", "OCR", "Regex", "Excel", "SQL Server"],
            results: [
              { label: "OCR Accuracy", value: "80.87%", icon: "👁️" },
              { label: "Data Extraction", value: "98.34%", icon: "📊" },
              { label: "Time Saved", value: "90%", icon: "⚡" }
            ],
            highlights: ["Enterprise-grade accuracy", "Significant time savings"]
          },
          {
            title: "Multi-Source Inventory Sync API",
            role: "Automation Developer",
            period: "Jul 2024",
            description: "Real-time data synchronization service between a central PostgreSQL source-of-truth and an external distribution channel via authenticated REST APIs — scheduled, idempotent, with alerting. Same pattern used in supplier feed ingestion and content distribution across OTAs.",
            image: "/project-tiktok-api.jpg",
            category: "API Integration / Data Pipeline",
            status: "Completed",
            // Enhanced Automation Impact
            automationImpact: {
              title: "Real-time Inventory Sync Automation",
              beforeAfter: {
                before: "Manual inventory updates 2-3 times daily, frequent overselling incidents",
                after: "Automated 10-minute interval updates with zero overselling incidents"
              },
              businessValue: "Prevented revenue loss from overselling, improved customer satisfaction",
              processImprovement: "Eliminated 100% of manual inventory management tasks"
            },
            features: [
              "Secure TikTok Shop API authentication and integration",
              "Real-time PostgreSQL database synchronization",
              "Automated 10-minute interval updates via CronJob",
              "Comprehensive error logging and email alerting",
              "JSON data transformation pipeline"
            ],
            tech: ["Python", "REST API", "JSON", "CronJob", "PostgreSQL"],
            results: [
              { label: "Oversell Issues", value: "0%", icon: "🚫" },
              { label: "Manual Work", value: "↓100%", icon: "🤖" },
              { label: "Reliability", value: "99.9%", icon: "🔒" }
            ],
            highlights: ["Zero oversell incidents", "Fully automated workflow"]
          },
          {
            title: "Smart Pill Dispenser",
            role: "Embedded System Developer",
            period: "Jan 2023 - May 2023",
            description: "Award-winning IoT medication dispenser with intelligent scheduling, database integration, and embedded UI system",
            image: "/project-pill-dispenser.jpg",
            category: "IoT/Embedded",
            status: "Award Winner",
            // Enhanced Automation Impact
            automationImpact: {
              title: "Healthcare Automation Innovation",
              beforeAfter: {
                before: "Manual medication scheduling with 30% adherence rate, frequent missed doses",
                after: "Automated dispensing with smart reminders achieving 95% medication adherence"
              },
              businessValue: "Potential to reduce healthcare costs by improving patient compliance",
              processImprovement: "Transformed medication management from manual tracking to intelligent automation"
            },
            features: [
              "PostgreSQL database for medication and patient management",
              "C# REST API for device-cloud communication",
              "LVGL-based embedded UI with touch interface",
              "Precision stepper motor control with RTC timing",
              "WiFi connectivity and remote monitoring capabilities"
            ],
            tech: ["PostgreSQL", "C#", "LVGL", "IoT", "Stepper Motor", "RTC", "PlatformIO"],
            results: [
              { label: "Faculty Award", value: "Outstanding", icon: "🏆" },
              { label: "Adherence Rate", value: "95%", icon: "🎯" },
              { label: "Future Ready", value: "Telehealth", icon: "🚀" }
            ],
            highlights: ["Faculty recognition", "Healthcare innovation"]
          },
          {
            title: "Portfolio Website",
            role: "Full-Stack Developer",
            period: "Current Project",
            description: "Modern, responsive portfolio website featuring advanced animations, interactive components, and optimized user experience",
            image: "/project-portfolio.jpg",
            category: "Web Development",
            status: "In Progress",
            // Enhanced Automation Impact
            automationImpact: {
              title: "Development Workflow Optimization",
              beforeAfter: {
                before: "Static portfolio with basic HTML/CSS, manual deployment processes",
                after: "Dynamic React application with automated build pipeline and CI/CD integration"
              },
              businessValue: "Enhanced professional presence with 300% faster loading times",
              processImprovement: "Automated deployment reduces update time from hours to minutes"
            },
            features: [
              "Responsive design with advanced CSS animations",
              "Interactive React components with hooks and state management",
              "Smooth transitions and parallax effects",
              "Skills visualization with radar charts",
              "Three.js integration for 3D elements",
              "Contact form with email integration"
            ],
            tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
            results: [
              { label: "Performance", value: "↑300%", icon: "⚡" },
              { label: "User Experience", value: "Enhanced", icon: "✨" },
              { label: "Deploy Time", value: "↓95%", icon: "📱" }
            ],
            highlights: ["Modern tech stack", "Performance focused"]
          }
        ].map((project) => (
          <div key={project.title} className="group relative">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

            <div className="relative p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
              {/* Project Image with Enhanced Overlay */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                
                {/* Enhanced Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="px-3 py-1 rounded-full bg-cyan-500/90 backdrop-blur-sm">
                    <span className="text-white text-xs font-medium">{project.role}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-white text-xs font-medium">{project.category}</span>
                  </div>
                </div>
                
                {/* Status and Period */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                  <div className={`px-3 py-1 rounded-full backdrop-blur-sm ${
                    project.status === 'Award Winner' ? 'bg-yellow-500/90' :
                    project.status === 'In Progress' ? 'bg-green-500/90' : 'bg-blue-500/90'
                  }`}>
                    <span className="text-white text-xs font-medium">{project.status}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-white text-xs font-medium">{project.period}</span>
                  </div>
                </div>

                {/* Project Highlights */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                  {project.highlights.map((highlight) => (
                    <span key={highlight} className="px-2 py-1 text-xs rounded bg-cyan-400/20 text-cyan-100 backdrop-blur-sm">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors truncate">
  {project.title}
</h3>
                <p className="text-cyan-200/70 leading-relaxed">{project.description}</p>
              </div>

              {/* NEW: Automation Impact Section */}
              <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-400">
                <h4 className="text-cyan-400 font-bold text-sm mb-3 flex items-center gap-2">
                  <span>🚀</span> {project.automationImpact.title}
                </h4>
                
                {/* Before/After Comparison */}
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 text-xs">❌ BEFORE</span>
                    </div>
                    <p className="text-xs text-cyan-200/70 leading-relaxed">
                      {project.automationImpact.beforeAfter.before}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-xs">✅ AFTER</span>
                    </div>
                    <p className="text-xs text-cyan-200/70 leading-relaxed">
                      {project.automationImpact.beforeAfter.after}
                    </p>
                  </div>
                </div>

                {/* Business Value & Process Improvement */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 text-xs mt-0.5">💰</span>
                    <p className="text-xs text-cyan-200/80 font-medium">
                      {project.automationImpact.businessValue}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 text-xs mt-0.5">⚡</span>
                    <p className="text-xs text-cyan-200/80 font-medium">
                      {project.automationImpact.processImprovement}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Results Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {project.results.map((result) => (
                  <div key={result.label} className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-lg mb-1">{result.icon}</div>
                    <div className="text-cyan-400 font-bold text-sm">{result.value}</div>
                    <div className="text-xs text-cyan-200/60 leading-tight">{result.label}</div>
                  </div>
                ))}
              </div>

              {/* Expandable Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-cyan-400 mb-3 flex items-center gap-2">
                  <span>🔧</span> Key Features
                </h4>
                <ul className="space-y-2">
                  {project.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-cyan-100/80">
                      <span className="text-cyan-400 mt-1 text-xs">▶</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-sm text-cyan-200/60 italic ml-5">
                      <button className="hover:text-cyan-300 transition-colors">
                        +{project.features.length - 3} more features... (click to expand)
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {/* Enhanced Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                  <span>⚡</span> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-white/5 to-white/10 text-cyan-200/90 border border-white/10 hover:border-cyan-400/50 transition-all hover:bg-white/15 cursor-default truncate max-w-[120px]">
  {tech}
</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Mini Projects Section */}
      <div className="border-t border-white/10 pt-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Additional Projects</h3>
          <p className="text-cyan-200/60">Other notable projects and learning experiences</p>
        </div>
        
        <div className="overflow-x-auto">
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 min-w-[340px]">
          {[
            {
              title: "Logistics Management System",
              tech: "C Programming",
              description: "Console-based logistics tracking system with data structures",
              icon: "📦",
              impact: "Improved tracking efficiency by 40%"
            },
            {
              title: "Campus Bus Tracking",
              tech: "Python, JavaScript",
              description: "Real-time bus location tracking for university campus",
              icon: "🚌",
              impact: "Reduced student wait time by 60%"
            },
            {
              title: "Smart Farm Auto Watering",
              tech: "Arduino",
              description: "IoT-based automatic irrigation system with sensors",
              icon: "🌱",
              impact: "Saved 70% water consumption"
            },
            {
              title: "Microprocessor Control",
              tech: "Assembly Language",
              description: "Low-level hardware control and optimization",
              icon: "🔧",
              impact: "Achieved 15% performance boost"
            }
          ].map((project) => (
            <div key={project.title} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{project.icon}</div>
              <h4 className="text-white font-medium mb-2">{project.title}</h4>
              <p className="text-cyan-200/60 text-sm mb-3">{project.description}</p>
              <div className="space-y-2">
                <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">{project.tech}</span>
                <div className="text-xs text-green-400 font-medium flex items-center gap-1">
                  <span>📈</span> {project.impact}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
},  "automation portfolio": {
  content: (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
       {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-3xl font-bold text-white mb-2 px-4">Automation Portfolio</h2>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" style={{ width: "100%" }}></div>
        </div>
        <p className="text-cyan-200/70 mt-4 max-w-2xl mx-auto">
          Comprehensive automation solutions that streamline business processes and deliver measurable ROI.
        </p>
      </div>
      <div className="relative">
        

        {/* Portfolio Projects */}
        <div className="space-y-12">
          
          {/* Project 1: Purchase Reader Bot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors duration-200 hover:shadow-2xl hover:shadow-cyan-500/20">
              {/* Project Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.15 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl"
                  >
                    📄
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Purchase Reader Bot</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium">UiPath</span>
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium">OCR</span>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium">Excel VBA</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="flex items-center gap-2 text-cyan-400 font-semibold"
                >
                  <span>⚡</span>
                  <span>50+ hrs/month saved</span>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Overview */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="lg:col-span-1 space-y-4"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                      <span>🎯</span> Challenge
                    </h4>
                    <p className="text-blue-100/80 leading-relaxed text-sm">
                      Manual data entry took ~10 minutes per PO with ~10% human error rate, creating bottlenecks in procurement workflow.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <span>⚡</span> Solution
                    </h4>
                    <p className="text-green-100/80 leading-relaxed text-sm">
                      Developed UiPath workflow with advanced OCR that extracts and validates PO data automatically with 98.34% accuracy.
                    </p>
                  </div>
                </motion.div>

                {/* Middle Column - Process Flow */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    <span>🔄</span> Process Flow
                  </h4>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Document Capture", icon: "📥" },
                      { step: "2", text: "OCR Processing", icon: "🔍" },
                      { step: "3", text: "Data Validation", icon: "✅" },
                      { step: "4", text: "Excel Integration", icon: "📊" }
                    ].map((item, idx) => (
                      <motion.div 
                        key={item.text}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                        whileHover={{ scale: [1, 1.02, 1], x: 5 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors duration-150"
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">
                          {item.step}
                        </div>
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm text-cyan-100/80">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column - Results */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>📊</span> Results
                  </h4>
                  <div className="space-y-3">
                    {[
                      { metric: "Time Saved", before: "10 min/PO", after: "1 min/PO", improvement: "90% faster" },
                      { metric: "Accuracy", before: "~90%", after: "98.34%", improvement: "95% error reduction" },
                      { metric: "Daily Volume", before: "~50 POs", after: "~500 POs", improvement: "10x capacity" }
                    ].map((result, idx) => (
                      <motion.div 
                        key={result.metric}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                        whileHover={{ scale: [1, 1.02, 1] }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors duration-150"
                      >
                        <div className="text-xs text-cyan-400 font-medium mb-1">{result.metric}</div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-red-300">{result.before}</span>
                          <motion.span 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-cyan-300"
                          >
                            →
                          </motion.span>
                          <span className="text-green-300 font-semibold">{result.after}</span>
                        </div>
                        <div className="text-xs text-cyan-200/60 mt-1">{result.improvement}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Project 2: TikTok Shop Stock Sync */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors duration-200 hover:shadow-2xl hover:shadow-blue-500/20">
              {/* Project Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: [1, 1.02, 1], rotate: -5 }}
                    transition={{ duration: 0.15 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl"
                  >
                    🛒
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">TikTok Shop Stock Sync System</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">Python</span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">REST API</span>
                      <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium">Real-time Sync</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="flex items-center gap-2 text-blue-400 font-semibold"
                >
                  <span>📈</span>
                  <span>70% fewer complaints</span>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Challenge & Solution */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="lg:col-span-1 space-y-4"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                      <span>🎯</span> Challenge
                    </h4>
                    <p className="text-blue-100/80 leading-relaxed text-sm">
                      Manual stock updates caused overselling, customer complaints, and inventory mismatches with 15% error rate.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <span>⚡</span> Solution
                    </h4>
                    <p className="text-green-100/80 leading-relaxed text-sm">
                      Built secure Python integration with TikTok Shop API for real-time inventory synchronization and fallback logic.
                    </p>
                  </div>
                </motion.div>

                {/* Middle Column - Architecture */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    <span>🏗️</span> Architecture
                  </h4>
                  <div className="space-y-3">
                    {[
                      { component: "Database Monitor", icon: "🗄️", desc: "Stock changes detection" },
                      { component: "API Gateway", icon: "🌐", desc: "Secure authentication" },
                      { component: "Sync Engine", icon: "⚡", desc: "Real-time updates" },
                      { component: "Error Handler", icon: "🛡️", desc: "Fallback mechanisms" }
                    ].map((item, idx) => (
                      <motion.div 
                        key={item.component}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                        whileHover={{ scale: [1, 1.02, 1], x: 5 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors duration-150"
                      >
                        <span className="text-lg mt-1">{item.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-blue-300">{item.component}</div>
                          <div className="text-xs text-cyan-100/60">{item.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column - Business Impact */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>💼</span> Business Impact
                  </h4>
                  <div className="space-y-3">
                    {[
                      { metric: "Update Frequency", improvement: "From daily → Real-time", icon: "🔄" },
                      { metric: "Stock Accuracy", improvement: "15% → <1% error rate", icon: "🎯" },
                      { metric: "Customer Satisfaction", improvement: "70% fewer complaints", icon: "😊" },
                      { metric: "Staff Time", improvement: "3 hours/day saved", icon: "⏰" }
                    ].map((impact, idx) => (
                      <motion.div 
                        key={impact.metric}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                        whileHover={{ scale: [1, 1.02, 1] }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{impact.icon}</span>
                          <span className="text-xs text-blue-400 font-medium">{impact.metric}</span>
                        </div>
                        <div className="text-sm text-green-300 font-semibold">{impact.improvement}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Project 3: AI Traffic Light Detection */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors duration-200 hover:shadow-2xl hover:shadow-purple-500/20">
              {/* Project Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: [1, 1.02, 1], rotate: 5 }}
                    transition={{ duration: 0.15 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl"
                  >
                    🚦
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">AI Traffic Light Detection System</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">YOLOv5</span>
                      <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm font-medium">OpenCV</span>
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm font-medium">OCR + GPS</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="flex items-center gap-2 text-purple-400 font-semibold"
                >
                  <span>🎯</span>
                  <span>90%+ AI accuracy</span>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - AI Pipeline */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>🤖</span> AI Pipeline
                  </h4>
                  <div className="space-y-3">
                    {[
                      { stage: "Detection", tech: "YOLOv5", desc: "Traffic light identification", icon: "🔍" },
                      { stage: "Extraction", tech: "OCR", desc: "GPS data processing", icon: "📍" },
                      { stage: "Validation", tech: "Spatial", desc: "60m radius verification", icon: "📏" },
                      { stage: "Reporting", tech: "Database", desc: "Automated logging", icon: "📊" }
                    ].map((step, idx) => (
                      <motion.div 
                        key={step.stage}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                        whileHover={{ scale: [1, 1.02, 1], x: 5 }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{step.icon}</span>
                          <span className="text-sm font-medium text-purple-300">{step.stage}</span>
                          <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-200">{step.tech}</span>
                        </div>
                        <div className="text-xs text-cyan-100/60">{step.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Middle Column - Challenge & Solution */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="lg:col-span-1 space-y-4"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                      <span>🎯</span> Challenge
                    </h4>
                    <p className="text-blue-100/80 leading-relaxed text-sm">
                      Manual traffic monitoring was inefficient, prone to errors, and missed critical violation events.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <span>⚡</span> Innovation
                    </h4>
                    <p className="text-green-100/80 leading-relaxed text-sm">
                      Combined computer vision (YOLOv5) with GPS spatial validation to create an intelligent monitoring system with 90%+ accuracy.
                    </p>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                  >
                    <div className="text-sm font-medium text-purple-300 mb-2">Key Innovation</div>
                    <div className="text-xs text-purple-100/80">Spatial verification within 60m radius ensures location accuracy and reduces false positives</div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Technical Achievement */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>🏆</span> Achievement
                  </h4>
                  <div className="space-y-3">
                    {[
                      { metric: "AI Accuracy", value: "90%+", comparison: "vs 70% manual", icon: "🎯" },
                      { metric: "Processing Time", value: "1 min", comparison: "vs 15 min manual", icon: "⚡" },
                      { metric: "Monthly Savings", value: "100+ hrs", comparison: "Automated workflow", icon: "⏰" },
                      { metric: "Location Precision", value: "60m GPS", comparison: "Spatial validation", icon: "📍" }
                    ].map((achievement, idx) => (
                      <motion.div 
                        key={achievement.metric}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                        whileHover={{ scale: [1, 1.02, 1] }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{achievement.icon}</span>
                          <span className="text-xs text-purple-400 font-medium">{achievement.metric}</span>
                        </div>
                        <div className="text-sm text-green-300 font-semibold">{achievement.value}</div>
                        <div className="text-xs text-cyan-200/60">{achievement.comparison}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Project 4: Smart Pill Dispenser */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-200 hover:shadow-2xl hover:shadow-green-500/20">
              {/* Project Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-2xl"
                  >
                    💊
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Smart Pill Dispenser IoT System</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium">C# + IoT</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium">PostgreSQL</span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">LVGL UI</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center gap-2 text-green-400 font-semibold"
                >
                  <span>📅</span>
                  <span>60% fewer missed doses</span>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                                {/* Left Column - System Architecture */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>🏗️</span> System Architecture
                  </h4>
                  <div className="space-y-3">
                    {[
                      { component: "IoT Hardware", tech: "C# Core", desc: "Device control logic", icon: "🔧" },
                      { component: "Database", tech: "PostgreSQL", desc: "Schedule & history", icon: "🗄️" },
                      { component: "User Interface", tech: "LVGL", desc: "Touch screen UI/UX", icon: "📱" },
                      { component: "Alert System", tech: "Multi-channel", desc: "SMS + Audio + Visual", icon: "🔔" }
                    ].map((system, idx) => (
                      <motion.div 
                        key={system.component}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        whileHover={{ scale: [1, 1.02, 1], transition: { duration: 0.2 } }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/30 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{system.icon}</span>
                          <span className="text-sm font-medium text-green-300">{system.component}</span>
                          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-200">{system.tech}</span>
                        </div>
                        <div className="text-xs text-cyan-100/60">{system.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Middle Column - Challenge & Solution */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="lg:col-span-1 space-y-4"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                      <span>🎯</span> Healthcare Challenge
                    </h4>
                    <p className="text-blue-100/80 leading-relaxed text-sm">
                      Medication non-adherence affects 50% of patients, leading to health complications and increased healthcare costs.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <span>⚡</span> Smart Solution
                    </h4>
                    <p className="text-green-100/80 leading-relaxed text-sm">
                      Developed IoT-enabled dispenser with intelligent scheduling, multi-modal alerts, and comprehensive tracking system.
                    </p>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                  >
                    <div className="text-sm font-medium text-green-300 mb-2">Healthcare Impact</div>
                    <div className="text-xs text-green-100/80">Reduces medication errors and improves patient compliance through automation and intelligent reminders</div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Patient Benefits */}
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                    <span>👥</span> Patient Benefits
                  </h4>
                  <div className="space-y-3">
                    {[
                      { benefit: "Adherence Rate", improvement: "60% fewer missed doses", icon: "📅" },
                      { benefit: "User Experience", improvement: "Intuitive touch interface", icon: "👆" },
                      { benefit: "Peace of Mind", improvement: "Real-time notifications", icon: "💚" },
                      { benefit: "Data Insights", improvement: "Comprehensive reporting", icon: "📊" }
                    ].map((item, idx) => (
                      <motion.div 
                        key={item.benefit}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        whileHover={{ scale: [1, 1.02, 1], transition: { duration: 0.2 } }}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/30 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{item.icon}</span>
                          <span className="text-xs text-green-400 font-medium">{item.benefit}</span>
                        </div>
                        <div className="text-sm text-green-300 font-semibold">{item.improvement}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-2xl font-bold text-white mb-4"
              >
                Ready to Automate Your Business Processes?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-cyan-100/80 mb-6 max-w-lg mx-auto"
              >
                Transform your workflows with custom automation solutions that deliver measurable ROI and operational efficiency.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-colors duration-200 shadow-lg transform-gpu"
  onClick={() => handleSectionChange("contact")} // เพิ่มบรรทัดนี้
>
  🚀 Start Your Automation Journey
</motion.button>
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
  className="px-8 py-4 border border-cyan-500/50 text-cyan-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10 transition-colors duration-200 transform-gpu"
  onClick={() => handleSectionChange("projects")} // เพิ่มบรรทัดนี้
>
  📋 View More Projects
</motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
},
    contact: {
  content: (
    <div className="relative">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-3xl font-bold text-white mb-2 px-4">Contact</h2>
          <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" style={{ width: "100%" }}></div>
        </div>
        <p className="text-cyan-200/70 mt-4 max-w-2xl mx-auto">
          Let&apos;s connect and discuss how I can help streamline your processes.
        </p>
      </div>
      <div className="relative space-y-12">
        {/* Main Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Let&apos;s Build Something Great
              </h2>
              <p className="text-cyan-100/80">
                Looking for automation expertise? Let&apos;s discuss how I can help streamline your processes.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm resize-none"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>

              <EnhancedButton
                variant="primary"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
                icon={<span>📧</span>}
                type="submit"
              >
                Send Message
              </EnhancedButton>
            </form>

            {/* Quick Response Promise */}
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <span className="text-green-400">⚡</span>
                <div>
                  <div className="text-green-300 font-semibold text-sm">24-Hour Response</div>
                  <div className="text-green-100/80 text-xs">I&apos;ll get back to you within one business day</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <p className="text-cyan-100/80">
                <strong className="text-white">Kanokporn Hudsree (Lay)</strong><br/>
                Ready to discuss automation opportunities and innovative solutions.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: "Laybabaka2@gmail.com",
                  action: "mailto:Laybabaka2@gmail.com"
                },
                {
                  icon: "📱",
                  label: "Phone",
                  value: "+66 (096) 856-6296",
                  action: "tel:+66968566296"
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Bangkok, Thailand"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="group relative"
                >
                  <div 
                    className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => item.action && window.open(item.action)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs text-cyan-200/60">{item.label}</div>
                        <div className="font-medium text-sm">{item.value}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Professional Links */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "👩‍💻", label: "GitHub", url: "https://github.com/LayKanokporn" },
                { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/laykanokporn" },
                { icon: "📄", label: "Resume", url: "/resume.pdf" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xl mb-1">{social.icon}</div>
                  <div className="text-xs text-cyan-200/60">{social.label}</div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Streamlined Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              My Automation Approach
            </h2>
            <p className="text-cyan-100/80 max-w-2xl mx-auto">
              I build automation that works reliably and delivers measurable business value.
            </p>
          </div>

          {/* Streamlined Process */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: "🔍",
                title: "Analyze",
                description: "Identify bottlenecks and repetitive tasks"
              },
              {
                icon: "⚡",
                title: "Automate", 
                description: "Build scalable, maintainable solutions"
              },
              {
                icon: "📈",
                title: "Optimize",
                description: "Track performance and continuous improvement"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold text-cyan-300 mb-2">{step.title}</h3>
                <p className="text-sm text-cyan-100/70">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-xl">🎯</span>
                <h3 className="font-bold text-cyan-300">Ready for New Opportunities</h3>
              </div>
              <p className="text-cyan-100/90 leading-relaxed">
                <strong className="text-cyan-400">Looking for roles in process automation and tech innovation.</strong><br/>
                <span className="text-cyan-100/70">Let&apos;s connect and explore how I can contribute to your team.</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
const onScroll = () => {
  const currentScrollY = window.scrollY;
  setScrolled(currentScrollY > 20);
  // setLastScrollY(currentScrollY);  // <-- ลบบรรทัดนี้ออก
  setShowBackToTop(currentScrollY > 400);

      // Section highlight logic
      const offsets = Object.entries(sectionRefs).map(([key, ref]) => ({
        key,
        offset: ref.current ? ref.current.getBoundingClientRect().top + window.scrollY : 0,
      }));
      const scrollPos = window.scrollY + 120; // adjust for header height
      let current = "about";
      for (let i = 0; i < offsets.length; i++) {
        if (scrollPos >= offsets[i].offset) current = offsets[i].key;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to section
const handleSectionChange = (section: string) => {
  setActiveSection(section.toLowerCase());
  setIsMenuOpen(false);
  const ref = sectionRefs[section.toLowerCase() as keyof typeof sectionRefs];
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
   const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
     return (
    <ParallaxBackground>
      <div className="min-h-screen text-white">
        {/* Floating Hire Button - fixed at bottom left of the whole page */}
        <div style={{ position: "fixed", bottom: 32, left: 32, zIndex: 40 }}>
          <FloatingHireButton
            onClick={() => handleSectionChange("Contact")}
          />
        </div>

        <div className="relative">
          <AnimatedMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            menuItems={menuItems}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          <AnimatedHeader
            scrolled={scrolled}
            menuItems={menuItems}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
          />

          {/* Render each section with ref for scroll tracking */}
{Object.entries(contentSections).map(([key, section]) => (
  <div
  key={key}
  ref={sectionRefs[key as keyof typeof sectionRefs]}
  className="min-h-screen px-3 py-6 sm:px-6 sm:py-12 lg:px-24 lg:py-16 relative mb-8 sm:mb-12 lg:mb-16"
  style={{ scrollMarginTop: 96 }}
  id={key.replace(/\s+/g, '-')}
>
  {section.content}
</div>
))}

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-cyan-100/60">
                © {new Date().getFullYear()} Kanokporn Hudsree · Bangkok, Thailand
              </div>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href="https://www.linkedin.com/in/laykanokporn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-200/80 hover:text-cyan-300 transition-colors"
                >
                  LinkedIn
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="https://github.com/LayKanokporn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-200/80 hover:text-cyan-300 transition-colors"
                >
                  GitHub
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="mailto:Laybabaka2@gmail.com"
                  className="text-cyan-200/80 hover:text-cyan-300 transition-colors"
                >
                  Email
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-200/80 hover:text-cyan-300 transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </footer>

          {/* Back to Top Button */}
          {showBackToTop && (
  <button
    onClick={handleBackToTop}
    className="fixed right-8 bottom-32 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-white text-2xl shadow-lg transition-all duration-300"
    aria-label="Back to top"
    style={{ boxShadow: '0 4px 24px 0 rgba(6,182,212,0.25)' }}
  >
    <FaArrowUp />
  </button>
)}
        </div>
      </div>
    </ParallaxBackground>
  );
}