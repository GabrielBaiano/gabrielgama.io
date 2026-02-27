import { AboutHeader } from "./components/AboutHeader";
import { TechTags } from "./components/TechTags";
import { AboutGrid } from "./components/AboutGrid";

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-background text-foreground font-sans">
      <AboutHeader />
      <TechTags />
      <AboutGrid />
    </main>
  );
}