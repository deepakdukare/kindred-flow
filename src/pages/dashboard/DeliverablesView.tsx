import { GlassCard } from "../../components/ui/GlassCard";
import { Button } from "../../components/ui/button";
import { FileText, Upload, Folder, Download, MoreVertical, Clock } from "lucide-react";

export const DeliverablesView = () => {

    const files = [
        { name: "Strategy_Deck_v2.pdf", size: "2.4 MB", date: "Dec 10, 2025", type: "pdf" },
        { name: "Wireframes_Home.fig", size: "14 MB", date: "Dec 12, 2025", type: "figma" },
        { name: "Copy_Draft_Final.docx", size: "450 KB", date: "Dec 15, 2025", type: "doc" },
    ];

    const tasks = [
        { title: "Review Homepage Copy", status: "In Progress", due: "Today" },
        { title: "Approve Color Palette", status: "Done", due: "Dec 14" },
        { title: "Provide Logo Assets", status: "Done", due: "Dec 12" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Deliverables</h1>
                    <p className="text-white/60">Access project files and track pending items.</p>
                </div>
                <Button className="gap-2">
                    <Upload className="w-4 h-4" /> Upload File
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* File Browser */}
                <GlassCard className="lg:col-span-2 min-h-[500px]">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Folder className="w-5 h-5 text-primary" /> Project Files
                    </h3>

                    <div className="space-y-2">
                        <div className="grid grid-cols-12 text-xs font-bold text-white/40 uppercase px-4 pb-2 border-b border-white/10">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-3">Date</div>
                            <div className="col-span-2">Size</div>
                            <div className="col-span-1"></div>
                        </div>

                        {files.map((file, i) => (
                            <div key={i} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-white/5 rounded-lg transition-colors group">
                                <div className="col-span-6 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="font-medium text-sm">{file.name}</span>
                                </div>
                                <div className="col-span-3 text-sm text-white/60">{file.date}</div>
                                <div className="col-span-2 text-sm text-white/60">{file.size}</div>
                                <div className="col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 hover:bg-white/10 rounded-full">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Upload Dropzone */}
                        <div className="mt-8 border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
                            <p className="text-sm text-white/60 font-medium">Drag & drop files here to upload</p>
                            <p className="text-xs text-white/30 mt-1">or click to browse</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Task Board */}
                <div className="space-y-6">
                    <GlassCard className="h-full">
                        <h3 className="text-lg font-bold mb-6">Pending Actions</h3>
                        <div className="space-y-4">
                            {tasks.map((task, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-sm">{task.title}</h4>
                                        <button><MoreVertical className="w-4 h-4 text-white/30" /></button>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className={`px-2 py-1 rounded-full ${task.status === 'In Progress' ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'
                                            }`}>
                                            {task.status}
                                        </div>
                                        <div className="flex items-center gap-1 text-white/40">
                                            <Clock className="w-3 h-3" />
                                            {task.due}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
