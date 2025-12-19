import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Loader2, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);

            // Auto-redirect for demo purposes after 2 seconds
            setTimeout(() => {
                navigate("/app");
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

            <GlassCard className="max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold mb-6">Cervoa<span className="text-primary">.</span></h2>
                    <h1 className="text-xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-white/60 text-sm">Access your client dashboard</p>
                </div>

                {isSent ? (
                    <div className="text-center py-8 animate-fade-in">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Magic Link Sent!</h3>
                        <p className="text-white/60 text-sm">Check your inbox for the access link.</p>
                        <p className="text-xs text-white/30 mt-4">(Auto-redirecting to dashboard...)</p>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Work Email</label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border-white/10"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Send Magic Link"}
                            {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>
                    </form>
                )}
            </GlassCard>
        </div>
    );
};
