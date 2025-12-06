<?php

namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Workout;
use App\Service\Router;
use App\Service\Templating;

class WorkoutController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $workouts = Workout::findAll();
        return $templating->render('workout/index.html.php', [
            'workouts' => $workouts,
            'router' => $router,
        ]);
    }

    public function showAction(int $workoutId, Templating $templating, Router $router): ?string
    {
        $workout = Workout::find($workoutId);
        if (!$workout) {
            throw new NotFoundException("Missing workout with id $workoutId");
        }

        return $templating->render('workout/show.html.php', [
            'workout' => $workout,
            'router' => $router,
        ]);
    }

    public function createAction(?array $requestData, Templating $templating, Router $router): ?string
    {
        if ($requestData) {
            $workout = Workout::fromArray($requestData);
            $workout->save();
            $router->redirect('index.php?action=workout-index');
            return null;
        } else {
            $workout = new Workout();
        }

        return $templating->render('workout/create.html.php', [
            'workout' => $workout,
            'router' => $router,
        ]);
    }

    public function editAction(int $workoutId, ?array $requestData, Templating $templating, Router $router): ?string
    {
        $workout = Workout::find($workoutId);
        if (!$workout) {
            throw new NotFoundException("Missing workout with id $workoutId");
        }

        if ($requestData) {
            $workout->fill($requestData);
            $workout->save();
            $router->redirect('index.php?action=workout-index');
            return null;
        }

        return $templating->render('workout/edit.html.php', [
            'workout' => $workout,
            'router' => $router,
        ]);
    }

    public function deleteAction(int $workoutId, Router $router): ?string
    {
        $workout = Workout::find($workoutId);
        if (!$workout) {
            throw new NotFoundException("Missing workout with id $workoutId");
        }

        $workout->delete();
        $router->redirect('index.php?action=workout-index');
        return null;
    }
}