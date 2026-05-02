import React from "react";

export const defaultTemplates = [
  {
    icon: "🎯",
    title: "Quick Summary",
    msg: "Give me a 30-second overview of Harshal's background",
  },
  {
    icon: "🛠️",
    title: "Tech Stack",
    msg: "What technologies does Harshal work with?",
  },
  {
    icon: "📦",
    title: "Best Projects",
    msg: "What are Harshal's most impressive projects?",
  },
  {
    icon: "💼",
    title: "Why Hire Him?",
    msg: "Why should we hire Harshal for a full-stack role?",
  },
  {
    icon: "🤖",
    title: "AI & RAG",
    msg: "Tell me about Harshal's practical AI and RAG work",
  },
  {
    icon: "📄",
    title: "Resume Highlights",
    msg: "Summarize the key highlights from Harshal's resume",
  },
  {
    icon: "✉️",
    title: "Drop a Message",
    msg: "I want to leave a message for Harshal",
  },
];

export default function AaryxTemplates({ onSelectTemplate }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 p-2.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.06] select-none">
      <p className="col-span-2 text-[10px] text-white/30 uppercase tracking-widest font-semibold px-1 mb-0.5">
        Quick questions
      </p>
      {defaultTemplates.map((template, idx) => (
        <button
          key={idx}
          onClick={() => onSelectTemplate(template.msg)}
          className="flex items-start gap-2 p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.07] hover:border-white/10 active:scale-[0.97] transition-all duration-150 text-left cursor-pointer outline-none group"
        >
          <span className="text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform">{template.icon}</span>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-white/80 group-hover:text-white block leading-tight">
              {template.title}
            </span>
            <span className="text-[10px] text-white/35 group-hover:text-white/50 line-clamp-2 leading-relaxed mt-0.5 block">
              {template.msg}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
