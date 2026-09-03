import { DEPLOY_CHECK_MARKER } from './meta-qa'

export const GA_MEASUREMENT_ID = 'G-1H6CPZVB8D'
export const GA_QA_SESSION_KEY = 'clearedge_ga_deploy_check_disabled'

/**
 * Runs before gtag configuration. A deploy-check URL disables GA4 for the
 * entire browser session, so navigating away from the tagged URL cannot leak
 * QA page views or test conversions into business reporting.
 */
export function googleAnalyticsBootstrapScript(): string {
  const measurementId = JSON.stringify(GA_MEASUREMENT_ID)
  const marker = JSON.stringify(DEPLOY_CHECK_MARKER)
  const sessionKey = JSON.stringify(GA_QA_SESSION_KEY)

  return `
    (function () {
      var measurementId = ${measurementId};
      var marker = ${marker};
      var sessionKey = ${sessionKey};
      var isQa = false;

      try {
        var params = new URLSearchParams(window.location.search);
        var fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
        isQa = fields.some(function (field) {
          var value = params.get(field);
          return value && value.toLowerCase().indexOf(marker) !== -1;
        });
      } catch (_) {
        isQa = false;
      }

      try {
        if (isQa) window.sessionStorage.setItem(sessionKey, '1');
        isQa = isQa || window.sessionStorage.getItem(sessionKey) === '1';
      } catch (_) {
        // Keep a deploy-check URL disabled even if storage is blocked. For a
        // normal URL, failure to read storage deliberately fails open.
      }

      window['ga-disable-' + measurementId] = isQa;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(){window.dataLayer.push(arguments);};
      window.gtag('js', new Date());
      window.gtag('config', measurementId);
    })();
  `
}
