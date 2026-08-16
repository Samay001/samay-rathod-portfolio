"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ChevronDown,
  BriefcaseBusiness,
  Code2,
  FileText,
  GitFork,
  Mail,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { ChatWidget } from "@/components/chat-widget";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { awards, education, projects, skills, work } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const socials = [
  { label: "LinkedIn", icon: BriefcaseBusiness, href: "https://linkedin.com/in/samayrathod" },
  { label: "GitHub", icon: GitFork, href: "https://github.com/Samay001" },
  { label: "LeetCode", icon: Code2, href: "https://leetcode.com/u/samayrathod1" },
  { label: "Email", icon: Mail, href: "mailto:samayrathod1@gmail.com" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

function ExternalLink({ href, children, kind = "outline" }: { href: string; children: React.ReactNode; kind?: "outline" | "ghost" }) {
  return (
    <a className={cn("button-link", kind === "ghost" && "button-link-ghost")} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function Portfolio() {
  const [tab, setTab] = useState<"work" | "education">("work");
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[740px] px-5 pb-16">
        <section id="home" className="hero-texture scroll-mt-20 py-11">
          <div className="flex flex-col-reverse items-start gap-7 sm:flex-row sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="max-w-[470px] text-[2rem] font-semibold leading-[1.14] tracking-[-0.035em] sm:text-[2.35rem]">
                I Build Backend Systems That Scale.
              </h1>
              <p className="mt-3 max-w-[470px] text-[15px] leading-relaxed text-muted-foreground">
                I&apos;m Samay, an Associate Software Engineer focused on backend engineering, voice AI, and applied AI.
              </p>
              <p className="mt-3 max-w-[470px] text-[15px] leading-relaxed text-muted-foreground">
                I build production systems—from call-routing platforms handling thousands of daily conversations to RAG tools and event-driven pipelines.
              </p>
            </div>
            <div className="profile-frame">
              <Image src="/samay-profile-cropped.jpg" alt="Portrait of Samay Rathod" fill priority sizes="(max-width: 640px) 170px, 210px" className="profile-photo" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a className="button-link" href="/Samay_Rathod_Resume.pdf" target="_blank">
              <FileText className="size-4" /> Resume
            </a>
            <span className="mx-1 h-5 w-px bg-border" />
            {socials.map(({ label, icon: Icon, href }) => (
              <a key={label} className="social-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} title={label}>
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </section>

        <section className="pb-12">
          <div className="tab-list" role="tablist" aria-label="Background">
            <button role="tab" aria-selected={tab === "work"} onClick={() => setTab("work")} className={cn("tab-trigger", tab === "work" && "tab-active")}>Work</button>
            <button role="tab" aria-selected={tab === "education"} onClick={() => setTab("education")} className={cn("tab-trigger", tab === "education" && "tab-active")}>Education</button>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            {tab === "work" ? (
              <ol className="timeline">
                {work.map((job) => (
                  <li key={job.company} className="timeline-item">
                    <span className="timeline-dot" />
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-semibold">{job.company}</h3>
                      <span className="shrink-0 text-xs text-muted-foreground">{job.period}</span>
                    </div>
                    <p className="text-sm text-primary">{job.role}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {job.bullets.map((bullet) => <li className="work-bullet" key={bullet}>{bullet}</li>)}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="timeline-item pl-5">
                <span className="timeline-dot left-[-5px]" />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[15px] font-semibold">{education.school}</h3>
                  <span className="text-xs text-muted-foreground">{education.period}</span>
                </div>
                <p className="text-sm text-primary">{education.degree}</p>
                <p className="mt-1 text-sm text-muted-foreground">{education.location}</p>
              </div>
            )}
          </div>
        </section>

        <section id="projects" className="scroll-mt-20 pb-12">
          <SectionTitle>Featured Projects</SectionTitle>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <article key={project.title} className="project-card">
                <div className="relative aspect-[8/5] overflow-hidden border-b border-border bg-white">
                  <Image src={project.image} alt={`${project.title} interface preview`} fill priority={index < 2} sizes="(max-width: 640px) 100vw, 350px" className="object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-[15px] font-semibold">{project.title}</h3>
                  <ul className="mt-2 flex-1 space-y-1.5">
                    {project.bullets.map((bullet) => <li className="text-[13.5px] leading-relaxed text-muted-foreground" key={bullet}>{bullet}</li>)}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => <span className="pill" key={tech}>{tech}</span>)}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <ExternalLink href={project.primary.href}>{project.primary.label}<ArrowUpRight className="size-3.5" /></ExternalLink>
                    <ExternalLink href={project.source} kind="ghost">Source<GitFork className="size-3.5" /></ExternalLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>
              {showAll ? "View Fewer Projects" : "View More Projects"}
              <ChevronDown className={cn("size-4 transition-transform", showAll && "rotate-180")} />
            </Button>
          </div>
        </section>

        <section className="pb-12">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-4 space-y-3.5">
            {skills.map(([group, items]) => (
              <div key={group} className="grid gap-1.5 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-baseline sm:gap-4">
                <p className="text-[13px] font-medium text-muted-foreground">{group}</p>
                <div className="flex flex-wrap gap-1.5">{items.map((item) => <span className="pill pill-outline" key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12">
          <SectionTitle>Awards</SectionTitle>
          <div className="mt-4 space-y-2">
            {awards.map((award) => (
              <div className="award-card" key={award.title}>
                <Trophy className="size-4 text-primary" />
                <div className="min-w-0 flex-1"><p className="text-sm font-medium">{award.title}</p><p className="text-[13px] text-muted-foreground">{award.detail}</p></div>
                <span className="text-[13px] font-medium text-muted-foreground">{award.prize}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 pb-10">
          <SectionTitle>Let&apos;s Build Something Dependable.</SectionTitle>
          <div className="mt-4 flex gap-2">
            <a className="button-link" href="mailto:samayrathod1@gmail.com"><Mail className="size-4" />Email</a>
            <ExternalLink href="https://linkedin.com/in/samayrathod"><BriefcaseBusiness className="size-4" />LinkedIn</ExternalLink>
          </div>
        </section>
        <footer className="border-t border-border pt-5 text-[13px] text-muted-foreground">© 2026 Samay Rathod</footer>
      </main>
      <ChatWidget />
    </div>
  );
}
