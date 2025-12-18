import { GlassCard } from "../../components/ui/GlassCard";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export const ProjectStatus = () => {

    const milestones = [
        { name: "Discovery & Strategy", status: "completed" },
        { name: "Wireframing & UX", status: "completed" },
        { name: "Visual Design", status: "in-progress" },
        { name: "Development", status: "pending" },
        { name: "Launch", status: "pending" },
    ];

    const currentProgress = 45; // 45% complete

    return (
        <div className="space-y-6">
            <GlassCard>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="text-lg font-bold">Project Progress</h3>
                        <p className="text-sm text-white/60">Cervoa Implementation</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">{currentProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${currentProgress}%` }}
                    />
                </div>
            </GlassCard>

            <GlassCard className="p-0 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-bold">Milestones</h3>
                </div>
                <div className="p-6 space-y-6">
                    {milestones.map((m, i) => (
                        <div key={i} className="flex items-center gap-4">
                            {m.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                            {m.status === "in-progress" && <Clock className="w-5 h-5 text-primary shrink-0 animate-pulse" />}
                            {m.status === "pending" && <Circle className="w-5 h-5 text-white/20 shrink-0" />}

                            <div className={m.status === "pending" ? "opacity-40" : ""}>
                                <p className="font-medium text-sm">{m.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
};
