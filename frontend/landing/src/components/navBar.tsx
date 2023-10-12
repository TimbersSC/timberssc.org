import { navLinks } from '../utils/constants/nav';

import ReadingProgress from './post/readingProgress';

export default function NavBar() {
  return (
    <div
      className="position-sticky top-0 color-shadow-medium border-bottom"
      style={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: 'hsla(0,0%,100%,.8)',
        zIndex: 2
      }}
    >
      <nav className="container-xl mx-auto p-responsive">
        <div className="d-inline-flex flex-items-center">
          <div className="d-flex flex-items-center">
            <a href="//ferant.io">
              <img
                src="//cdn.ferant.io/branding/logo-symbol-marginless.png"
                style={{
                  display: 'block',
                  height: '2.25rem',
                }}
              />
            </a>
            <span
              className="d-inline-block ml-2 f1-mktg f2-md-mktg"
              style={{ opacity: 0.3 }}
            >
              /
            </span>
            <a
              className="d-inline-block Header-link text-semibold ml-2 f2 color-fg-default"
              href="/"
            >
              Blog
            </a>
          </div>
          <ul className="ml-3 d-flex flex-justify-between flex-items-center pt-3 pb-3 color-fg-default">
            {navLinks.map((link: any) => (
              <li className="ml-4 list-style-none">
                <a
                  href={link.path}
                  className="d-block no-wrap f4-mktg color-fg-default text-semibold"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <ReadingProgress></ReadingProgress>
    </div>
  );
}
