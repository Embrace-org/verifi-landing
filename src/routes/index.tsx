import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Check,
  X,
  HelpCircle,
  Mic,
  ScanLine,
  CheckCircle2,
  Download,
  UserRound,
  HeartHandshake,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/verifi/Reveal";
import verifiWordmark from "@/assets/wordmark2.png.asset.json";

const TITLE = "Verifi — the voice-first medication safety check for seniors";
const DESCRIPTION =
  "Ask what to take, show the package, get an honest answer. Verifi checks what is actually in your hand — and says so when it isn't sure.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DEMO_URL = "[DEMO_URL]";
const PITCH_DECK_PDF_URL = "[PITCH_DECK_PDF_URL]";

type Lang = "en" | "pt";

const copy = {
  en: {
    backToTop: "Verifi — back to top",
    demo: "Demo",
    pitchDeck: "Pitch deck",
    tryDemo: "Try the demo",
    viewDeck: "View the pitch deck",
    langLabel: "Switch language to Portuguese",
    tag: "Voice-first medication safety check",
    h1: "The safety check between “it’s time” and “it’s in your hand.”",
    sub: "Ask what to take, show the package, get an honest answer.",
    match: "Match",
    mismatch: "Mismatch",
    uncertain: "Uncertain",
    matchLine: "It matches what's scheduled.",
    mismatchLine: "This isn't the right one.",
    uncertainLine: "I'm not sure. Try again or ask someone.",
    stats: [
      { n: "#4", t: "Portugal: 4th in the EU for elderly people living alone" },
      { n: "6–15%", t: "of medication errors are look-alike or sound-alike mix-ups (studies)" },
      { n: "1 in 30", t: "patients harmed by medication errors (WHO)" },
    ],
    reminderApps: "Reminder apps",
    reminderLine: "Tell you WHEN to take it.",
    verifiLine: "Checks WHAT is in your hand.",
    gapLine: "Nobody checks the box you’re actually holding.",
    howItWorks: "How it works",
    step: "Step",
    steps: [
      { t: "Ask by voice", d: "“What do I take now?”" },
      { t: "Show the package", d: "Point the camera at the box." },
      { t: "Get an honest answer", d: "One of three states — never a guess." },
    ],
    neverGuesses: "Never guesses. Ever.",
    neverLine: "When it isn’t sure, it says so. That’s a feature, not a failure.",
    theDeck: "The pitch deck",
    downloadPdf: "Download PDF",
    twoModes: "Two modes",
    userMode: "User mode",
    userModeText: "For the person taking the medication. Voice-first, one clear answer at a time.",
    caregiverMode: "Caregiver mode",
    caregiverText:
      "For a daughter, family member or professional caregiver. Same checks, plus a daily dashboard.",
    allTaken: "All taken",
    missed: "Missed or mismatch",
    glance: "See each day at a glance.",
    builtWith: "Built with",
    builtBy: "Built by",
    seeItWork: "See it work.",
    disclaimer: "Hackathon prototype. Not a certified medical device.",
  },
  pt: {
    backToTop: "Verifi — voltar ao topo",
    demo: "Demo",
    pitchDeck: "Apresentação",
    tryDemo: "Experimentar a demo",
    viewDeck: "Ver a apresentação",
    langLabel: "Mudar idioma para inglês",
    tag: "Verificação de medicação por voz",
    h1: "A verificação de segurança entre “está na hora” e “está na sua mão.”",
    sub: "Pergunte o que tomar, mostre a embalagem, receba uma resposta honesta.",
    match: "Corresponde",
    mismatch: "Não corresponde",
    uncertain: "Incerto",
    matchLine: "Corresponde ao que está agendado.",
    mismatchLine: "Este não é o medicamento certo.",
    uncertainLine: "Não tenho a certeza. Tente de novo ou peça ajuda.",
    stats: [
      { n: "#4", t: "Portugal: 4.º na UE em idosos a viver sozinhos" },
      { n: "6–15%", t: "dos erros de medicação são trocas por aspeto ou nome semelhante (estudos)" },
      { n: "1 em 30", t: "doentes prejudicados por erros de medicação (OMS)" },
    ],
    reminderApps: "Apps de lembretes",
    reminderLine: "Dizem QUANDO tomar.",
    verifiLine: "Verifica O QUE está na sua mão.",
    gapLine: "Ninguém verifica a caixa que tem realmente na mão.",
    howItWorks: "Como funciona",
    step: "Passo",
    steps: [
      { t: "Pergunte por voz", d: "“O que tomo agora?”" },
      { t: "Mostre a embalagem", d: "Aponte a câmara para a caixa." },
      { t: "Receba uma resposta honesta", d: "Um de três estados — nunca um palpite." },
    ],
    neverGuesses: "Nunca adivinha. Nunca.",
    neverLine: "Quando não tem a certeza, diz. Isso é uma funcionalidade, não uma falha.",
    theDeck: "A apresentação",
    downloadPdf: "Descarregar PDF",
    twoModes: "Dois modos",
    userMode: "Modo utilizador",
    userModeText: "Para quem toma a medicação. Por voz, uma resposta clara de cada vez.",
    caregiverMode: "Modo cuidador",
    caregiverText:
      "Para uma filha, familiar ou cuidador profissional. As mesmas verificações, com um painel diário.",
    allTaken: "Tudo tomado",
    missed: "Falhado ou trocado",
    glance: "Veja cada dia num relance.",
    builtWith: "Feito com",
    builtBy: "Feito por",
    seeItWork: "Veja a funcionar.",
    disclaimer: "Protótipo de hackathon. Não é um dispositivo médico certificado.",
  },
};

