/**
 * Shared helper — POST form data to mail/send.php (SMTP → Gmail)
 */
(function (global) {
  'use strict';

  function mailEndpoint() {
    try {
      return new URL('mail/send.php', window.location.href).href;
    } catch (e) {
      return 'mail/send.php';
    }
  }

  /**
   * @param {Object} payload
   * @returns {Promise<{ok:boolean, error?:string, message?:string}>}
   */
  function sendFormMail(payload) {
    return fetch(mailEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || !data || !data.ok) {
          var err = (data && (data.error || data.detail)) || 'Failed to send. Please try again.';
          return Promise.reject(new Error(err));
        }
        return data;
      }).catch(function (parseErr) {
        if (parseErr instanceof Error && parseErr.message && parseErr.message !== 'Unexpected end of JSON input') {
          return Promise.reject(parseErr);
        }
        return Promise.reject(new Error('Mail server is not reachable. Use PHP hosting and configure mail/config.php.'));
      });
    });
  }

  global.MadhavMail = { sendFormMail: sendFormMail };
})(window);
