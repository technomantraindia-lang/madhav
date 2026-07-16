<?php
/**
 * Form mail endpoint — receives Get a Quote / Contact Us submissions
 * and emails them to madhavpoly7827@gmail.com via SMTP.
 *
 * POST JSON or form-urlencoded to: /mail/send.php
 */

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed. Use POST.']);
  exit;
}

$configPath = __DIR__ . '/config.php';
$localPath = __DIR__ . '/config.local.php';
if (!file_exists($configPath) && !file_exists($localPath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Mail config missing.']);
  exit;
}

$config = file_exists($configPath) ? require $configPath : [];
if (file_exists($localPath)) {
  $local = require $localPath;
  if (is_array($local)) {
    $config = array_merge($config, $local);
  }
}

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (!empty($config['allowed_origins']) && is_array($config['allowed_origins'])) {
  if ($origin && in_array($origin, $config['allowed_origins'], true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
  }
} elseif ($origin) {
  header('Access-Control-Allow-Origin: ' . $origin);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data) || empty($data)) {
  $data = $_POST;
}

function clean($value, $max = 2000)
{
  $value = trim((string) $value);
  $value = strip_tags($value);
  if (strlen($value) > $max) {
    $value = substr($value, 0, $max);
  }
  return $value;
}

$formType = clean(isset($data['formType']) ? $data['formType'] : 'contact', 40);
$honeypot = clean(isset($data['website']) ? $data['website'] : '', 100);

// Bot trap — silently succeed
if ($honeypot !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
$time = date('d M Y, h:i A');

if ($formType === 'quote') {
  $fullName    = clean(isset($data['fullName']) ? $data['fullName'] : '', 120);
  $email       = clean(isset($data['email']) ? $data['email'] : '', 160);
  $phone       = clean(isset($data['phone']) ? $data['phone'] : '', 40);
  $company     = clean(isset($data['company']) ? $data['company'] : '', 160);
  $product     = clean(isset($data['product']) ? $data['product'] : '', 80);
  $industry    = clean(isset($data['industry']) ? $data['industry'] : '', 80);
  $city        = clean(isset($data['city']) ? $data['city'] : '', 120);
  $quantity    = clean(isset($data['quantity']) ? $data['quantity'] : '', 80);
  $requirement = clean(isset($data['requirement']) ? $data['requirement'] : '', 4000);

  if ($fullName === '' || $email === '' || $phone === '' || $company === '' || $product === '' || $industry === '' || $requirement === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill all required quote fields.']);
    exit;
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address.']);
    exit;
  }

  $subject = 'New Quote Request — ' . $fullName . ' (' . $company . ')';
  $title = 'Get a Quote Form Submission';
  $rows = [
    'Full Name' => $fullName,
    'Email' => $email,
    'Phone' => $phone,
    'Company' => $company,
    'Product Interest' => $product,
    'Application / Industry' => $industry,
    'City / Location' => $city !== '' ? $city : '—',
    'Estimated Quantity' => $quantity !== '' ? $quantity : '—',
    'Requirement' => nl2br(htmlspecialchars($requirement, ENT_QUOTES, 'UTF-8')),
  ];
  $replyTo = $email;
  $replyName = $fullName;
} else {
  $name    = clean(isset($data['name']) ? $data['name'] : '', 120);
  $email   = clean(isset($data['email']) ? $data['email'] : '', 160);
  $company = clean(isset($data['company']) ? $data['company'] : '', 160);
  $phone   = clean(isset($data['phone']) ? $data['phone'] : '', 40);
  $subjectField = clean(isset($data['subject']) ? $data['subject'] : '', 80);
  $message = clean(isset($data['message']) ? $data['message'] : '', 4000);

  if ($name === '' || $email === '' || $subjectField === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill all required contact fields.']);
    exit;
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address.']);
    exit;
  }

  $subject = 'New Contact Message — ' . $name;
  $title = 'Contact Us Form Submission';
  $rows = [
    'Full Name' => $name,
    'Email' => $email,
    'Company' => $company !== '' ? $company : '—',
    'Phone' => $phone !== '' ? $phone : '—',
    'Subject' => $subjectField,
    'Message' => nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')),
  ];
  $replyTo = $email;
  $replyName = $name;
}

if (empty($config['smtp_pass']) || $config['smtp_pass'] === 'REPLACE_WITH_GMAIL_APP_PASSWORD') {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'error' => 'Email is not configured yet. Add the Gmail App Password in mail/config.php.',
  ]);
  exit;
}

$rowHtml = '';
foreach ($rows as $label => $value) {
  $safeLabel = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
  if ($label === 'Requirement' || $label === 'Message') {
    $safeValue = $value;
  } else {
    $safeValue = htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
  }
  $rowHtml .=
    '<tr>' .
      '<td style="padding:10px 12px;border-bottom:1px solid #eceff5;font-weight:700;color:#3D1F8C;width:34%;vertical-align:top;">' . $safeLabel . '</td>' .
      '<td style="padding:10px 12px;border-bottom:1px solid #eceff5;color:#1a1247;vertical-align:top;">' . $safeValue . '</td>' .
    '</tr>';
}

$html =
  '<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f0ff;padding:24px;">' .
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e8eaf2;">' .
      '<div style="background:linear-gradient(135deg,#3D1F8C,#5a35c4);padding:20px 24px;color:#fff;">' .
        '<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">Madhav Polymers</div>' .
        '<h1 style="margin:6px 0 0;font-size:22px;">' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</h1>' .
      '</div>' .
      '<div style="padding:8px 12px 20px;">' .
        '<table style="width:100%;border-collapse:collapse;font-size:14px;">' . $rowHtml . '</table>' .
        '<p style="margin:18px 12px 0;font-size:12px;color:#6b7280;">Submitted: ' . htmlspecialchars($time, ENT_QUOTES, 'UTF-8') .
        ' · IP: ' . htmlspecialchars($ip, ENT_QUOTES, 'UTF-8') . '</p>' .
      '</div>' .
    '</div>' .
  '</div>';

require_once __DIR__ . '/SmtpMailer.php';

$mailer = new SmtpMailer($config);
$ok = $mailer->send(
  $config['from_email'],
  $config['from_name'],
  $config['to_email'],
  $config['to_name'],
  $subject,
  $html,
  $replyTo,
  $replyName
);

if (!$ok) {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'error' => 'Could not send email. Check SMTP settings / App Password.',
    'detail' => $mailer->getLastError(),
  ]);
  exit;
}

echo json_encode(['ok' => true, 'message' => 'Email sent successfully.']);