type Copy = (typeof copy)["en"];
const LangContext = createContext<Copy>(copy.en);
const useT = () => useContext(LangContext);

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-extrabold tracking-tight ${className}`}>
      Verifi
    </span>
  );
}

function LinkedLogo() {
  const t = useT();
  return (
    <a
      href="#top"
      aria-label={t.backToTop}
      className={`relative inline-flex shrink-0 items-center rounded-lg before:absolute before:inset-y-0 before:left-0 before:w-[30px] before:rounded-full before:bg-on-dark sm:before:w-9 ${focusRing}`}
    >
      <img
        src={verifiWordmark.url}
        alt="Verifi"
        className="relative z-10 h-[26px] w-auto object-contain sm:h-9"
      />
    </a>
  );
}

function LangToggle({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  const t = useT();
  const pt = lang === "pt";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pt}
      aria-label={t.langLabel}
      onClick={onToggle}
      className={`relative inline-flex h-10 w-[5.5rem] shrink-0 items-center rounded-full border border-on-dark/25 bg-on-dark/10 p-1 text-xs font-bold ${focusRing}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 left-1 h-8 w-10 rounded-full bg-brand-green transition-transform duration-300 ease-out ${pt ? "translate-x-[2.5rem]" : "translate-x-0"}`}
      />
      <span
        className={`relative z-10 w-10 text-center transition-colors ${pt ? "text-on-dark/70" : "text-brand-ink"}`}
      >
        EN
      </span>
      <span
        className={`relative z-10 w-10 text-center transition-colors ${pt ? "text-brand-ink" : "text-on-dark/70"}`}
      >
        PT
      </span>
    </button>
  );
}

function PrimaryCta({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <a
      href={DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-14 items-center justify-center rounded-2xl bg-brand-green px-8 text-base font-semibold text-brand-ink transition-transform hover:scale-[1.02] ${focusRing} ${className}`}
    >
      {t.tryDemo}
    </a>
  );
}

