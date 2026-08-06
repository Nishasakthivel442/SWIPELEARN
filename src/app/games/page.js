"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CheckCircle2, ChevronRight, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Draggable Concept ---
const DraggableConcept = ({ id, text, isMatched }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "concept",
        item: { id },
        canDrag: !isMatched,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    if (isMatched) return null;

    return (
        <div
            ref={drag}
            className={`p-4 bg-[#0F172A] border ${isDragging ? 'border-[#00E5FF] opacity-50' : 'border-gray-700 hover:border-gray-500'} rounded-xl cursor-grab active:cursor-grabbing text-center shadow-lg transition-colors`}
        >
            <span className="font-semibold text-white">{text}</span>
        </div>
    );
};

// --- Drop Target Definition ---
const DefinitionDropZone = ({ conceptId, text, matchedText, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "concept",
        drop: (item) => onDrop(item.id, conceptId),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const isMatched = !!matchedText;

    return (
        <div
            ref={drop}
            className={`p-5 rounded-xl border-2 border-dashed transition-all w-full flex flex-col items-center justify-center min-h-[120px] text-center
        ${isMatched
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : isOver
                        ? 'bg-[#00E5FF]/10 border-[#00E5FF]'
                        : 'bg-transparent border-gray-700'
                }`}
        >
            <p className={`mb-3 ${isMatched ? 'text-gray-300' : 'text-gray-400'}`}>{text}</p>
            {isMatched && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex gap-2 items-center text-emerald-400 bg-emerald-500/20 px-4 py-2 rounded-lg font-bold w-full justify-center">
                    <CheckCircle2 className="w-5 h-5" /> {matchedText}
                </motion.div>
            )}
        </div>
    );
};

// --- Main Game Component ---
export default function MatchGame() {
    const router = useRouter();

    const initialConcepts = [
        { id: "c1", text: "Deadlock" },
        { id: "c2", text: "Mutual Exclusion" },
        { id: "c3", text: "Circular Wait" },
    ];

    const initialDefinitions = [
        { id: "c3", text: "A closed chain of processes where each holds a resource needed by the next." },
        { id: "c1", text: "Indefinite waiting for resources held by each other." },
        { id: "c2", text: "Only one process can use a resource at a time in non-sharable mode." },
    ];

    const [matches, setMatches] = useState({}); // { definitionId: matchedConceptId }

    const handleDrop = (draggedId, targetId) => {
        if (draggedId === targetId) {
            setMatches(prev => ({ ...prev, [targetId]: draggedId }));
        } else {
            // Incorrect match visual cue could go here (e.g. toast or shake)
        }
    };

    const matchedCount = Object.keys(matches).length;
    const isFinished = matchedCount === initialDefinitions.length;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="min-h-screen bg-[#020617] text-white p-6 relative flex flex-col pt-12 md:pt-24 items-center">
                <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl w-full mb-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Match The Concept</h1>
                    <p className="text-gray-400">Drag the terms on the left to their correct definitions on the right.</p>
                </div>

                {!isFinished ? (
                    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 relative z-10 mt-8">
                        {/* Concepts Pool */}
                        <div className="w-full md:w-1/3 flex flex-col gap-4">
                            <h2 className="text-xl font-bold mb-2 text-gray-300 border-b border-gray-800 pb-2">Terms</h2>
                            <div className="space-y-4">
                                {initialConcepts.map(c => (
                                    <DraggableConcept
                                        key={c.id}
                                        id={c.id}
                                        text={c.text}
                                        isMatched={Object.values(matches).includes(c.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Definitions DefinitionsZone */}
                        <div className="w-full md:w-2/3 flex flex-col gap-4">
                            <h2 className="text-xl font-bold mb-2 text-gray-300 border-b border-gray-800 pb-2">Definitions</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {initialDefinitions.map(d => (
                                    <DefinitionDropZone
                                        key={d.id}
                                        conceptId={d.id}
                                        text={d.text}
                                        matchedText={matches[d.id] ? initialConcepts.find(c => c.id === d.id)?.text : null}
                                        onDrop={handleDrop}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#0F172A] border border-gray-800 p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative z-10 mt-12"
                    >
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Well Done!</h2>
                        <p className="text-gray-400 mb-8">You successfully matched all concepts.</p>

                        <div className="bg-[#020617] p-6 rounded-2xl mb-8 flex items-center justify-between border border-[#00E5FF]/20">
                            <span className="font-medium text-lg">XP Earned</span>
                            <span className="text-3xl font-bold text-[#00E5FF]">+100 XP</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => router.push("/progress")}
                                className="w-full flex items-center justify-center gap-2 bg-[#00E5FF] text-[#020617] font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                            >
                                View My Progress <ChevronRight className="w-5 h-5" />
                            </button>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setMatches({})}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition-all"
                                >
                                    <RefreshCw className="w-5 h-5" /> Restart
                                </button>
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition-all"
                                >
                                    <Home className="w-5 h-5" /> Dashboard
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </DndProvider>
    );
}
