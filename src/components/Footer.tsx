import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="w-full bg-background-alt py-12 tablet:py-16 desktop:py-16 px-6 tablet:px-10 desktop:px-10">
      <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto flex flex-col tablet:flex-row desktop:flex-row tablet:justify-between desktop:justify-between tablet:items-start desktop:items-start gap-10">
        <div className="flex flex-col gap-4">
          <p className="font-newyork text-primary text-xl">
            Goodland Heights
          </p>
          <p className="font-body text-primary/80 text-sm flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +64 12345678
          </p>
          <p className="font-body text-primary/80 text-sm">
            info@goodland.co.nz
          </p>
          <div className="flex gap-3 mt-2" aria-label="Social links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="X">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <p className="font-body text-text-muted text-xs mt-4">
            © 2024 Goodland Heights Oamaru | Terms & Conditions | Privacy
          </p>
        </div>
        <nav className="flex flex-col gap-2 mt-2 tablet:mt-3">
          <Link to="/overview" className="font-body text-primary/80 text-sm hover:opacity-100 transition-opacity">
            Goodland Heights Oamaru
          </Link>
          <Link to="/joy40" className="font-body text-primary/80 text-sm hover:opacity-100 transition-opacity">
            Joy 40 - Services Apartment
          </Link>
          <Link to="/premiumsection" className="font-body text-primary/80 text-sm hover:opacity-100 transition-opacity">
            Premium Sections
          </Link>
          <a href="https://goodland.co.nz/" target="_blank" rel="noopener noreferrer" className="font-body text-primary/80 text-sm hover:opacity-100 transition-opacity">
            About Goodland Group
          </a>
          <Link to="/contact" className="font-body text-primary/80 text-sm hover:opacity-100 transition-opacity">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
