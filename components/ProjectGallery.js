import React, { useState } from "react";
import { motion } from "framer-motion";
import { projectData } from "../data/projects";
import Image from "next/image";
import { BsGithub, BsLink45Deg } from "react-icons/bs";
import { FaGooglePlay } from "react-icons/fa";
import BorderGlow from "./BorderGlow";

const categories = ["All", "Mobile", "Web", "CRM", "AI"];

const categoryGlow = {
  Mobile: { glowColor: "220 80 70", colors: ["#38bdf8", "#818cf8", "#60a5fa"] },
  Web:    { glowColor: "140 70 60", colors: ["#34d399", "#6ee7b7", "#38bdf8"] },
  CRM:    { glowColor: "280 70 70", colors: ["#a78bfa", "#c084fc", "#f472b6"] },
  AI:     { glowColor: "30 90 65",  colors: ["#f472b6", "#c084fc", "#38bdf8"] },
};

const getGlow = (category) =>
  categoryGlow[category] || { glowColor: "220 50 70", colors: ["#c084fc", "#f472b6", "#38bdf8"] };

const MAX_TAGS = 4;

const ProjectGallery = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projectData.filter((p) =>
    filter === "All" ? true : p.category === filter
  );

  return (
    <div className="w-full h-full flex flex-col">

      {/* ── Filter Bar ── */}
      <div
        className="flex flex-wrap gap-2 mb-5 shrink-0"
        style={{ position: "relative", zIndex: 9999 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFilter(cat);
            }}
            style={{ position: "relative", zIndex: 9999, cursor: "pointer" }}
            className={`
              px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase transition-all duration-300
              ${filter === cat
                ? "text-accent border-accent/60 bg-accent/10 shadow-[0_0_12px_rgba(241,48,36,0.15)]"
                : "text-white/30 border-white/10 hover:text-white/60 hover:border-white/20"}
              border backdrop-blur-sm
            `}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-mono text-white/20 self-center">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grid ── Re-mounts entirely on filter change for reliable transitions */}
      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1 card-scroll pb-2 items-start"
      >
        {filteredProjects.map((project, i) => {
          const { glowColor, colors } = getGlow(project.category);
          const visibleTags = project.stack.slice(0, MAX_TAGS);
          const extraCount = project.stack.length - MAX_TAGS;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
            >
              <BorderGlow
                glowColor={glowColor}
                colors={colors}
                backgroundColor="#0d0d14"
                borderRadius={18}
                glowRadius={40}
                glowIntensity={0.9}
                coneSpread={28}
                edgeSensitivity={25}
                fillOpacity={0.35}
                className="w-full group"
              >
                {/* ── Image ── */}
                <div className="relative h-52 overflow-hidden rounded-t-[18px] bg-[#0a0a0f]">
                  {Array.isArray(project.image) ? (
                    project.image.length === 4 ? (
                      <div className="grid grid-cols-2 grid-rows-2 h-full gap-[2px] p-1.5">
                        {project.image.map((img, idx) => (
                          <div key={idx} className="relative w-full h-full overflow-hidden rounded-sm group/img">
                            <Image
                              src={img}
                              alt={`${project.title} ${idx + 1}`}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="transition-transform duration-500 group-hover/img:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center px-6 gap-x-3">
                        <div className="relative w-1/2 h-[85%] transform -rotate-6 translate-x-3 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0">
                          <Image
                            src={project.image[0]}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl shadow-2xl border border-white/10"
                          />
                        </div>
                        <div className="relative w-1/2 h-[85%] transform rotate-6 -translate-x-3 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-0">
                          <Image
                            src={project.image[1]}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-xl shadow-2xl border border-white/10"
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: project.objectFit || "cover" }}
                      className={`transition-transform duration-700 ${project.objectFit === "contain" ? "p-8" : "group-hover:scale-110"}`}
                    />
                  )}
                  {/* gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/10 to-transparent pointer-events-none" />
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-[3px] bg-accent text-[9px] uppercase tracking-wider rounded-full text-white font-bold shadow-[0_0_12px_rgba(241,48,36,0.5)]">
                      Featured
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-[3px] bg-black/50 backdrop-blur border border-white/10 text-[9px] uppercase tracking-wider rounded-full text-white/70">
                    {project.category}
                  </div>
                </div>

                {/* ── Body ── */}
                <div className="p-5 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    {/* Link icons */}
                    <div className="flex gap-2.5 shrink-0 mt-0.5">
                      {project.links?.github && (
                        Array.isArray(project.links.github) ? (
                          project.links.github.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white/30 hover:text-accent transition-colors"
                              title={url.includes("server") ? "Server Repo" : "Client Repo"}
                            >
                              <BsGithub size={16} />
                            </a>
                          ))
                        ) : (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/30 hover:text-accent transition-colors"
                          >
                            <BsGithub size={16} />
                          </a>
                        )
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/30 hover:text-accent transition-colors"
                        >
                          {project.category === "Mobile" ? <FaGooglePlay size={14} /> : <BsLink45Deg size={18} />}
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-white/45 text-[11px] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack — max 4 tags + overflow pill */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {visibleTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-[3px] bg-white/[0.04] border border-white/[0.07] rounded text-[9px] font-mono text-white/40 uppercase tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span className="px-2 py-[3px] bg-accent/10 border border-accent/20 rounded text-[9px] font-mono text-accent/70 uppercase tracking-wide">
                        +{extraCount} more
                      </span>
                    )}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProjectGallery;
