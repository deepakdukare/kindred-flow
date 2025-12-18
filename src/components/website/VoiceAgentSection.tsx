import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { requestVoiceDemo } from "../../lib/api";
import { GlassCard } from "../ui/GlassCard";
import { cn } from "../../lib/utils";

export const VoiceAgentSection = () => {
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) return;

        setIsSubmitting(true);
        const success = await requestVoiceDemo(phone);
        setIsSubmitting(false);

        if (success) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

            <div className="container px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold">
                            Experience the <br /> <span className="text-gradient-gold">Future of Voice</span>
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            Our AI Voice Agent handles inbound calls, qualifies leads, and schedules meetings 24/7. It sounds human, acts smart, and never sleeps.
                        </p>

                        <GlassCard className="p-8 border-l-4 border-l-primary/50">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary" />
                                Try it yourself
                            </h3>

                            {status === "success" ? (
                                <div className="text-green-400 font-medium p-4 bg-green-500/10 rounded-lg">
                                    Calling you now! Pick up the phone. 📞
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                                    <Input
                                        placeholder="Enter your phone (+1...)"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !phone}
                                        className="shrink-0 font-bold"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Call Me"}
                                    </Button>
                                </form>
                            )}
                            {status === "error" && (
                                <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
                            )}
                        </GlassCard>
                    </div>

                    {/* Right Visual (Waveform Animation) */}
                    <div className="relative flex items-center justify-center h-[400px]">
                        {/* Central Orb */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute w-32 h-32 rounded-full bg-primary/20 blur-xl"
                        />
                        <div className="relative z-10 flex items-center gap-1">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 bg-gradient-to-t from-primary/20 to-primary rounded-full"
                                    animate={{
                                        height: [20, Math.random() * 120 + 40, 20],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
