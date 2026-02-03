import { Sparkles, Clock, Mail } from "lucide-react";
import { Button, Text, Badge } from "@/components/retroui";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen noise-bg flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="neon" size="lg" className="animate-bounce">
              COMING SOON
            </Badge>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <Text as="h1" className="text-5xl md:text-7xl font-bold">
              RETRO<span className="text-gradient-neon">VAULT</span>
            </Text>
            <Text as="p" className="text-xl md:text-2xl text-muted-foreground">
              80s & 90s Pop Culture Paradise
            </Text>
          </div>

          {/* Description */}
          <div className="space-y-4 max-w-xl mx-auto">
            <Text as="p" className="text-lg text-muted-foreground">
              We're building something special. Get ready for the ultimate destination 
              for 80s and 90s anime & pop culture collectibles.
            </Text>
            
            <div className="flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Cowboy Bebop</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span>Akira</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Godzilla</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-card border-2 border-foreground rounded-lg p-6 md:p-8 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <Text as="h3" className="text-xl">
                Get Notified
              </Text>
            </div>
            <Text as="p" className="text-muted-foreground mb-6">
              Be the first to know when we launch. Subscribe for exclusive drops and early access.
            </Text>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded border-2 border-foreground shadow-md focus:outline-none focus:shadow-sm bg-background"
                required
              />
              <Button type="submit" size="lg">
                NOTIFY ME
              </Button>
            </form>
          </div>

          {/* Countdown Placeholder */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <Text as="p" className="text-sm">
              Launching 2026
            </Text>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Text as="p" className="text-sm text-muted-foreground">
              Follow us for updates
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
