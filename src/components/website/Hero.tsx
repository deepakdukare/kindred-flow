import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 max-w-4xl mx-auto"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-primary text-sm font-medium mb-4">
                        ✨ Automation redefined for modern sales teams
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight font-serif">
                        AI-Powered Sales Automation That{" "}
                        <span className="text-gradient-gold">Closes Deals End-to-End</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        One unified platform where users interact with advanced automation without ever seeing the complexity. Leads, meetings, proposals, and payments—automated.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                            className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full transition-all hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:scale-105 flex items-center gap-2"
                        >
                            Start Automating
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="group px-8 py-4 bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-primary" />
                            Watch Demo
                        </button>
                    </div>
                </motion.div>

                {/* Dashboard Preview / Visual (Placeholder for now) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-20 relative mx-auto max-w-5xl"
                >
                    <div className="aspect-video bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">
                            <span className="text-lg uppercase tracking-widest font-bold">Dashboard Preview Placeholder</span>
                        </div>
                        {/* Decorative elements to simulate UI */}
                        <div className="absolute top-0 left-0 right-0 h-12 border-b border-white/10 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                    </div>

                    {/* Glow effect behind the dashboard */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-600/30 rounded-xl blur-2xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-500" />
                </motion.div>
            </div>
        </section>
    );
};
