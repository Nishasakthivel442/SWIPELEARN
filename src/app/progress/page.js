"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Flame, Star, BookOpen, Target,
    Clock, Award, ChevronLeft, ShieldCheck, Zap
} from "lucide-react";

export default function ProgressPage() {

    const stats = [
        { label: "Current Streak", value: "5 Days", icon: <Flame className="text-orange-500 w-6 h-6" /> },
        { label: "Total XP", value: "350", icon: <Star className="text-yellow-400 w-6 h-6" /> },
        { label: "Topics Completed", value: "13", icon: <BookOpen className="text-blue-400 w-6 h-6" /> },
        { label: "Quiz Accuracy", value: "92%", icon: <Target className="text-emerald-400 w-6 h-6" /> },
        { label: "Study Time", value: "14h 20m", icon: <Clock className="text-indigo-400 w-6 h-6" /> },
        { label: "Badges Earned", value: "4", icon: <Award className="text-purple-400 w-6 h-6" /> },
    ];

    const recentHistory = [
        { topic: "Operating Systems — Deadlock", type: "Reels & Quiz", xp: "+150", date: "Today" },
        { topic: "Data Structures — Trees", type: "Game Match", xp: "+100", date: "Yesterday" },
        { topic: "Computer Networks — TCP/IP", type: "Reels", xp: "+50", date: "3 days ago" },
    ];

    const badges = [
        { name: "Consistent Learner", desc: "3 Day Streak", icon: <Flame className="w-8 h-8 text-orange-500" />, active: true },
        { name: "Quiz Master", desc: "10 Quizzes Aced", icon: <Target className="w-8 h-8 text-emerald-400" />, active: true },
        { name: "Fast Learner", desc: "1000 XP inside 1 week", icon: <Zap className="w-8 h-8 text-yellow-400" />, active: false },
        { name: "Scholar", desc: "Completed 50 Topics", icon: <ShieldCheck className="w-8 h-8 text-blue-400" />, active: false },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <nav className="max-w-6xl mx-auto w-full mb-12 relative z-10 flex justify-between items-center">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition font-medium">
                    <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                </Link>
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">SwipeLearn</div>
            </nav>

            <main className="max-w-6xl mx-auto space-y-12 relative z-10">

                <header className="mb-10">
                    <h1 className="text-4xl font-bold mb-2">My Progress Tracking</h1>
                    <p className="text-gray-400">Monitor your learning journey and stats.</p>
                </header>

                {/* Stats Grid */}
                <motion.section
                    variants={containerVariants} initial="hidden" animate="visible"
                    className="grid grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i} variants={itemVariants}
                            className="bg-[#0F172A] border border-gray-800 p-6 rounded-3xl flex items-center gap-6 hover:border-[#00E5FF]/30 transition-colors"
                        >
                            <div className="bg-black/30 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 font-medium mb-1">{stat.label}</div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Badges */}
                    <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Award className="text-[#00E5FF]" /> My Achievements</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {badges.map((b, i) => (
                                <div key={i} className={`p-6 rounded-3xl border flex flex-col items-center text-center transition-all ${b.active ? 'bg-[#0F172A] border-[#00E5FF]/20 shadow-[0_0_15px_rgba(0,229,255,0.05)] text-white' : 'bg-[#020617] border-gray-800 opacity-50 grayscale'}`}>
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${b.active ? 'bg-black/40' : 'bg-transparent border border-gray-700'}`}>
                                        {b.icon}
                                    </div>
                                    <h4 className="font-bold mb-1">{b.name}</h4>
                                    <p className="text-xs text-gray-400">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* History */}
                    <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Clock className="text-[#00E5FF]" /> Recent History</h2>
                        <div className="bg-[#0F172A] border border-gray-800 rounded-3xl p-2 overflow-hidden">
                            {recentHistory.map((item, i) => (
                                <div key={i} className={`flex items-center justify-between p-5 ${i !== recentHistory.length - 1 ? 'border-b border-gray-800' : ''} hover:bg-[#020617]/50 transition-colors`}>
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.topic}</h4>
                                        <div className="flex gap-2 text-sm text-gray-500 mt-1">
                                            <span>{item.type}</span> • <span>{item.date}</span>
                                        </div>
                                    </div>
                                    <div className="text-emerald-400 font-bold bg-emerald-400/10 px-4 py-2 rounded-xl">
                                        {item.xp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                </div>

            </main>
        </div>
    );
}
