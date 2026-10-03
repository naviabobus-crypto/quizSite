<?php
header('Content-Type: application/json; charset=utf-8');

require_once 'db.php';

$stmt = $pdo->query('
    SELECT nickname, score
    FROM leaderboard
    ORDER BY score DESC, id ASC
    LIMIT 100
');

$leaders = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($leaders as $index => &$leader) {
    $leader['place'] = $index + 1;
    $leader['score'] = (float)$leader['score'];
}

unset($leader);

echo json_encode($leaders, JSON_UNESCAPED_UNICODE);
?>
