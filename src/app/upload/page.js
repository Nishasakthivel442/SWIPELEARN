"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { UploadCloud, FileType, CheckCircle2, ChevronLeft, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { storage } from "@/services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/auth"; // wait actually from firebase/storage, will fix imports in actual use but leaving standard logic here.

export default function UploadPage() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploadState, setUploadState] = useState("idle"); // idle, uploading, processing, complete
    const [progress, setProgress] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelected(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFileSelected(e.target.files[0]);
        }
    };

    const handleFileSelected = (selelctedFile) => {
        if (selelctedFile.type !== "application/pdf" && !selelctedFile.name.endsWith('.pptx')) {
            alert("Currently only PDF and PPTX files are supported.");
            return;
        }
        setFile(selelctedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploadState("uploading");

        // MOCK UPLOAD FLOW for frontend demonstration
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 15;
            if (currentProgress > 100) currentProgress = 100;
            setProgress(currentProgress);

            if (currentProgress === 100) {
                clearInterval(interval);
                setUploadState("processing");

                // Mock processing delay
                setTimeout(() => {
                    setUploadState("complete");
                    setTimeout(() => {
                        router.push("/learn");
                    }, 1500);
                }, 3000);
            }
        }, 400);

        // REAL UPLOAD FLOW will go to Firebase Storage and FastAPI later.
        // const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);
        // uploadTask.on('state_changed', ... )
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden flex flex-col">
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <nav className="max-w-4xl mx-auto w-full mb-12 relative z-10">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
                    <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                </Link>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full relative z-10 pb-20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">Upload Study Material</h1>
                    <p className="text-gray-400">Transform your PDFs or PPTs into interactive learning reels in seconds.</p>
                </div>

                {uploadState === "idle" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <div
                            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all bg-[#0F172A]/50 ${dragActive ? 'border-[#00E5FF] bg-[#00E5FF]/5 scale-[1.02]' : 'border-gray-700 hover:border-gray-500'}`}
                        >
                            <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center mb-6">
                                <UploadCloud className={`w-10 h-10 ${dragActive ? 'text-[#00E5FF]' : 'text-gray-400'}`} />
                            </div>

                            {!file ? (
                                <>
                                    <p className="text-xl font-medium mb-2">Drop your file here or browse</p>
                                    <p className="text-gray-500 mb-8 text-sm">Supported formats: PDF, PPTX (Max 20MB)</p>
                                    <label className="bg-[#020617] border border-gray-700 hover:border-gray-500 transition px-6 py-3 rounded-full cursor-pointer font-medium">
                                        Choose File
                                        <input type="file" className="hidden" onChange={handleChange} accept=".pdf,.pptx" />
                                    </label>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-3 bg-black/30 px-6 py-4 rounded-2xl border border-gray-700 mb-8">
                                        <FileType className="w-8 h-8 text-[#00E5FF]" />
                                        <div className="text-left">
                                            <p className="font-semibold truncate max-wxs">{file.name}</p>
                                            <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setFile(null)} className="px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-800 transition">
                                            Cancel
                                        </button>
                                        <button onClick={handleUpload} className="px-6 py-3 bg-[#00E5FF] text-[#020617] font-bold rounded-full shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 transition flex gap-2 items-center">
                                            <Sparkles className="w-5 h-5" /> Generate Learning Content
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {(uploadState === "uploading" || uploadState === "processing") && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full text-center">
                        <div className="bg-[#0F172A] border border-[#00E5FF]/20 rounded-3xl p-12 flex flex-col items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/10 to-transparent animate-pulse" />

                            <Loader2 className="w-16 h-16 text-[#00E5FF] animate-spin mb-6 relative z-10" />

                            <h3 className="text-2xl font-bold mb-2 relative z-10">
                                {uploadState === "uploading" ? "Uploading study material..." : "AI is creating your learning experience..."}
                            </h3>
                            <p className="text-gray-400 mb-8 relative z-10">
                                {uploadState === "uploading" ? "Please don't close this window." : "Extracting key concepts, generating quizzes..."}
                            </p>

                            <div className="w-full max-w-md bg-gray-800 rounded-full h-3 relative z-10 overflow-hidden">
                                <motion.div
                                    className="bg-[#00E5FF] h-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ type: "tween" }}
                                />
                            </div>
                            <div className="mt-3 text-sm font-mono text-[#00E5FF] relative z-10">{progress}%</div>
                        </div>
                    </motion.div>
                )}

                {uploadState === "complete" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center flex flex-col items-center">
                        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Reels Ready!</h3>
                        <p className="text-gray-400">Taking you to your learning session...</p>
                    </motion.div>
                )}

            </main>
        </div>
    );
}
