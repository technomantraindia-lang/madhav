<?php
/**
 * Lightweight SMTP mailer (TLS / AUTH LOGIN) — no Composer required.
 */
class SmtpMailer
{
  private $host;
  private $port;
  private $user;
  private $pass;
  private $secure;
  private $socket;
  private $lastError = '';

  public function __construct(array $config)
  {
    $this->host   = $config['smtp_host'];
    $this->port   = (int) $config['smtp_port'];
    $this->user   = $config['smtp_user'];
    $this->pass   = $config['smtp_pass'];
    $this->secure = $config['smtp_secure'];
  }

  public function getLastError()
  {
    return $this->lastError;
  }

  public function send($fromEmail, $fromName, $toEmail, $toName, $subject, $htmlBody, $replyToEmail = '', $replyToName = '')
  {
    try {
      $this->connect();
      $this->expect(220);

      $this->cmd('EHLO localhost');
      $this->expect(250);

      if (strtolower($this->secure) === 'tls') {
        $this->cmd('STARTTLS');
        $this->expect(220);
        if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
          throw new Exception('TLS negotiation failed.');
        }
        $this->cmd('EHLO localhost');
        $this->expect(250);
      }

      $this->cmd('AUTH LOGIN');
      $this->expect(334);
      $this->cmd(base64_encode($this->user));
      $this->expect(334);
      $this->cmd(base64_encode($this->pass));
      $this->expect(235);

      $this->cmd('MAIL FROM:<' . $this->user . '>');
      $this->expect(250);
      $this->cmd('RCPT TO:<' . $toEmail . '>');
      $this->expect(250);

      $this->cmd('DATA');
      $this->expect(354);

      $boundary = 'b_' . md5(uniqid((string) mt_rand(), true));
      $plain = trim(html_entity_decode(strip_tags(str_replace(['<br>', '<br/>', '<br />', '</p>'], ["\n", "\n", "\n", "\n\n"], $htmlBody)), ENT_QUOTES, 'UTF-8'));

      $headers  = 'Date: ' . date('r') . "\r\n";
      $headers .= 'From: ' . $this->encodeAddress($fromName, $fromEmail) . "\r\n";
      $headers .= 'To: ' . $this->encodeAddress($toName, $toEmail) . "\r\n";
      if ($replyToEmail) {
        $headers .= 'Reply-To: ' . $this->encodeAddress($replyToName ?: $replyToEmail, $replyToEmail) . "\r\n";
      }
      $headers .= 'Subject: ' . $this->encodeHeader($subject) . "\r\n";
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= 'Content-Type: multipart/alternative; boundary="' . $boundary . "\"\r\n";
      $headers .= "X-Mailer: MadhavPolymers-SMTP\r\n";

      $body  = '--' . $boundary . "\r\n";
      $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
      $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
      $body .= chunk_split(base64_encode($plain)) . "\r\n";
      $body .= '--' . $boundary . "\r\n";
      $body .= "Content-Type: text/html; charset=UTF-8\r\n";
      $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
      $body .= chunk_split(base64_encode($htmlBody)) . "\r\n";
      $body .= '--' . $boundary . "--\r\n";

      $data = $headers . "\r\n" . $this->dotStuff($body) . "\r\n.";
      fwrite($this->socket, $data . "\r\n");
      $this->expect(250);

      $this->cmd('QUIT');
      $this->close();
      return true;
    } catch (Exception $e) {
      $this->lastError = $e->getMessage();
      $this->close();
      return false;
    }
  }

  private function connect()
  {
    $errno = 0;
    $errstr = '';
    $this->socket = @stream_socket_client(
      'tcp://' . $this->host . ':' . $this->port,
      $errno,
      $errstr,
      30,
      STREAM_CLIENT_CONNECT
    );
    if (!$this->socket) {
      throw new Exception('SMTP connect failed: ' . $errstr . ' (' . $errno . ')');
    }
    stream_set_timeout($this->socket, 30);
  }

  private function cmd($line)
  {
    fwrite($this->socket, $line . "\r\n");
  }

  private function expect($code)
  {
    $response = '';
    while (($line = fgets($this->socket, 515)) !== false) {
      $response .= $line;
      if (isset($line[3]) && $line[3] === ' ') {
        break;
      }
    }
    $got = (int) substr($response, 0, 3);
    if ($got !== (int) $code) {
      throw new Exception('SMTP unexpected reply (wanted ' . $code . '): ' . trim($response));
    }
  }

  private function close()
  {
    if (is_resource($this->socket)) {
      fclose($this->socket);
    }
    $this->socket = null;
  }

  private function encodeAddress($name, $email)
  {
    $name = trim((string) $name);
    if ($name === '') {
      return '<' . $email . '>';
    }
    return '"' . addcslashes($name, '"\\') . '" <' . $email . '>';
  }

  private function encodeHeader($text)
  {
    if (preg_match('/[^\x20-\x7E]/', $text)) {
      return '=?UTF-8?B?' . base64_encode($text) . '?=';
    }
    return $text;
  }

  private function dotStuff($body)
  {
    return preg_replace('/^\./m', '..', str_replace(["\r\n", "\r", "\n"], "\r\n", $body));
  }
}
