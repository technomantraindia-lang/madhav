<?php
/**
 * SMTP mail config for Madhav Polymers forms.
 *
 * SETUP (Gmail):
 * 1. Enable 2-Step Verification on madhavpoly7827@gmail.com
 * 2. Create an App Password: Google Account → Security → App passwords
 * 3. Paste the 16-character App Password in smtp_pass below
 * 4. Upload this folder to your PHP hosting and open site over http/https
 */

return [
  // Where form submissions are delivered
  'to_email'   => 'madhavpoly7827@gmail.com',
  'to_name'    => 'Madhav Polymers',

  // Gmail SMTP (use App Password, NOT your normal login password)
  'smtp_host'  => 'smtp.gmail.com',
  'smtp_port'  => 587,
  'smtp_secure'=> 'tls',
  'smtp_user'  => 'madhavpoly7827@gmail.com',
  'smtp_pass'  => 'REPLACE_WITH_GMAIL_APP_PASSWORD',

  // Shown as the From address
  'from_email' => 'madhavpoly7827@gmail.com',
  'from_name'  => 'Madhav Polymers Website',

  // Allowed origins (leave empty to allow same-host only). Example:
  // 'allowed_origins' => ['https://yourdomain.com'],
  'allowed_origins' => [],
];
