import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { Link } from 'react-router-dom'

const CONTACT_EMAIL = 'info@goodlandheights.com'
const CONTACT_PHONE = '+64 3 434 1234'
const CONTACT_ADDRESS = 'North Canterbury, Goodland 9400\nNew Zealand'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [touched, setTouched] = useState({ name: false, email: false, message: false })

  const nameError = touched.name && !name.trim()
  const emailError = touched.email && !email.trim()
  const messageError = touched.message && !message.trim()
  const isValid = name.trim() && email.trim() && message.trim() && privacyConsent

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    const subject = encodeURIComponent(`Contact from ${name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="pt-[78px] flex-1 py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10">
        <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
          <h1 className="font-newyork text-primary text-3xl tablet:text-4xl desktop:text-4xl mb-10 tablet:mb-12 desktop:mb-12">
            Contact
          </h1>

          <div className="flex flex-col desktop:flex-row gap-12 tablet:gap-16 desktop:gap-20">
            {/* Left: Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-6"
            >
              <div>
                <label htmlFor="name" className="block font-body font-medium text-primary mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  className={`w-full px-4 py-3 font-body text-primary placeholder:text-primary/40 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    nameError ? 'border-red-400' : 'border-primary/20'
                  }`}
                />
                {nameError && (
                  <p className="font-body text-red-500 text-sm mt-1">Please enter your name</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block font-body font-medium text-primary mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={`w-full px-4 py-3 font-body text-primary placeholder:text-primary/40 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    emailError ? 'border-red-400' : 'border-primary/20'
                  }`}
                />
                {emailError && (
                  <p className="font-body text-red-500 text-sm mt-1">Please enter your email</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block font-body font-medium text-primary mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  className={`w-full px-4 py-3 font-body text-primary placeholder:text-primary/40 bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y min-h-[120px] ${
                    messageError ? 'border-red-400' : 'border-primary/20'
                  }`}
                />
                {messageError && (
                  <p className="font-body text-red-500 text-sm mt-1">Please enter your message</p>
                )}
              </div>

              <div className="flex gap-3 items-start">
                <input
                  id="privacy"
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/30"
                />
                <label htmlFor="privacy" className="font-body text-primary/80 text-sm leading-relaxed">
                  By providing Goodland Heights your contact information, you acknowledge and agree to our{' '}
                  <Link to="/privacy" className="text-primary underline hover:opacity-80">
                    Privacy Policy
                  </Link>{' '}
                  and consent to receiving marketing communications, including through automated calls, texts, and emails, some of which may use artificial or prerecorded voices. This consent isn&apos;t necessary for purchasing any products or services and you may opt out at any time. To opt out from texts, you can reply &apos;stop&apos; at any time. To opt out from emails, you can click on the unsubscribe link in the emails. Message and data rates may apply.
                </label>
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="w-fit px-8 py-3 font-body font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded flex items-center gap-2 uppercase text-sm"
              >
                SEND
                <span aria-hidden>→</span>
              </button>
            </form>

            {/* Right: Contact Details */}
            <div className="desktop:min-w-[280px] desktop:max-w-[320px]">
              <h2 className="font-body font-medium text-primary text-lg mb-6">Contact Details</h2>
              <div className="space-y-6 font-body">
                <div>
                  <p className="font-medium text-primary mb-1">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-primary/80 hover:text-primary transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="font-medium text-primary mb-1">Phone</p>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                    className="text-primary/80 hover:text-primary transition-colors"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
                <div>
                  <p className="font-medium text-primary mb-1">Address</p>
                  <p className="text-primary/80 whitespace-pre-line">{CONTACT_ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
