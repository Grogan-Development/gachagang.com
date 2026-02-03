import { Text, Badge, Card, Button } from "@/components/retroui";
import { Zap, Users, Package, Star } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Package, value: "10K+", label: "Products Shipped" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Zap, value: "24/7", label: "Customer Support" },
  ];

  const team = [
    {
      name: "SPIKE",
      role: "Founder & CEO",
      emoji: "🚀",
      quote: "Whatever happens, happens.",
    },
    {
      name: "FAYE",
      role: "Head of Operations",
      emoji: "💫",
      quote: "The past is the past.",
    },
    {
      name: "JET",
      role: "Supply Chain Manager",
      emoji: "🔧",
      quote: "I hate kids and pets.",
    },
    {
      name: "ED",
      role: "Tech Lead",
      emoji: "💻",
      quote: "Ed will introduce Ed!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 border-b-4 border-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="surface" size="lg" className="mb-6">
              OUR STORY
            </Badge>
            <Text as="h1" className="mb-6">
              WE ARE{" "}
              <span className="text-gradient-neon">RETROVAULT</span>
            </Text>
            <Text as="p" className="text-xl text-muted-foreground">
              Born from a love of 80s and 90s pop culture, we&apos;re here to
              bring the golden age of anime, movies, and nostalgia straight to
              your doorstep.
            </Text>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-foreground">
            {stats.map((stat, i) => (
              <div key={i} className="py-8 px-4 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <Text as="h2" className="text-3xl font-bold mb-1">
                  {stat.value}
                </Text>
                <Text as="p" className="text-muted-foreground">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="neon" className="mb-4">
                OUR MISSION
              </Badge>
              <Text as="h2" className="mb-6">
                KEEPING THE CLASSICS ALIVE
              </Text>
              <div className="space-y-4 text-muted-foreground">
                <Text as="p">
                  Remember staying up late watching Toonami? The excitement of
                  rewinding your favorite VHS tapes? The magic of discovering
                  Akira, Cowboy Bebop, and Ghost in the Shell for the first
                  time?
                </Text>
                <Text as="p">
                  We do too. That&apos;s why we created RetroVault - a place
                  where fans can find authentic, high-quality merchandise that
                  celebrates the anime and pop culture that shaped us.
                </Text>
                <Text as="p">
                  Every product we sell is carefully curated to ensure it meets
                  our standards. No bootlegs, no knockoffs - just genuine items
                  that honor the source material.
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center aspect-square flex flex-col items-center justify-center">
                <div className="text-6xl mb-2">🎌</div>
                <Text as="h4" className="font-medium">
                  Anime Heritage
                </Text>
              </Card>
              <Card className="p-6 text-center aspect-square flex flex-col items-center justify-center translate-y-8">
                <div className="text-6xl mb-2">🎬</div>
                <Text as="h4" className="font-medium">
                  Movie Classics
                </Text>
              </Card>
              <Card className="p-6 text-center aspect-square flex flex-col items-center justify-center">
                <div className="text-6xl mb-2">🎮</div>
                <Text as="h4" className="font-medium">
                  Gaming Icons
                </Text>
              </Card>
              <Card className="p-6 text-center aspect-square flex flex-col items-center justify-center translate-y-8">
                <div className="text-6xl mb-2">📼</div>
                <Text as="h4" className="font-medium">
                  Retro Vibes
                </Text>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-card border-y-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="surface" className="mb-4">
              THE CREW
            </Badge>
            <Text as="h2">MEET THE GANG</Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full border-4 border-foreground flex items-center justify-center text-5xl">
                  {member.emoji}
                </div>
                <Text as="h3" className="mb-1">
                  {member.name}
                </Text>
                <Text as="p" className="text-primary font-medium mb-3">
                  {member.role}
                </Text>
                <Text as="p" className="text-sm text-muted-foreground italic">
                  &ldquo;{member.quote}&rdquo;
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="neon" className="mb-4">
              OUR VALUES
            </Badge>
            <Text as="h2">WHAT WE STAND FOR</Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full border-4 border-foreground flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <Text as="h3" className="mb-2">
                AUTHENTICITY
              </Text>
              <Text as="p" className="text-muted-foreground">
                Every product is genuine. No exceptions. We work directly with
                licensed distributors.
              </Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full border-4 border-foreground flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <Text as="h3" className="mb-2">
                QUALITY
              </Text>
              <Text as="p" className="text-muted-foreground">
                We test and inspect every item. If it doesn&apos;t meet our
                standards, it doesn&apos;t ship.
              </Text>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full border-4 border-foreground flex items-center justify-center">
                <span className="text-3xl">💜</span>
              </div>
              <Text as="h3" className="mb-2">
                COMMUNITY
              </Text>
              <Text as="p" className="text-muted-foreground">
                We&apos;re fans first, sellers second. This community is our
                family.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background border-t-4 border-primary">
        <div className="container mx-auto px-4 text-center">
          <Text as="h2" className="mb-4">
            READY TO JOIN THE GANG?
          </Text>
          <Text as="p" className="text-lg mb-8 opacity-80 max-w-xl mx-auto">
            Explore our collection and find the perfect piece to add to your
            collection. The past is calling.
          </Text>
          <Button
            size="lg"
            variant="secondary"
            asChild
          >
            <Link href="/shop">SHOP NOW</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
