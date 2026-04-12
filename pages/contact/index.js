import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import React, { useState } from "react";

import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
} from "react-icons/hi2";
import {
  RiLinkedinLine,
  RiGithubLine,
  RiTwitterLine,
} from "react-icons/ri";
import { BsArrowRight, BsCheck2Circle } from "react-icons/bs";

const contactInfo = [
  {
    icon: <HiOutlineEnvelope />,
    label: "Email",
    value: "harshalsawatkar24@gmail.com",
    href: "mailto:harshalsawatkar24@gmail.com",
  },
  {
    icon: <HiOutlinePhone />,
    label: "Phone",
    value: "+91 70300-41309",
    href: "tel:+917030041309",
  },
  {
    icon: <HiOutlineMapPin />,
    label: "Location",
    value: "Pune, India",
    href: null,
  },
];

const socials = [
  { icon: <RiLinkedinLine />, href: "https://www.linkedin.com/in/harshal-sawatkar/", label: "LinkedIn" },
  { icon: <RiGithubLine />, href: "https://github.com/Anonymous-hss", label: "GitHub" },
  { icon: <RiTwitterLine />, href: "https://twitter.com/HarshalSawatkar", label: "Twitter" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6e54b5a7-1417-45b3-8094-7c0d6590d5de",
          name: e.target.name.value,
          email: e.target.email.value,
          subject: e.target.subject.value,
          message: e.target.message.value,
        }),
      });
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      setSubmitted(true);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-primary relative z-10 w-full overflow-x-hidden">
      {/* Animated Crimson Aura Orb */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
          x: ["-50%", "-45%", "-50%"],
          y: ["-50%", "-55%", "-50%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-accent/20 blur-[150px] rounded-full pointer-events-none -z-10"
      />

      {/* Cyber Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none -z-20"
        style={{
          backgroundImage: `linear-gradient(#4b3792 1px, transparent 1px), linear-gradient(90deg, #4b3792 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <Circles />

      <div className="container mx-auto relative z-10 px-4 xl:px-0">
        <div className="pt-20 xl:pt-32 pb-24 xl:pb-8 flex items-start xl:items-center justify-center">
          <div className="w-full max-w-5xl">
          {/* ── Header ── */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center mb-8"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-5"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[3px] text-white/60">
                Open to opportunities
              </span>
            </motion.div>

            <h2 className="h2">
              Let&apos;s <span className="text-accent">connect.</span>
            </h2>
          </motion.div>

          {/* ── Split Layout ── */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left — Contact Info */}
            <motion.div
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex flex-col gap-4 lg:w-[35%] shrink-0"
            >
              {/* Contact cards */}
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-4 p-4 bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-2xl hover:border-accent/30 hover:bg-white/[0.05] transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-lg group-hover:bg-accent/20 transition-colors">
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-sm text-white/80 group-hover:text-white transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-2xl">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 text-lg">
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-sm text-white/80">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center gap-3 p-4 bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-2xl"
              >
                <div className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mr-auto">
                  Socials
                </div>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 hover:bg-accent/10 transition-all duration-300 text-lg"
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>

              {/* Response time */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center lg:text-left mt-2"
              >
                <span className="text-[9px] font-mono uppercase tracking-[3px] text-white/20">
                  Avg. response time: ~4 hours
                </span>
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              variants={fadeIn("left", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex-1"
            >
              <div className="bg-white/[0.03] backdrop-blur-lg border border-white/[0.07] rounded-3xl p-6 xl:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <BsCheck2Circle className="text-5xl text-accent" />
                    <h3 className="text-xl font-bold text-white">Message sent!</h3>
                    <p className="text-white/50 text-sm text-center max-w-sm">
                      Thanks for reaching out. I&apos;ll get back to you within a few hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2 text-[11px] font-mono uppercase tracking-[2px] text-white/40 border border-white/10 rounded-full hover:text-accent hover:border-accent/30 transition-all"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mb-2 block">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          className="input border border-white/10 bg-white/[0.03] focus:border-accent/40"
                          autoComplete="given-name"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mb-2 block">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          className="input border border-white/10 bg-white/[0.03] focus:border-accent/40"
                          autoComplete="email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mb-2 block">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="What's this about?"
                        className="input border border-white/10 bg-white/[0.03] focus:border-accent/40"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-mono uppercase tracking-[3px] text-white/30 mb-2 block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell me about your project, idea, or opportunity..."
                        className="textarea border border-white/10 bg-white/[0.03] focus:border-accent/40"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="relative rounded-full border border-white/20 h-[52px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group disabled:opacity-50 disabled:cursor-not-allowed max-w-[200px]"
                    >
                      <span className={`transition-all duration-500 ${submitting ? "opacity-0" : "group-hover:-translate-y-[120%] group-hover:opacity-0"}`}>
                        {submitting ? "Sending..." : "Let\u0027s talk"}
                      </span>
                      <BsArrowRight
                        className={`absolute text-[22px] transition-all duration-300 ${
                          submitting
                            ? "opacity-0"
                            : "-translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                      />
                      {submitting && (
                        <div className="absolute w-5 h-5 border-2 border-white/20 border-t-accent rounded-full animate-spin" />
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
