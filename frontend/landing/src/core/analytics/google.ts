declare let gtag: Function;

class _GoogleAnalytics {
  protected initialized = false;

  /**
   * Setup Google Analytics and disable advertising features.
   *
   * @param trackingId
   */
  public setup(gaTrackingId: string, userId: string): void {
    if (this.initialized) {
      console.warn('GoogleAnalytics already initiated');
      return;
    }

    //
    const _gTag$Manager$Link = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;

    //
    const _ga$Inline$Script = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}', {user_id: '${userId}'});
        gtag('set', 'user_properties', {crm_id: '${userId}'});
        `;
    //   gtag('config', '${gaTrackingId}');

    const _found = {
      gTag$Manager$Script: false,
      ga$Script: false,
    };
    const _scripts = document.getElementsByTagName('script');
    Array.from(_scripts).forEach((script: HTMLScriptElement) => {
      if (
        script.src.substr(-_gTag$Manager$Link.length) === _gTag$Manager$Link
      ) {
        _found.gTag$Manager$Script = true;
      }

      if (script.innerHTML === _ga$Inline$Script) {
        _found.ga$Script = true;
      }
    });

    if (!_found.gTag$Manager$Script) {
      const gTag$Manager$Script = document.createElement('script');
      gTag$Manager$Script.async = true;
      gTag$Manager$Script.src = _gTag$Manager$Link;
      document.head.appendChild(gTag$Manager$Script);
    }

    if (!_found.ga$Script) {
      // register google analytics
      const ga$Script = document.createElement('script');
      ga$Script.innerHTML = _ga$Inline$Script;
      document.head.appendChild(ga$Script);
    }

    // Disable all advertising features with `gtag.js`
    gtag('set', 'allow_google_signals', false);
    // disable all advertising personalization with `gtag.js`
    gtag('set', 'allow_ad_personalization_signals', false);

    this.initialized = true;
  }

  public setUserDomain(domain: string): void {
    gtag('set', 'user_properties', { user_domain: domain });
  }

  public setUserAccountType(accountType: string): void {
    gtag('set', 'user_properties', { user_account_type: accountType });
  }
}

export const GoogleAnalytics = new _GoogleAnalytics();

// export function sendToAnalytics({ id, name, value }) {
//   ga('send', 'event', {
//     eventCategory: 'Web Vitals',
//     eventAction: name,
//     eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
//     eventLabel: id, // id unique to current page load
//     nonInteraction: true, // avoids affecting bounce rate
//   });
// }
