import { Link } from 'react-router-dom'

interface MenuFlyoutProps {
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/features', label: 'Features' },
  { to: '/properties', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function MenuFlyout({ open, onClose }: MenuFlyoutProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background-alt shadow-xl z-50 transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-10 pb-10">
          <nav className="flex flex-col gap-6">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className="font-body text-primary text-lg tablet:text-xl desktop:text-xl hover:opacity-80 transition-opacity py-2 border-b border-primary/10"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
