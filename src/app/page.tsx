"use client";
import Image from "next/image";
import { useState } from "react";
import { titles, profiles, experiences } from "./texts";

export default function Home() {
  const [lang, setLang] = useState<"en" | "es" | "ru">("es");
  const langs = ["en", "es", "ru"] as const;
  const activeIdx = langs.indexOf(lang);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-transparent flex flex-col">
      {/* Языковой переключатель всегда наверху */}
      <div className="w-full flex justify-end lg:justify-end px-4 sm:px-8 pt-6">
        <div className="relative flex bg-gray-100 dark:bg-neutral-800 rounded-full border border-gray-300 dark:border-neutral-700 shadow-sm overflow-hidden w-[144px] h-10">
          <span
            className="absolute top-0 left-0 h-full w-1/3 transition-transform duration-300 ease-in-out bg-foreground/90 dark:bg-white/20 rounded-full z-0"
            style={{
              transform: `translateX(${activeIdx * 100}%)`,
            }}
          />
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`relative z-10 flex-1 h-full text-sm font-semibold transition-colors duration-200 rounded-full
                ${lang === l
                  ? "text-background dark:text-white"
                  : "text-gray-500 dark:text-gray-300 hover:text-foreground"}
              `}
              aria-current={lang === l ? "true" : undefined}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8">
          <main className="flex flex-col items-center lg:items-start w-full">
            <header className="flex flex-row items-center gap-8 mb-4 w-full">
              <div className="flex-shrink-0 flex items-center justify-center h-[110px] w-[110px]">
                <Image
                  src="/profile.jpg"
                  alt="Profile photo"
                  width={110}
                  height={110}
                  className="rounded-full object-cover border-4 border-gray-200 dark:border-neutral-700 shadow-lg aspect-square"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-extrabold tracking-tight">{titles[lang].title}</h1>
                <h2 className="text-xl text-gray-500 font-medium">{titles[lang].subtitle}</h2>
              </div>
            </header>
            <section className="flex flex-col items-center lg:items-start w-full">
              <div className="relative w-full max-w-[600px] mx-auto px-8 py-8 mb-4 bg-gradient-to-br from-white via-gray-50 to-gray-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-xl flex flex-col items-center lg:items-start">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-8 lg:-translate-x-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full p-2 shadow-lg">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="url(#grad)" />
                    <path d="M8 17v-1a4 4 0 018 0v1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth="1.5"/>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60a5fa"/>
                        <stop offset="1" stopColor="#a78bfa"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100 self-start">{profiles[lang].title}</div>
                <div className="mt-2 text-base text-gray-700 dark:text-gray-300 text-justify">{profiles[lang].text}</div>
              </div>
              <div className="flex gap-4 mt-2">
                <a
                  href="http://linkedin.com/in/vladimir-chekholin-725573194"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-solid border-blue-600 bg-blue-600 text-white px-5 py-2 font-medium text-sm transition-colors hover:bg-blue-700 hover:border-blue-700 shadow"
                >
                  <svg width="20" height="20" fill="currentColor" className="inline" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v5.597z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/cadaverine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-solid border-gray-800 bg-gray-800 text-white px-5 py-2 font-medium text-sm transition-colors hover:bg-gray-900 hover:border-gray-900 shadow"
                >
                  <svg width="20" height="20" fill="currentColor" className="inline" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </section>
          </main>
          <div className="flex flex-col items-end lg:items-start w-full">
            <div className="w-full">
              <div className="w-full max-w-[600px] mx-auto px-8 py-8 bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow flex flex-col">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {lang === "en"
                    ? "Work Experience"
                    : lang === "es"
                    ? "Experiencia laboral"
                    : "Опыт работы"}
                </div>
                <div className="space-y-6 text-gray-800 dark:text-gray-200 text-base">
                  {experiences[lang].map((exp, idx) => (
                    <div key={idx}>
                      <div className="font-semibold">{exp.title}</div>
                      <div className="text-xs text-gray-500 mb-1">{exp.period}</div>
                      <ul className="list-disc list-inside ml-4">
                        {exp.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
