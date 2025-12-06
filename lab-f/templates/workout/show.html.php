<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Workout Details</title>
    <style>
        body { font-family: Arial, sans-serif; background: #000; color: #fff; margin: 20px; }
        h1 { color: #ff0000; }
        .workout-details { background: #1a1a1a; padding: 20px; border-radius: 5px; max-width: 400px; }
        a { display: inline-block; margin-top: 15px; color: #ff0000; text-decoration: none; }
    </style>
</head>
<body>

<h1>Workout Details</h1>

<div class="workout-details">
    <p><strong>Name:</strong> <?= htmlspecialchars($workout->getName()) ?></p>
    <p><strong>Duration:</strong> <?= htmlspecialchars($workout->getDuration()) ?> min</p>
    <p><strong>Intensity:</strong> <?= htmlspecialchars($workout->getIntensity()) ?></p>
    <a href="/index.php?action=workout-index">Back</a>
</div>

</body>
</html>