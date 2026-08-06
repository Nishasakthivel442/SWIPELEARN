"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { auth, db } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");
        try {
            if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key") {
                console.log("Mock register successful!");
                router.push("/dashboard");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });

            // Store basic user information in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                createdAt: new Date().toISOString(),
                streak: 0,
                xp: 0,
                topicsCompleted: 0
            });

            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-6 relative overflow-hidden">
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-[#0F172A]/80 backdrop-blur-md p-8 rounded-3xl border border-gray-800 shadow-2xl z-10"
            >
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent inline-block mb-2">SwipeLearn</Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Join the journey 🚀</h1>
                    <p className="text-gray-400">Create your student account.</p>
                </div>

                {error && <div className="mb-4 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm text-center">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                placeholder="Full Name"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#00E5FF] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#00E5FF] text-[#020617] font-bold py-3 px-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 transform active:scale-95 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#00E5FF] hover:underline font-semibold">
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
