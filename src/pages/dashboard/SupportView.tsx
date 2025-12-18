import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Send, User, Bot } from "lucide-react";

export const SupportView = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, sender: "bot", text: "Hello! How can I help you with your project today?", time: "10:00 AM" },
        { id: 2, sender: "user", text: "When is the next review meeting?", time: "10:05 AM" },
        { id: 3, sender: "admin", text: "Hi Deepak, we have it scheduled for Tuesday at 2 PM EST.", time: "10:15 AM" },
    ]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            sender: "user",
            text: input,
            time: "Now"
        }]);
        setInput("");
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Messages</h1>
                <p className="text-white/60 text-sm">Direct line to your project manager.</p>
            </div>

            <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-primary" : "bg-white/10"
                                }`}>
                                {msg.sender === "user" && <User className="w-5 h-5 text-white" />}
                                {msg.sender === "bot" && <Bot className="w-5 h-5 text-white" />}
                                {msg.sender === "admin" && <div className="text-xs font-bold">PM</div>}
                            </div>

                            <div className={`max-w-[70%] p-4 rounded-2xl ${msg.sender === "user"
                                    ? "bg-primary/20 text-white rounded-tr-sm"
                                    : "bg-white/5 text-white/90 rounded-tl-sm"
                                }`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-[10px] opacity-40 mt-1 text-right">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white/5 border-t border-white/10">
                    <form onSubmit={handleSend} className="flex gap-4">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="bg-white/5 border-white/10"
                        />
                        <Button type="submit" size="icon" className="shrink-0">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </GlassCard>
        </div>
    );
};
