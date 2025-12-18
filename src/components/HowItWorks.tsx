const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Capture Leads",
      description: "Visitors submit interest through smart forms. Data is instantly validated, enriched with company info, and scored.",
    },
    {
      number: "02",
      title: "Engage Automatically",
      description: "AI triggers personalized email sequences. Every open, click, and reply updates lead scores in real-time.",
    },
    {
      number: "03",
      title: "Schedule Meetings",
      description: "Hot leads receive meeting invites. Calendar syncs automatically with Zoom links and reminders.",
    },
    {
      number: "04",
      title: "Close & Deliver",
      description: "Generate proposals, collect payments, and trigger delivery workflows — all automatically.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How <span className="text-gradient">Cervoa</span> Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From first touch to closed deal, every step is automated and intelligent.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-20 bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              )}

              <div className="flex gap-6 mb-12 items-start group">
                {/* Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>

                {/* Content */}
                <div className="glass rounded-2xl p-6 flex-1 group-hover:border-primary/50 transition-all duration-300">
                  <h3 className="font-display font-semibold text-xl mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
