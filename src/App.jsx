import { useEffect, useMemo, useState } from 'react';
import { content } from './data/content.js';

const LANGS = ['en', 'zh'];

function resolveSystemLang() {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return 'en';
  }

  const locales = window.navigator.languages && window.navigator.languages.length
    ? window.navigator.languages
    : [window.navigator.language];

  for (const locale of locales) {
    const normalized = locale?.split('-')?.[0];
    if (normalized && LANGS.includes(normalized)) {
      return normalized;
    }
  }

  return 'en';
}

function useTheme() {
  const [theme, setTheme] = useState('light');
  const [hasStoredPreference, setHasStoredPreference] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      setHasStoredPreference(true);
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyPreference = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    setTheme(mediaQuery.matches ? 'dark' : 'light');
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', applyPreference);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(applyPreference);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', applyPreference);
      } else if (typeof mediaQuery.removeListener === 'function') {
        mediaQuery.removeListener(applyPreference);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (hasStoredPreference) {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme, hasStoredPreference]);

  const toggleTheme = () => {
    setHasStoredPreference(true);
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('theme', nextTheme);
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
}

function Header({ t, lang, theme, activeSection, onToggleLang, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <a href="#hero" className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.4em] text-primary-500 dark:text-primary-300">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary-500 via-accent to-tertiary text-white font-display text-lg">◎</span>
          <span className="hidden sm:block">Context.is</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {t.nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-1 py-2 transition-colors hover:text-primary-500 dark:hover:text-primary-300 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:rounded-full after:bg-gradient-to-r after:from-primary-400 after:via-accent after:to-primary-400 after:transition-opacity after:duration-300 ${
                  isActive
                    ? 'text-primary-500 dark:text-primary-200 after:opacity-100'
                    : 'text-slate-600 dark:text-slate-300 after:opacity-0'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLang}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-600 transition hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-300 dark:hover:text-primary-200"
          >
            {content[lang === 'en' ? 'zh' : 'en'].languageLabel}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t.themeToggleLabel}
            aria-pressed={theme === "dark"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-primary-400 hover:text-primary-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-300 dark:hover:text-primary-200"
          >
            <ThemeIcon theme={theme} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ hero }) {
  const {
    ctaPrimary,
    ctaSecondary,
    loop: loopItems = [],
    loopTitle,
    loopYear,
  } = hero;

  return (
    <section id="hero" className="border-b border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1.15fr_0.85fr] md:px-6">
        <div className="space-y-8">
          <span className="section-heading">{hero.eyebrow}</span>
          <div className="space-y-5">
            <h1 className="font-display text-4xl leading-tight md:text-6xl">{hero.title}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 md:text-xl">{hero.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="badge-pill"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {ctaPrimary?.label && (
              <a
                href={ctaPrimary?.href ?? '#primer'}
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-primary-500/30 transition hover:-translate-y-0.5 hover:bg-primary-600"
            >
                {ctaPrimary?.label}
              </a>
            )}
            {ctaSecondary?.label && (
              <a
                href={ctaSecondary?.href ?? '#playbook'}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-primary-300 hover:text-primary-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary-400 dark:hover:text-primary-200"
              >
                {ctaSecondary?.label}
              </a>
            )}
          </div>
        </div>
        <div className="surface p-8">
          <div className="flex items-start justify-between text-xs uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
            <span>{loopTitle ?? 'Context loop'}</span>
            <span>{loopYear ?? '2025'}</span>
          </div>
          <div className="mt-6 space-y-5">
            {loopItems.map((item, idx) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-5 text-left shadow-sm dark:bg-slate-900/70">
                <span className="kicker-label">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights({ highlights }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((item) => (
        <div key={item.title} className="surface p-6 transition hover:-translate-y-0.5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500 dark:text-primary-200">{item.title}</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function Columns({ columns }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {columns.map((col) => (
        <div key={col.title} className="surface space-y-4 p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500 dark:text-primary-200">{col.title}</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {col.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-primary-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Cards({ cards }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="surface flex flex-col gap-3 p-6 transition hover:-translate-y-0.5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500 dark:text-primary-200">{card.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{card.body}</p>
        </article>
      ))}
    </div>
  );
}

function ListBlock({ title, items }) {
  return (
    <div className="surface space-y-4 p-8">
      {title && <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500 dark:text-primary-200">{title}</h3>}
      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-primary-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Comparison({ comparison }) {
  const { leftTitle, leftItems, rightTitle, rightItems } = comparison;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[{ title: leftTitle, items: leftItems }, { title: rightTitle, items: rightItems }].map((panel) => (
        <div key={panel.title} className="surface p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500 dark:text-primary-200">{panel.title}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {panel.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-primary-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Timeline({ timeline }) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {timeline.map((item, index) => (
        <li key={item.title} className="relative surface p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-400">{(index + 1).toString().padStart(2, '0')}</span>
          <h3 className="mt-3 text-base font-semibold text-slate-800 dark:text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

function Checklist({ items }) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="surface flex items-start gap-3 p-5 text-sm text-slate-600 dark:text-slate-300">
          <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ section, index }) {
  const isEven = index % 2 === 0;
  const sectionBg = isEven ? 'bg-white dark:bg-slate-950' : 'bg-slate-100/80 dark:bg-slate-900/40';

  return (
    <section id={section.id} className={`${sectionBg} border-t border-slate-200 py-20 dark:border-slate-800`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 space-y-4">
            <span className="section-heading">{section.eyebrow}</span>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl text-primary-500 dark:text-primary-300">{section.numeral}</span>
              <h2 className="section-title leading-tight">{section.title}</h2>
            </div>
          </div>
          <div className="md:col-span-8 space-y-4 md:mt-8 md:max-w-3xl">
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="section-paragraph">{paragraph}</p>
            ))}
          </div>

          {section.highlights && (
            <div className="md:col-start-5 md:col-span-8">
              <Highlights highlights={section.highlights} />
            </div>
          )}

          {section.columns && (
            <div className="md:col-start-5 md:col-span-8">
              <Columns columns={section.columns} />
            </div>
          )}

          {section.cards && (
            <div className="md:col-start-5 md:col-span-8">
              <Cards cards={section.cards} />
            </div>
          )}

          {section.listItems && (
            <div className="md:col-start-5 md:col-span-8">
              <ListBlock title={section.listTitle} items={section.listItems} />
            </div>
          )}

          {section.comparison && (
            <div className="md:col-start-5 md:col-span-8">
              <Comparison comparison={section.comparison} />
            </div>
          )}

          {section.timeline && (
            <div className="md:col-start-5 md:col-span-8">
              <Timeline timeline={section.timeline} />
            </div>
          )}

          {section.checklist && (
            <div className="md:col-start-5 md:col-span-8">
              <Checklist items={section.checklist} />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs uppercase tracking-[0.3em] md:flex-row md:px-6">
        <span>Crafted for context-first agents</span>
        <a href="#hero" className="text-primary-300 hover:text-primary-200">
          Back to top
        </a>
        <a
          href="https://github.com/yushaw/contextIsAllYouNeed"
          className="text-primary-300 hover:text-primary-200"
          aria-label="GitHub repository"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
}

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 translate-x-[0.5px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="m4.22 4.22 1.42 1.42" />
      <path d="m18.36 18.36 1.42 1.42" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="m4.22 19.78 1.42-1.42" />
      <path d="m18.36 5.64 1.42-1.42" />
      <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.61.07-.6.07-.6 1 .07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.76 1.02.8-.22 1.64-.33 2.48-.33s1.68.11 2.48.33c1.92-1.29 2.76-1.02 2.76-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const t = useMemo(() => content[lang], [lang]);

  useEffect(() => {
    const storedLang = window.localStorage.getItem('lang');
    if (storedLang && LANGS.includes(storedLang)) {
      setLang(storedLang);
      return;
    }

    setLang(resolveSystemLang());
  }, []);

  useEffect(() => {
    window.localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  useEffect(() => {
    const sectionIds = ['hero', ...t.sections.map((section) => section.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const id = visible.target.id;
          setActiveSection(id === 'hero' ? null : id);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Header
        t={t}
        lang={lang}
        theme={theme}
        activeSection={activeSection}
        onToggleLang={toggleLanguage}
        onToggleTheme={toggleTheme}
      />
      <main>
        <Hero hero={t.hero} />
        {t.sections.map((section, index) => (
          <Section key={section.id} section={section} index={index} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
