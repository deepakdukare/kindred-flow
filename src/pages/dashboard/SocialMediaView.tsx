import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { CheckCircle2, Linkedin, Twitter, Share2, Loader2 } from "lucide-react";

export const SocialMediaView = () => {
    const [content, setContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [platforms, setPlatforms] = useState({ linkedin: true, twitter: true });

    const handlePost = () => {
        if (!content) return;
        setIsPosting(true);

        // Simulate API call
        setTimeout(() => {
            setIsPosting(false);
            setIsPosted(true);
            setContent("");
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Social Automation</h1>
                    <p className="text-white/60">Share your wins and updates across channels.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Composer */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard>
                        <h3 className="font-bold mb-4">Compose Update</h3>
                        <Textarea
                            placeholder="What's the big news today?"
                            className="bg-white/5 border-white/10 min-h-[150px] mb-4 text-base"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setIsPosted(false);
                            }}
                        />

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPlatforms(p => ({ ...p, linkedin: !p.linkedin }))}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${platforms.linkedin
                                            ? "bg-[#0077b5]/20 border-[#0077b5] text-[#0077b5]"
                                            : "border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                </button>
                                <button
                                    onClick={() => setPlatforms(p => ({ ...p, twitter: !p.twitter }))}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${platforms.twitter
                                            ? "bg-[#1DA1F2]/20 border-[#1DA1F2] text-[#1DA1F2]"
                                            : "border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    <Twitter className="w-4 h-4" /> Twitter
                                </button>
                            </div>

                            <Button
                                onClick={handlePost}
                                disabled={!content || isPosting || (!platforms.linkedin && !platforms.twitter)}
                                className="gap-2 font-bold"
                            >
                                {isPosting ? <Loader2 className="animate-spin w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                {isPosting ? "Posting..." : "Post Now"}
                            </Button>
                        </div>

                        {isPosted && (
                            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 animate-fade-in">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-bold text-green-500 text-sm">Published Successfully!</p>
                                    <p className="text-white/40 text-xs">Your update is live on selected channels.</p>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>

                {/* Recent Posts (Mock) */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg px-2">Recent Activity</h3>
                    {[1, 2].map((i) => (
                        <GlassCard key={i} className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                                    <Linkedin className="w-3 h-3" />
                                    <span>LINKEDIN</span>
                                </div>
                                <span className="text-xs text-white/30">2d ago</span>
                            </div>
                            <p className="text-sm line-clamp-3 text-white/80">
                                We're excited to announce our partnership with ACME Corp!
                                Together we are revolutionizing sales automation. 🚀 #Sales #AI #Growth
                            </p>
                            <div className="flex gap-4 text-xs text-white/40 pt-2 border-t border-white/5">
                                <span>124 Likes</span>
                                <span>4 Comments</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};
