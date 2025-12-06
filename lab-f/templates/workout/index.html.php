<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Workout Plans</title>
    <style>
        body { font-family: Arial, sans-serif; background: #000; color: #fff; margin: 20px; }
        h1 { color: #ff0000; }
        .add-btn { display: inline-block; margin-bottom: 15px; padding: 8px 12px; background: #ff0000; color: #fff; border-radius: 4px; text-decoration: none; }
        .workout-list { list-style: none; padding: 0; }
        .workout-item { background: #1a1a1a; margin-bottom: 10px; padding: 10px 15px; border-radius: 5px; }
        .workout-item a { margin-left: 10px; color: #ff0000; text-decoration: none; }
    </style>
</head>
<body>

<h1>Workout Plans</h1>

<a href="/index.php?action=workout-create" class="add-btn">+ Add Workout</a>

<ul class="workout-list">
<?php foreach ($workouts as $w): ?>
    <li class="workout-item">
        <strong><?= htmlspecialchars($w->getName()) ?></strong>
        - <?= htmlspecialchars($w->getDuration()) ?> min
        - <?= htmlspecialchars($w->getIntensity()) ?>
        <a href="/index.php?action=workout-show&id=<?= $w->getId() ?>">Show</a>
        <a href="/index.php?action=workout-edit&id=<?= $w->getId() ?>">Edit</a>
        <a href="/index.php?action=workout-delete&id=<?= $w->getId() ?>">Delete</a>
    </li>
<?php endforeach; ?>
</ul>

</body>
</html>