CREATE TABLE workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    duration INTEGER NOT NULL,
    intensity TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO workouts (name, duration, intensity, created_at) VALUES
('Push day', 60, 'Hard', datetime('now')),
('Pull day', 50, 'Medium', datetime('now')),
('Leg day', 70, 'Hard', datetime('now'));