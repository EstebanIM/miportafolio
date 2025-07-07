'use client'

export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('ui-theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.add('light');
        }
      } catch (e) {}
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
