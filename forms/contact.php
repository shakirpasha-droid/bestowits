<?php
// Bestow ITs contact form handler
// Sends enquiries to Bestow ITs and sets the visitor as Reply-To.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

function clean_header($value) {
    $value = trim((string)$value);
    return str_replace(["\r", "\n"], '', $value);
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    exit('Please complete all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Please enter a valid email address.');
}

$name = clean_header($name);
$email = clean_header($email);
$subject = clean_header($subject);

$to = 'bestowits@gmail.com';
$subject_line = 'Website Enquiry: ' . $subject;
$body = "New enquiry received from the Bestow ITs website.\n\n"
       . "Name: " . $name . "\n"
       . "Email: " . $email . "\n"
       . "Subject: " . $subject . "\n\n"
       . "Message:\n" . $message . "\n";

// Use your domain email as From and the visitor's email as Reply-To.
// This allows you to click Reply in your mailbox and respond directly to the visitor.
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: Bestow ITs Website <bestowits@gmail.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

if (mail($to, $subject_line, $body, $headers)) {
    echo 'OK';
} else {
    http_response_code(500);
    exit('Unable to send your message right now. Please contact us on WhatsApp.');
}
?>
