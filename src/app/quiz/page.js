"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, ArrowRight, Home, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuizPage() {
    const router = useRouter();

    const [questions] = useState([
        {
            question: "Which of the following is a condition of deadlock?",
            options: ["CPU Scheduling", "Circular Wait", "File Compression", "Paging"],
            correct_answer: "Circular Wait",
            explanation: "Circular wait is one of the 4 necessary conditions for deadlock (along with Mutual Exclusion, Hold and Wait, and No Preemption)."
        },
        {
            question: "How can you prevent a deadlock?",
            options: ["Reboot the system", "Eliminate one of the 4 necessary conditions", "Add more RAM", "Always use Windows"],
            correct_answer: "Eliminate one of the 4 necessary conditions",
            explanation: "Deadlock prevention algorithms work by ensuring that at least one of the four necessary conditions cannot hold."
        }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (option) => {
        if (isAnswered) return;
        setSelectedAnswer(option);
        setIsAnswered(true);

        if (option === questions[currentIndex].correct_answer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setIsFinished(true);
            // Here we would typically sync XP with Firebase
        }
    };

    if (isFinished) {
        const xpEarned = score * 50;
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#0F172A] border border-gray-800 p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative z-10"
                >
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                    <p className="text-gray-400 mb-8">You answered {score} out of {questions.length} questions correctly.</p>

                    <div className="bg-[#020617] p-6 rounded-2xl mb-8 flex items-center justify-between border border-[#00E5FF]/20">
                        <span className="font-medium text-lg">XP Earned</span>
                        <span className="text-3xl font-bold text-[#00E5FF]">+{xpEarned} XP</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => router.push("/games")}
                            className="w-full flex items-center justify-center gap-2 bg-[#00E5FF] text-[#020617] font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                        >
                            <Gamepad2 className="w-5 h-5" /> Play Mini Game
                        </button>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-medium py-4 rounded-xl hover:bg-gray-700 transition-all"
                        >
                            <Home className="w-5 h-5" /> Back to Dashboard
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 relative flex flex-col pt-12 md:pt-24 items-center">
            {/* Progress text */}
            <div className="max-w-2xl w-full mb-8 flex justify-between items-center text-sm font-semibold tracking-wider text-gray-500 uppercase">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className="text-[#00E5FF]">Score: {score}</span>
            </div>

            <div className="w-full max-w-2xl flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-[#0F172A] border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed mb-8">{currentQ.question}</h2>

                        <div className="space-y-4">
                            {currentQ.options.map((opt, i) => {
                                let btnClass = "bg-[#020617] border-gray-700 hover:border-gray-500 text-gray-300";
                                let icon = null;

                                if (isAnswered) {
                                    if (opt === currentQ.correct_answer) {
                                        btnClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400";
                                        icon = <CheckCircle2 className="w-5 h-5" />;
                                    } else if (opt === selectedAnswer) {
                                        btnClass = "bg-red-500/10 border-red-500/50 text-red-400";
                                        icon = <XCircle className="w-5 h-5" />;
                                    } else {
                                        btnClass = "bg-[#020617] border-gray-800 text-gray-600 opacity-50";
                                    }
                                } else {
                                    btnClass = "bg-[#020617] border-gray-700 hover:border-[#00E5FF]/50 text-white hover:bg-[#00E5FF]/5";
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(opt)}
                                        disabled={isAnswered}
                                        className={`w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center ${btnClass}`}
                                    >
                                        <span className="text-lg font-medium">{opt}</span>
                                        {icon}
                                    </button>
                                )
                            })}
                        </div>

                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="mt-8 pt-6 border-t border-gray-800"
                            >
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                                    <strong className="text-white block mb-2">Explanation:</strong>
                                    {currentQ.explanation}
                                </p>

                                <button
                                    onClick={handleNext}
                                    className="w-full bg-[#00E5FF] text-[#020617] font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition flex justify-center items-center gap-2"
                                >
                                    {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
