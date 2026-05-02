import React from "react";
import { projectData } from "../../data/projects";

// Extracts all project titles from our data to detect them in text
const projectTitles = projectData.map(p => p.title.toLowerCase());
const techKeywords = [
  "React.js", "Next.js", "React Native", "TypeScript", "JavaScript", "Vue.js",
  "Node.js", "Go", "Express.js", "PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma",
  "LangChain", "LangGraph", "RAG", "FAISS", "Python", "Ollama", "Docker", "AWS"
];

function ContactCard() {
  return (
    <div className="my-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-semibold">📬 Get in Touch</p>
      <div className="flex flex-col gap-1.5">
        <a href="mailto:harshalsawatkar24@gmail.com" className="flex items-center gap-2 text-xs text-white/80 hover:text-white transition-colors">
          <span className="text-sm">✉️</span> harshalsawatkar24@gmail.com
        </a>
        <a href="tel:+917030041309" className="flex items-center gap-2 text-xs text-white/80 hover:text-white transition-colors">
          <span className="text-sm">📱</span> +91 70300-41309
        </a>
        <span className="flex items-center gap-2 text-xs text-white/60">
          <span className="text-sm">📍</span> Pune, India
        </span>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
        <a href="https://www.linkedin.com/in/harshal-sawatkar/" target="_blank" rel="noreferrer" className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-white/70 transition-colors">LinkedIn ↗</a>
        <a href="https://github.com/Anonymous-hss" target="_blank" rel="noreferrer" className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-white/70 transition-colors">GitHub ↗</a>
        <a href="https://twitter.com/HarshalSawatkar" target="_blank" rel="noreferrer" className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-white/70 transition-colors">X ↗</a>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  if (!project) return null;
  return (
    <div className="my-2 p-3 bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 rounded-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">📦</div>
      <h4 className="text-sm font-bold text-white mb-0.5">{project.title}</h4>
      <p className="text-[10px] text-white/50 mb-2 leading-snug">{project.tagline || project.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.stack?.slice(0, 4).map(tech => (
          <span key={tech} className="px-1.5 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-[9px] text-purple-200">
            {tech}
          </span>
        ))}
        {project.stack?.length > 4 && <span className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-white/40">+{project.stack.length - 4}</span>}
      </div>

      <div className="flex gap-2">
        {project.links?.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer" className="flex-1 text-center py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-semibold text-white transition-colors">Live Site ↗</a>
        )}
        {project.links?.github && (
          <a href={typeof project.links.github === 'string' ? project.links.github : project.links.github[0]} target="_blank" rel="noreferrer" className="flex-1 text-center py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-semibold text-white/80 transition-colors">GitHub ↗</a>
        )}
      </div>
    </div>
  );
}

function SkillsGrid({ skills }) {
  return (
    <div className="my-2 p-3 bg-white/[0.03] border border-white/10 rounded-xl">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-semibold">🛠️ Tech Stack</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/80">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function LinkCard({ label, url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 my-1 mr-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors group">
      <span className="text-purple-400 group-hover:text-purple-300">🔗</span>
      <span className="truncate max-w-[200px]">{label}</span>
    </a>
  );
}

function ResumeCTA() {
  return (
    <div className="my-2 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl text-center">
      <p className="text-[10px] uppercase tracking-widest text-purple-200/60 mb-1 font-semibold">📄 Resume</p>
      <p className="text-xs text-white mb-2">Full-Stack Dev · 2+ yrs · 13+ ships</p>
      <a href="/harshal-sawatkar-resume.pdf" target="_blank" rel="noreferrer" className="inline-block px-4 py-1.5 bg-purple-500 hover:bg-purple-400 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors">
        Download Resume ↓
      </a>
    </div>
  );
}

// Main parser function
export function AaryxResponseRenderer({ content }) {
  if (!content) return null;

  // Track what we've rendered to avoid duplicates
  const renderedFlags = { contact: false, resume: false };

  // Split into paragraphs/lines
  const lines = content.split('\n');
  const elements = [];

  let bulletGroup = [];

  const flushBullets = () => {
    if (bulletGroup.length > 0) {
      elements.push(
        <ul key={`bullets-${elements.length}`} className="my-2 space-y-1.5 list-none">
          {bulletGroup.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-white/90">
              <span className="text-purple-400 mt-0.5 text-[10px]">▸</span>
              <span>{renderInline(b)}</span>
            </li>
          ))}
        </ul>
      );
      bulletGroup = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Bullet detection
    if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      bulletGroup.push(line.substring(2).trim());
      continue;
    } else {
      flushBullets();
    }

    // Contact detection
    if ((line.includes('harshalsawatkar24@gmail.com') || line.includes('+91 70300')) && !renderedFlags.contact) {
      elements.push(<ContactCard key={`contact-${i}`} />);
      renderedFlags.contact = true;
      continue;
    }

    // Resume detection
    if ((line.toLowerCase().includes('download resume') || line.toLowerCase().includes('my resume')) && !renderedFlags.resume) {
      elements.push(<ResumeCTA key={`resume-${i}`} />);
      renderedFlags.resume = true;
      continue;
    }

    // Skills detection
    const foundSkills = techKeywords.filter(tech => line.includes(tech));
    if (foundSkills.length >= 4) {
      elements.push(<SkillsGrid key={`skills-${i}`} skills={foundSkills} />);
      // Only render the grid, skip text if it's just a comma separated list
      if (line.split(',').length >= 3) continue;
    }

    // Project detection (find exact project matches in line)
    const lowerLine = line.toLowerCase();
    const matchedProject = projectData.find(p => lowerLine.includes(p.title.toLowerCase()) && lowerLine.includes('project'));
    if (matchedProject) {
      elements.push(<ProjectCard key={`proj-${i}`} project={matchedProject} />);
    }

    // Standard Link detection for lines that are just links
    const linkMatch = line.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
    if (linkMatch) {
      elements.push(<LinkCard key={`link-${i}`} label={linkMatch[1]} url={linkMatch[2]} />);
      continue;
    }

    // Standard text rendering
    elements.push(
      <p key={`text-${i}`} className="mt-1.5 leading-relaxed text-white/90">
        {renderInline(line)}
      </p>
    );
  }

  flushBullets();

  return <div className="flex flex-col gap-1">{elements}</div>;
}

// Helper for inline markdown (bold and inline links)
function renderInline(text) {
  const parts = [];
  let lastIndex = 0;

  // Match `**bold**` or `[text](url)`
  const regex = /(\*\*(.*?)\*\*)|(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold
      parts.push(<strong key={match.index} className="text-white font-bold">{match[2]}</strong>);
    } else if (match[3]) {
      // Link
      parts.push(
        <a key={match.index} href={match[5]} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 break-all">
          {match[4]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}
