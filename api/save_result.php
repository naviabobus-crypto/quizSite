<?php
header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$nickname = trim($data['nickname'] ?? '');
$score = $data['score'] ?? null;

if ($nickname === '' || $score === null || !is_numeric($score)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некорректные данные.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$nickname = mb_substr($nickname, 0, 50);
$score = round((float)$score, 2);

$stmt = $pdo->prepare('INSERT INTO leaderboard (nickname, score) VALUES (:nickname, :score)');
$stmt->execute([
    ':nickname' => $nickname,
    ':score' => $score
]);

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
?>
