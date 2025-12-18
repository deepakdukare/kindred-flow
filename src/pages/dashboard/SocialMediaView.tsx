import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { CheckCircle2, Linkedin, Twitter, Share2, Loader2, TrendingUp } from "lucide-react";

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
                    <p className="text-white/60">Review AI-generated posts and track engagement.</p>
                </div>
                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Auto-Posting Active
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">

                    {/* AI Drafts Queue (New Requirement: Optional Approval) */}
                    <GlassCard className="border-primary/20">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Share2 className="w-4 h-4 text-primary" /> Pending AI Drafts
                            </h3>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded">2 Pending</span>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/10 group hover:border-primary/30 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-white/40 uppercase">LinkedIn &bull; Draft</span>
                                    <span className="text-xs text-primary">Generated 2h ago</span>
                                </div>
                                <p className="text-sm text-white/80 mb-4">
                                    "Thrilled to announce we've just closed a major deal with TechCorp! 🚀 Our team has been working hard to deliver... #Sales #Growth"
                                </p>
                                <div className="flex gap-2">
                                    <Button size="sm" className="h-8 gap-1 pl-2">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-8 text-xs">Edit</Button>
                                    <Button size="sm" variant="ghost" className="h-8 text-xs text-white/40 hover:text-red-400">Dismiss</Button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Manual Composer */}
                    <GlassCard>
                        <h3 className="font-bold mb-4">Manual Override</h3>
                        <Textarea
                            placeholder="Write a custom update..."
                            className="bg-white/5 border-white/10 min-h-[100px] mb-4 text-sm"
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
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-colors ${platforms.linkedin
                                        ? "bg-[#0077b5]/20 border-[#0077b5] text-[#0077b5]"
                                        : "border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    <Linkedin className="w-3 h-3" /> LinkedIn
                                </button>
                                <button
                                    onClick={() => setPlatforms(p => ({ ...p, twitter: !p.twitter }))}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-colors ${platforms.twitter
                                        ? "bg-[#1DA1F2]/20 border-[#1DA1F2] text-[#1DA1F2]"
                                        : "border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    <Twitter className="w-3 h-3" /> Twitter
                                </button>
                            </div>

                            <Button
                                onClick={handlePost}
                                disabled={!content || isPosting || (!platforms.linkedin && !platforms.twitter)}
                                className="gap-2 font-bold h-9"
                            >
                                {isPosting ? <Loader2 className="animate-spin w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                {isPosting ? "Posting..." : "Post Now"}
                            </Button>
                        </div>

                        {isPosted && (
                            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 animate-fade-in">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <div>
                                    <p className="font-bold text-green-500 text-xs">Posted!</p>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>

                {/* Recent Posts (Mock) */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg px-2">Engagement Feed</h3>
                    {[1, 2, 3].map((i) => (
                        <GlassCard key={i} className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                                    <Linkedin className="w-3 h-3" />
                                    <span>LINKEDIN</span>
                                </div>
                                <span className="text-xs text-white/30">{i}d ago</span>
                            </div>
                            <p className="text-xs line-clamp-3 text-white/80">
                                Industry insights: AI is transforming sales cycles faster than expected. #SaaS #FutureOfWork
                            </p>
                            <div className="flex gap-4 text-xs text-white/40 pt-2 border-t border-white/5">
                                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {120 * i} Views</span>
                                <span>{12 * i} Likes</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};
