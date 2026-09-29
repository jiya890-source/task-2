<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$name = trim($_POST["candidateName"] ?? "");
$email = trim($_POST["candidateEmail"] ?? "");
$position = trim($_POST["position"] ?? "");
$status = $_POST["status"] ?? "";

if ($name === "" || $email === "" || $position === "") {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);
    exit;
}

if ($status === "Selected") {

    $subject = "Congratulations! Selected for " . $position;

    $message = "Dear " . $name . ",\n\n";
    $message .= "We are pleased to inform you that you have been selected for the position of " . $position . ".\n\n";
    $message .= "Please reply to this email to confirm your acceptance.\n\n";
    $message .= "Best regards,\nHR Team";

} else {

    $subject = "Application Update - " . $position;

    $message = "Dear " . $name . ",\n\n";
    $message .= "Thank you for applying for the position of " . $position . ".\n\n";
    $message .= "We regret to inform you that we have decided to move forward with other candidates.\n\n";
    $message .= "Best regards,\nHR Team";
}

$headers = "From: HR Team <hr@example.com>\r\n";
$headers .= "Reply-To: hr@example.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($email, $subject, $message, $headers);

if ($sent) {
    echo json_encode([
        "success" => true,
        "message" => "Email sent successfully!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Email could not be sent. Please check your mail server settings."
    ]);
}
?>