<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Workout</title>
    <style>
        body { font-family: Arial, sans-serif; background: #000; color: #fff; margin: 20px; }
        h1 { color: #ff0000; }
        form { background: #1a1a1a; padding: 20px; border-radius: 5px; max-width: 400px; }
        input { width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #ff0000; background: #000; color: #fff; }
        button { padding: 10px 15px; background: #ff0000; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
        a { display: inline-block; margin-top: 10px; color: #ff0000; text-decoration: none; }
    </style>
</head>
<body>

<h1>Edit Workout</h1>

<form method="post">
    <input type="text" name="name" value="<?= htmlspecialchars($workout->getName()) ?>">
    <input type="number" name="duration" value="<?= htmlspecialchars($workout->getDuration()) ?>">
    <input type="text" name="intensity" value="<?= htmlspecialchars($workout->getIntensity()) ?>">
    <button type="submit">Update</button>
</form>

<a href="/index.php?action=workout-index">Back</a>

</body>
</html>