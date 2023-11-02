export default function Footer() {
  return (
    <footer
      className="mt-auto position-relative"
      data-color-mode="dark"
      data-dark-theme="dark"
    >
      <div className="container-xl p-responsive">
        <div className="d-flex flex-wrap py-5 mb-5">FOOTER</div>
      </div>
      <div className="color-bg-subtle">
        <div className="container-xl p-responsive-blog f6 py-4 d-sm-flex flex-justify-between flex-row-reverse flex-items-center">
          <ul className="list-style-none d-flex flex-items-center mb-3 mb-sm-0 lh-condensed-ultra social">
            {/* <li className="mr-3">
              <a
                href="https://twitter.com/ferant"
                data-ga-click="Blog, go to Twitter, resources footer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 273.5 222.3"
                  className="d-block"
                  height="18"
                >
                  <path
                    d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="sr-only">Ferant on Twitter</span>
              </a>
            </li> */}
            {/* <li className="mr-3">
              <a
                href="https://www.facebook.com/Ferant"
                data-ga-click="Blog, go to Facebook, resources footer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15.3 15.4"
                  className="d-block"
                  height="18"
                >
                  <path
                    d="M14.5 0H.8a.88.88 0 0 0-.8.9v13.6a.88.88 0 0 0 .8.9h7.3v-6h-2V7.1h2V5.4a2.87 2.87 0 0 1 2.5-3.1h.5a10.87 10.87 0 0 1 1.8.1v2.1h-1.3c-1 0-1.1.5-1.1 1.1v1.5h2.3l-.3 2.3h-2v5.9h3.9a.88.88 0 0 0 .9-.8V.8a.86.86 0 0 0-.8-.8z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="sr-only">Ferant on Facebook</span>
              </a>
            </li> */}
            {/* <li className="mr-3">
              <a
                href="https://www.youtube.com/ferant"
                data-ga-click="Blog, go to YouTube, resources footer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19.17 13.6"
                  className="d-block"
                  height="16"
                >
                  <path
                    d="M18.77 2.13A2.4 2.4 0 0 0 17.09.42C15.59 0 9.58 0 9.58 0a57.55 57.55 0 0 0-7.5.4A2.49 2.49 0 0 0 .39 2.13 26.27 26.27 0 0 0 0 6.8a26.15 26.15 0 0 0 .39 4.67 2.43 2.43 0 0 0 1.69 1.71c1.52.42 7.5.42 7.5.42a57.69 57.69 0 0 0 7.51-.4 2.4 2.4 0 0 0 1.68-1.71 25.63 25.63 0 0 0 .4-4.67 24 24 0 0 0-.4-4.69zM7.67 9.71V3.89l5 2.91z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="sr-only">Ferant on YouTube</span>
              </a>
            </li> */}
            {/* <li className="mr-3 flex-self-start">
              <a
                href="https://www.twitch.tv/ferant"
                data-ga-click="Blog, go to Twitch, resources footer"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-block"
                  height="18"
                >
                  <path
                    d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="sr-only">Ferant on Twitch</span>
              </a>
            </li> */}
            {/* <li className="mr-3 flex-self-start">
              <a
                href="https://www.tiktok.com/@ferant"
                data-ga-click="Blog, go to TikTok, resources footer"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-block"
                  height="18"
                >
                  <path
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="sr-only">Ferant on TikTok</span>
              </a>
            </li> */}
            <li className="mr-3 flex-self-start">
              <a
                href="https://www.linkedin.com/company/ferant"
                data-ga-click="Blog, go to Linkedin, resources footer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 19 18"
                  className="d-block"
                  height="18"
                >
                  <path
                    d="M3.94 2A2 2 0 1 1 2 0a2 2 0 0 1 1.94 2zM4 5.48H0V18h4zm6.32 0H6.34V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18H19v-7.93c0-6.17-7.06-5.94-8.72-2.91z"
                    fill="currentColor"
                  ></path>
                </svg>

                <span className="sr-only">Ferant on LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/theferant"
                data-ga-click="Blog, go to github's org, resources footer"
              >
                <svg
                  height="20"
                  className="octicon octicon-mark-github d-block"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
                <span className="sr-only">Ferant's organization on GitHub</span>
              </a>
            </li>
          </ul>

          <ul className="list-style-none d-flex flex-wrap text-gray">
            <li className="mr-3">© 2023 Ferant, Inc.</li>

            <li className="mr-3">
              <a
                href="https://docs.ferant.io/en/github/site-policy/github-terms-of-service"
                data-ga-click="Site Foundation Components, go to terms, site foundation components footer"
                className="Link--secondary"
              >
                Terms
              </a>
            </li>

            <li className="mr-3">
              <a
                href="https://docs.ferant.io/en/github/site-policy/github-privacy-statement"
                data-ga-click="Site Foundation Components, go to privacy, site foundation components footer"
                className="Link--secondary"
              >
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