function SecondaryCta({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <a
      href="#pitch-deck"
      className={`inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-on-dark px-8 text-base font-semibold text-on-dark transition-colors hover:bg-on-dark/10 ${focusRing} ${className}`}
    >
      {t.viewDeck}
    </a>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const states = [
    { label: t.match, icon: Check, color: "text-state-match", ring: "border-state-match", line: t.matchLine },
    { label: t.mismatch, icon: X, color: "text-state-mismatch", ring: "border-state-mismatch", line: t.mismatchLine },
    { label: t.uncertain, icon: HelpCircle, color: "text-state-uncertain", ring: "border-state-uncertain", line: t.uncertainLine },
  ];
  const stepIcons = [Mic, ScanLine, CheckCircle2];

  return (
    <LangContext.Provider value={t}>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-on-dark/10 bg-brand-ink/95 backdrop-blur">
          <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-5">
            <LinkedLogo />
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-on-dark hover:underline ${focusRing}`}
              >
                {t.demo}
              </a>
              <a
                href="#pitch-deck"
                className={`inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-on-dark hover:underline ${focusRing}`}
              >
                {t.pitchDeck}
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center rounded-xl px-2 text-sm font-semibold text-on-dark hover:underline md:hidden ${focusRing}`}
              >
                {t.demo}
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden min-h-10 items-center rounded-xl bg-brand-green px-4 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.02] md:inline-flex ${focusRing}`}
              >
                {t.tryDemo}
              </a>
              <LangToggle lang={lang} onToggle={() => setLang(lang === "en" ? "pt" : "en")} />
            </div>
          </nav>
        </header>

        <main id="top">
          {/* HERO */}
          <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center bg-brand-ink px-5 py-20 text-center text-on-dark sm:py-28">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-on-dark/25 bg-on-dark/5 px-4 py-1.5 text-sm font-semibold text-on-dark/85">
                  {t.tag}
                </span>
                <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  {t.h1}
                </h1>
                <p className="mt-6 text-lg text-on-dark/80">{t.sub}</p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <PrimaryCta />
                  <SecondaryCta />
                </div>
              </Reveal>
            </div>

            <div className="absolute bottom-6 left-5 sm:left-8">
              <Reveal delay={0.15}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-on-dark/15 bg-on-dark/5 py-2 pr-4 pl-3 text-xs font-semibold text-on-dark/75">
                  <Mic className="size-3.5 text-brand-green" aria-hidden="true" />
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-state-match" />
                      {t.match}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-state-mismatch" />
                      {t.mismatch}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-state-uncertain" />
                      {t.uncertain}
                    </span>
                  </span>
                </span>
              </Reveal>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="px-5 py-20 sm:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
              {t.stats.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <p className="font-display text-5xl font-extrabold tracking-tight text-brand-ink sm:text-6xl">
                    {s.n}
                  </p>
                  <p className="mt-4 text-base text-brand-deep/80">{s.t}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* THE GAP (light tint) */}
          <section className="bg-brand-accent/5 px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <div className="grid overflow-hidden rounded-3xl border border-brand-deep/15 bg-background md:grid-cols-2">
                  <div className="border-b border-brand-deep/15 p-10 md:border-r md:border-b-0">
                    <Bell className="size-8 text-brand-accent" aria-hidden="true" />
                    <h2 className="mt-5 text-2xl font-bold text-brand-ink">{t.reminderApps}</h2>
                    <p className="mt-3 text-lg text-brand-deep/75">{t.reminderLine}</p>
                  </div>
                  <div className="bg-brand-deep p-10 text-on-dark">
                    <ShieldCheck className="size-8 text-brand-green" aria-hidden="true" />
                    <h2 className="mt-5 text-2xl font-bold">Verifi</h2>
                    <p className="mt-3 text-lg text-on-dark/90">{t.verifiLine}</p>
                  </div>
                </div>
                <p className="mt-8 text-center text-lg text-brand-deep/75">{t.gapLine}</p>
              </Reveal>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">
                  {t.howItWorks}
                </h2>
              </Reveal>
              <div className="relative mt-14 grid gap-12 sm:grid-cols-3">
                <div
                  className="absolute top-6 right-8 left-8 hidden h-px bg-brand-accent/40 sm:block"
                  aria-hidden="true"
                />
                {t.steps.map((s, idx) => {
                  const Icon = stepIcons[idx] ?? Mic;
                  return (
                    <Reveal key={idx} delay={idx * 0.08} className="relative">
                      <span className="relative z-10 flex size-12 items-center justify-center rounded-2xl bg-brand-accent text-on-dark">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <p className="mt-5 font-display text-sm font-bold text-brand-accent">
                        {t.step} {idx + 1}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-brand-ink">{s.t}</h3>
                      <p className="mt-2 text-brand-deep/75">{s.d}</p>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* NEVER GUESSES */}
          <section className="bg-brand-ink px-5 py-20 text-on-dark sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {t.neverGuesses}
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {states.map((s, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className={`h-full rounded-3xl border-2 bg-on-dark/5 p-8 ${s.ring}`}>
                      <span
                        className={`flex size-14 items-center justify-center rounded-2xl border-2 ${s.ring} ${s.color}`}
                      >
                        <s.icon className="size-7" aria-hidden="true" />
                      </span>
                      <h3 className={`mt-6 text-2xl font-bold ${s.color}`}>{s.label}</h3>
                      <p className="mt-3 text-on-dark/80">{s.line}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.1}>
                <p className="mt-10 text-lg text-on-dark/70">{t.neverLine}</p>
              </Reveal>
            </div>
          </section>

          {/* PITCH DECK */}
          <section id="pitch-deck" className="px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">
                  {t.theDeck}
                </h2>
                <div className="mt-10 flex aspect-video w-full flex-col items-center justify-center rounded-3xl bg-brand-ink px-6 text-center text-on-dark">
                  <Wordmark className="text-4xl sm:text-6xl" />
                  <p className="mt-4 max-w-md text-sm text-on-dark/75 sm:text-lg">{t.h1}</p>
                </div>
                <a
                  href={PITCH_DECK_PDF_URL}
                  className={`mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-brand-accent px-8 text-base font-semibold text-on-dark transition-transform hover:scale-[1.02] ${focusRing}`}
                >
                  <Download className="size-5" aria-hidden="true" />
                  {t.downloadPdf}
                </a>
              </Reveal>
            </div>
          </section>

          {/* TWO MODES (light tint) */}
          <section className="bg-brand-accent/5 px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">
                  {t.twoModes}
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <Reveal>
                  <div className="h-full rounded-3xl border border-brand-deep/15 bg-background p-8">
                    <UserRound className="size-8 text-brand-accent" aria-hidden="true" />
                    <h3 className="mt-5 text-2xl font-bold text-brand-ink">{t.userMode}</h3>
                    <p className="mt-3 text-brand-deep/75">{t.userModeText}</p>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="h-full rounded-3xl border border-brand-deep/15 bg-background p-8">
                    <HeartHandshake className="size-8 text-brand-accent" aria-hidden="true" />
                    <h3 className="mt-5 text-2xl font-bold text-brand-ink">{t.caregiverMode}</h3>
                    <p className="mt-3 text-brand-deep/75">{t.caregiverText}</p>
                    <Heatmap />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* BUILT WITH */}
          <section className="px-5 py-20 sm:py-24">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <h2 className="text-xl font-bold text-brand-deep">{t.builtWith}</h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {["Flutter", "Dart", "Supabase", "ElevenLabs", "DeepSeek"].map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-brand-accent px-5 py-2 text-sm font-semibold text-brand-deep"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* BUILT BY (light tint) */}
          <section className="bg-brand-accent/5 px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">
                  {t.builtBy}
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {["AB", "CD"].map((initials, i) => (
                  <Reveal key={initials} delay={i * 0.08}>
                    <div className="h-full rounded-3xl border border-brand-deep/15 bg-background p-8 text-center">
                      <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-accent font-display text-xl font-bold text-on-dark">
                        {initials}
                      </span>
                      <h3 className="mt-5 text-xl font-bold text-brand-ink">[Name]</h3>
                      <p className="mt-1 text-sm font-semibold text-brand-accent">[Role]</p>
                      <p className="mt-4 text-sm text-brand-deep/75">[Short bio]</p>
                      <a
                        href="#"
                        className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-deep/30 px-5 text-sm font-semibold text-brand-deep hover:bg-brand-accent/10 ${focusRing}`}
                      >
                        LinkedIn
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* CLOSING CTA */}
          <section className="bg-brand-deep px-5 py-20 text-on-dark sm:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {t.seeItWork}
                </h2>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <PrimaryCta />
                  <SecondaryCta />
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="bg-brand-deep px-5 pb-14 text-on-dark">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-t border-on-dark/20 pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <LinkedLogo />
            <p className="text-sm text-on-dark/75">[email or handle]</p>
            <p className="text-xs text-on-dark/60">{t.disclaimer}</p>
          </div>
        </footer>
      </div>
    </LangContext.Provider>
  );
}

function Heatmap() {
  const t = useT();
  const days = Array.from({ length: 35 }, (_, i) => {
    if (i === 9 || i === 24) return "bg-state-mismatch";
    if (i === 17) return "bg-state-uncertain";
    return "bg-state-match";
  });

  return (
    <div className="mt-8 rounded-2xl bg-brand-accent/5 p-5">
      <div className="grid grid-cols-7 gap-1.5" aria-hidden="true">
        {days.map((c, i) => (
          <span key={i} className={`aspect-square rounded-md ${c}`} />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-4 text-xs text-brand-deep/80">
        <li className="flex items-center gap-2">
          <span className="size-3 rounded bg-state-match" /> {t.allTaken}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded bg-state-mismatch" /> {t.missed}
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded bg-state-uncertain" /> {t.uncertain}
        </li>
      </ul>
      <p className="mt-3 text-sm text-brand-deep/75">{t.glance}</p>
    </div>
  );
}
