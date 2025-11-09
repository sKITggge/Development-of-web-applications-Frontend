import Logo from './Logo'

export default function Footer() {
  const secondaryNavLinks = [
    { name: 'Privacy Policy', slug: '/privacy-policy' },
    { name: 'Terms of Service', slug: '/terms-of-service' },
  ]

  const socialIcons = [
    {
      icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
    },
    {
      icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
    },
    {
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
  ]

  return (
    <footer className="w-full border-t mt-16 bg-[var(--surface)] border-[var(--border)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Logo />
            <p className="text-base max-w-md text-[var(--muted)] mt-4">
              Bringing you the latest and most relevant news from trusted
              sources worldwide. Stay informed with our news aggregation
              platform.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-[var(--title)]">
              Connect
            </h3>
            <div className="flex space-x-4 mb-6">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: 'var(--button-bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--muted-2)' }}>
              contact@newsaggregator.com
            </p>
          </div>
        </div>
        <div
          className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--muted-2)' }}>
            © 2025 NewsAggregator. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {secondaryNavLinks.map((item) => (
              <a
                key={item.slug}
                href={item.slug}
                className="text-sm transition-colors text-[var(--muted-2)]"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
