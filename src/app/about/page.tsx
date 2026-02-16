import { Text } from "@/components/retroui";
import { Sparkles, Heart, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Authentic", desc: "Only genuine licensed merchandise from official distributors" },
    { icon: Zap, title: "Fast", desc: "Quick shipping so you get your gear ASAP" },
    { icon: Globe, title: "Global", desc: "Shipping worldwide to anime fans everywhere" },
    { icon: Sparkles, title: "Quality", desc: "Premium products that last, not cheap knockoffs" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <Text as="h1" className="mb-6">About GachaGang</Text>
          <Text as="p" className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a collective of anime enthusiasts dedicated to bringing you 
            the best 80s and 90s pop culture merchandise. From Cowboy Bebop to 
            Akira, we curate the finest collectibles for true fans.
          </Text>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Text as="h2" className="text-center mb-12">Our Values</Text>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-card border-2 border-border rounded text-center hover:border-primary transition-colors">
                <value.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <Text as="h3" className="font-display font-bold mb-2">{value.title}</Text>
                <Text as="p" className="text-muted-foreground text-sm">{value.desc}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Text as="h2" className="mb-6">Our Story</Text>
            <Text as="p" className="text-muted-foreground mb-4 leading-relaxed">
              GachaGang started in 2024 with a simple mission: bring back the golden 
              era of anime and pop culture. We grew up watching Cowboy Bebop on 
              late-night TV, collecting Akira posters, and hunting for that rare 
              Godzilla figure.
            </Text>
            <Text as="p" className="text-muted-foreground mb-4 leading-relaxed">
              Today, we scour the globe to find the best merchandise from the 80s 
              and 90s - the era that defined anime for generations. Every product 
              in our store is officially licensed and authentic.
            </Text>
            <Text as="p" className="text-muted-foreground leading-relaxed">
              Join the Gang. See you space cowboy.
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
