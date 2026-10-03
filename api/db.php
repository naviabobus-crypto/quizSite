<?php
$host = 'localhost';
$dbname = 'quiz';
$username = 'root';
$password = 'Lyagushka123';

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    die('Ошибка подключения к базе данных.');
}
?>
