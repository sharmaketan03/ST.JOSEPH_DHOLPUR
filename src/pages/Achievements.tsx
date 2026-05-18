import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { Trophy, Medal, Star, Award } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "District Science Olympiad Winners", year: "2025", desc: "First place in the district-level Science Olympiad for three consecutive years." },
  
  { icon: Star, title: "100% Board Exam Pass Rate", year: "2024-25", desc: "All students of Class X  passed the CBSE Board Examinations." },
  
  { icon: Trophy, title: "National Debate Competition", year: "2024", desc: "Students represented at the national level debate competition and secured top positions." },
  { icon: Medal, title: "Inter-School Art Competition", year: "2025", desc: "Multiple awards in the regional inter-school art and painting competition." },
];

const Achievements = () => (
  <Layout>
    <PageHero title="Achievements" subtitle="Celebrating excellence across all domains" breadcrumb="Achievements" />
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 0.08}>
              <div className="bg-card rounded-xl border border-border p-6 card-hover h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <a.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">{a.year}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Achievements;