import Link from "next/link";
import { ArrowRight, Zap, Truck, Shield, Star } from "lucide-react";
import { Button, Text, Badge } from "@/components/retroui";

export default function Home() {
  return (
    <div className="noise-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-4 border-foreground">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="surface" size="lg" className="mb-6">
              WELCOME TO RETROVAULT
            </Badge>

            <Text as="h1" className="mb-6 leading-tight">
              <span className="block">80s & 90s</span>
              <span className="text-gradient-neon">POP CULTURE</span>
              <span className="block">PARADISE</span>
            </Text>

            <Text
              as="p"
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Cowboy Bebop. Akira. Godzilla. Back to the Future. The best of the
              golden era, now in your collection.
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">
                  SHOP NOW
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">LEARN MORE</Link>
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="hidden lg:block absolute top-20 left-10 animate-bounce">
            <div className="text-6xl">🚀</div>
          </div>
          <div
            className="hidden lg:block absolute bottom-20 right-10 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-6xl">👾</div>
          </div>
          <div
            className="hidden lg:block absolute top-1/2 right-20 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-6xl">🎮</div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-card border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-foreground">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "On orders over $75",
              },
              {
                icon: Shield,
                title: "Authentic",
                desc: "100% genuine products",
              },
              {
                icon: Star,
                title: "Quality",
                desc: "Premium collectibles",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                desc: "2-5 business days",
              },
            ].map((feature, i) => (
              <div key={i} className="py-6 px-4 text-center">
                <feature.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <Text as="h4" className="font-medium">
                  {feature.title}
                </Text>
                <Text as="p" className="text-sm text-muted-foreground">
                  {feature.desc}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Text as="h2" className="mb-4">
              JOIN RETROVAULT
            </Text>
            <Text as="p" className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter for exclusive drops, early access to
              new products, and special discounts. No spam, just pure nostalgia.
            </Text>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded border-2 border-foreground shadow-md focus:outline-none focus:shadow-sm bg-background"
              />
              <Button type="submit" size="lg">
                SUBSCRIBE
              </Button>
            </form>

            <Text as="p" className="text-sm text-muted-foreground mt-4">
              By subscribing, you agree to receive marketing emails. You can
              unsubscribe at any time.
            </Text>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-foreground text-background border-y-4 border-primary">
        <div className="container mx-auto px-4">
          <blockquote className="max-w-4xl mx-auto text-center">
            <Text as="h2" className="italic mb-4">
              &ldquo;See you space cowboy...&rdquo;
            </Text>
            <Text as="p" className="text-lg opacity-80">
              - Cowboy Bebop
            </Text>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
