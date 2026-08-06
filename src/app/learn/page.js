"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Volume2, X, Check, ChevronUp, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LearnPage() {
    const router = useRouter();
    const [reels, setReels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch mock reels directly for rapid prototyping
        // When backend runs, this would fetch from /learning-content
        setReels([
            {
                title: "Overview of Deadlock",
                explanation: "Deadlock occurs when processes wait indefinitely for resources held by each other, bringing the system to a halt.",
                key_points: ["Waiting Processes", "Locked Resources", "No Forward Progress"],
                image_url: "https://images.unsplash.com/photo-1555529944-a0295874ca7e?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Mutual Exclusion",
                explanation: "At least one resource must be held in a non-sharable mode. Only one process at a time can use the resource.",
                key_points: ["Exclusive Use", "Non-sharable", "Locking mechanism"],
                image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Circular Wait",
                explanation: "A closed chain of processes exists, where each process holds at least one resource needed by the next process in the chain.",
                key_points: ["Closed Chain", "Cyclic Dependency", "Total Gridlock"],
                image_url: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=800&auto=format&fit=crop"
            }
        ]);
        setLoading(false);
    }, []);

    const handleNext = () => {
        if (currentIndex < reels.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Reached the end, go to quiz
            router.push("/quiz");
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handlers = useSwipeable({
        onSwipedUp: () => handleNext(),
        onSwipedDown: () => handlePrev(),
        preventScrollOnSwipe: true,
        trackMouse: true, // For desktop testing
    });

    if (loading || reels.length === 0) {
        return <div className="h-screen bg-black flex justify-center items-center text-[#00E5FF]">Loading Reels...</div>;
    }

    const currentReel = reels[currentIndex];
    const progress = ((currentIndex + 1) / reels.length) * 100;

    return (
        <div
            {...handlers}
            className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center overflow-hidden touch-none"
        >
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <motion.div
                    className="h-full bg-[#00E5FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                />
            </div>

            {/* Exit Button */}
            <button
                onClick={() => router.push("/dashboard")}
                className="absolute top-6 right-6 z-50 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-gray-800 transition"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Cards Stack */}
            <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ y: 300, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -300, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-4 sm:inset-10 bg-[#0F172A] rounded-[2.5rem] overflow-hidden border border-gray-800 shadow-2xl flex flex-col"
                    >
                        {/* Reel Visual Image */}
                        <div className="relative h-[45%] w-full bg-gray-900 shrink-0">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-70"
                                style={{ backgroundImage: `url(${currentReel.image_url})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

                            {/* Topic Tag */}
                            <div className="absolute top-6 left-6 bg-[#020617]/80 backdrop-blur-md px-4 py-1.5 border border-gray-700 rounded-full font-bold text-xs uppercase tracking-wider text-[#00E5FF]">
                                {currentIndex + 1} of {reels.length}
                            </div>
                        </div>

                        {/* Reel Content */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-3xl font-extrabold text-white leading-tight">{currentReel.title}</h2>
                                <button className="bg-[#00E5FF]/20 p-3 rounded-full text-[#00E5FF] hover:bg-[#00E5FF]/40 transition shrink-0">
                                    <Volume2 className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                {currentReel.explanation}
                            </p>

                            <div className="space-y-3 mt-auto">
                                {currentReel.key_points.map((pt, i) => (
                                    <div key={i} className="flex gap-3 items-center">
                                        <div className="bg-emerald-500/20 p-1 rounded-md shrink-0">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <span className="font-medium">{pt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Hint / Swipe Nav - visible on desktop, purely decorative on mobile */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 opacity-50 z-50">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="disabled:opacity-20"><ChevronUp className="w-8 h-8 hover:text-[#00E5FF]" /></button>
                <div className="text-xs -rotate-90 select-none tracking-[0.2em] font-bold my-4">SWIPE</div>
                <button onClick={handleNext}><ChevronDown className="w-8 h-8 hover:text-[#00E5FF]" /></button>
            </div>

        </div>
    );
}
