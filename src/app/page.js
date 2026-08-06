"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, FileText, Mic, Brain, Gamepad2, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const features = [
    { icon: <BookOpen className="w-8 h-8 text-[#00E5FF]" />, title: "AI Learning", desc: "Complex concepts distilled automatically." },
    { icon: <FileText className="w-8 h-8 text-[#00E5FF]" />, title: "PDF to Reels", desc: "Upload docs and get swipeable reels." },
    { icon: <Mic className="w-8 h-8 text-[#00E5FF]" />, title: "AI Voice", desc: "Listen to natural explanations." },
    { icon: <Brain className="w-8 h-8 text-[#00E5FF]" />, title: "Smart Quizzes", desc: "Test knowledge right after learning." },
    { icon: <Gamepad2 className="w-8 h-8 text-[#00E5FF]" />, title: "Mini Games", desc: "Gamified retention modules." },
    { icon: <TrendingUp className="w-8 h-8 text-[#00E5FF]" />, title: "Progress Tracking", desc: "Monitor your learning streak." }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-[#00E5FF] selection:text-black">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00E5FF]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Main Nav */}
      <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto z-10 relative">
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">SwipeLearn</div>
        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 text-sm font-medium hover:text-[#00E5FF] transition">Login</Link>
          <Link href="/register" className="px-5 py-2 text-sm font-medium bg-[#0FFF] text-[#020617] rounded-full hover:bg-white shadow-[0_0_15px_rgba(0,229,255,0.4)] transition">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Replace Endless Scrolling <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#00E5FF] to-blue-500 bg-clip-text text-transparent">with Endless Learning.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-3xl">
            Empower Every Swipe with Knowledge. Transform your study materials into short, visual and interactive learning experiences.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/register" className="px-8 py-4 text-lg font-bold bg-[#00E5FF] text-[#020617] rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition duration-300">
              Start Learning
            </Link>
            <Link href="#demo" className="px-8 py-4 text-lg font-bold bg-[#0F172A] border border-gray-700 rounded-full hover:bg-gray-800 transition duration-300">
              Explore Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-[#0F172A]/80 backdrop-blur-sm border border-gray-800 p-8 rounded-3xl hover:border-[#00E5FF]/50 transition-colors group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
