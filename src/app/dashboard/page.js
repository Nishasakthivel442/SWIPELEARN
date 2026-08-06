"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Flame, Star, BookOpen, Target,
    Upload, Clock, ChevronRight, LogOut
} from "lucide-react";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key") {
                router.push("/");
                return;
            }
            await signOut(auth);
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };

    const stats = [
        { label: "Current Streak", value: "5 Days", icon: <Flame className="text-orange-500 w-6 h-6" /> },
        { label: "XP", value: "250", icon: <Star className="text-yellow-400 w-6 h-6" /> },
        { label: "Topics Completed", value: "12", icon: <BookOpen className="text-blue-400 w-6 h-6" /> },
        { label: "Quiz Accuracy", value: "87%", icon: <Target className="text-emerald-400 w-6 h-6" /> },
    ];

    const recentTopics = [
        { title: "Operating Systems — Deadlock", status: "In Progress", time: "2 hours ago" },
        { title: "Data Structures — Trees", status: "Completed", time: "1 day ago" },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />

            <nav className="flex justify-between items-center max-w-6xl mx-auto mb-12 relative z-10">
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">SwipeLearn</div>
                <div className="flex gap-4 items-center">
                    <Link href="/progress" className="text-gray-400 hover:text-white transition">Progress</Link>
                    <Link href="/profile" className="text-gray-400 hover:text-white transition">Profile</Link>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition ml-4">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto space-y-12 relative z-10">
                {/* Header & Main Action */}
                <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl font-bold mb-2">Welcome back, Student 👋</h1>
                        <p className="text-gray-400">Ready to learn something new today?</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <Link
                            href="/upload"
                            className="flex items-center gap-2 bg-[#00E5FF] text-[#020617] px-6 py-4 rounded-2xl font-bold hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all transform hover:scale-105"
                        >
                            <Upload className="w-5 h-5" />
                            Upload Study Material
                        </Link>
                    </motion.div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0F172A] border border-gray-800 p-6 rounded-2xl flex flex-col gap-2 hover:border-[#00E5FF]/30 transition-colors"
                        >
                            <div className="bg-black/30 w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                                {stat.icon}
                            </div>
                            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </motion.div>
                    ))}
                </section>

                {/* Recent & Continue Learning sections */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
                        <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 border border-gray-800 rounded-3xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-3xl" />
                            <h3 className="text-xl font-bold mb-2 z-10 w-3/4">Operating Systems — Deadlock</h3>
                            <p className="text-gray-400 mb-6 z-10 w-3/4 text-sm">Pick up where you left off. 4/12 reels completed.</p>

                            <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                                <div className="bg-[#00E5FF] h-2 rounded-full" style={{ width: '33%' }}></div>
                            </div>

                            <Link href="/learn" className="inline-flex items-center gap-2 text-[#00E5FF] font-semibold group-hover:gap-3 transition-all">
                                Resume Swiping <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <h2 className="text-2xl font-bold mb-6">Recent Topics</h2>
                        <div className="space-y-4">
                            {recentTopics.map((topic, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-[#0F172A] border border-gray-800 rounded-2xl hover:border-gray-700 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-black/30 p-3 rounded-xl"><BookOpen className="w-5 h-5 text-[#00E5FF]" /></div>
                                        <div>
                                            <h4 className="font-semibold">{topic.title}</h4>
                                            <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                                <span className={topic.status === 'Completed' ? 'text-emerald-500' : 'text-blue-400'}>{topic.status}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-white transition bg-gray-800/50 rounded-full">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

            </main>
        </div>
    );
}
