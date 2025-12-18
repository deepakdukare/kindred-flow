import { Search, Mail, Calendar, Mic, FileText, CreditCard } from "lucide-react";

const ValueProps = () => {
  const props = [
    {
      icon: Search,
      title: "Lead Discovery",
      description: "AI-powered prospecting finds and enriches your ideal customers automatically.",
    },
    {
      icon: Mail,
      title: "Smart Follow-ups",
      description: "Personalized email sequences that adapt based on engagement signals.",
    },
    {
      icon: Calendar,
      title: "Meeting Automation",
      description: "Seamless scheduling with automatic calendar sync and reminders.",
    },
    {
      icon: Mic,
      title: "Voice AI Agent",
      description: "24/7 intelligent phone support that qualifies and routes leads.",
    },
    {
      icon: FileText,
      title: "Proposal Generation",
      description: "Create branded proposals in seconds with smart templates.",
    },
    {
      icon: CreditCard,
      title: "Payment Collection",
      description: "Automated invoicing and payment tracking built right in.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Close More Deals</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete automation suite that handles every step of your sales process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((prop, index) => (
            <div
              key={prop.title}
              className="group glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:glow-primary-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <prop.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {prop.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
