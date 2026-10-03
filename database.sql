CREATE DATABASE IF NOT EXISTS quiz
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE quiz;

CREATE TABLE IF NOT EXISTS leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    score DECIMAL(10, 2) NOT NULL
);

SELECT
    ROW_NUMBER() OVER (ORDER BY score DESC, id ASC) AS place,
    nickname,
    score
FROM leaderboard
ORDER BY score DESC, id ASC;
