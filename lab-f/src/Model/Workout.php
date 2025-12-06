<?php
namespace App\Model;

use App\Service\Config;

class Workout
{
    private ?int $id = null;
    private ?string $name = null;
    private ?int $duration = null;
    private ?string $intensity = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Workout
    {
        $this->id = $id;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Workout
    {
        $this->name = $name;
        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(?int $duration): Workout
    {
        $this->duration = $duration;
        return $this;
    }

    public function getIntensity(): ?string
    {
        return $this->intensity;
    }

    public function setIntensity(?string $intensity): Workout
    {
        $this->intensity = $intensity;
        return $this;
    }

    public static function fromArray($array): Workout
    {
        $workout = new self();
        $workout->fill($array);
        return $workout;
    }

    public function fill($array): Workout
    {
        if (isset($array['id']) && !$this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['duration'])) {
            $this->setDuration($array['duration']);
        }
        if (isset($array['intensity'])) {
            $this->setIntensity($array['intensity']);
        }
        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $stmt = $pdo->prepare("SELECT * FROM workouts");
        $stmt->execute();

        $workouts = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $w) {
            $workouts[] = self::fromArray($w);
        }
        return $workouts;
    }

    public static function find($id): ?Workout
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $stmt = $pdo->prepare("SELECT * FROM workouts WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $w = $stmt->fetch(\PDO::FETCH_ASSOC);

        return $w ? self::fromArray($w) : null;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));

        if (!$this->getId()) {
            $stmt = $pdo->prepare("INSERT INTO workouts (name, duration, intensity) VALUES (:name, :duration, :intensity)");
            $stmt->execute([
                'name' => $this->getName(),
                'duration' => $this->getDuration(),
                'intensity' => $this->getIntensity()
            ]);
            $this->setId($pdo->lastInsertId());
        } else {
            $stmt = $pdo->prepare("UPDATE workouts SET name = :name, duration = :duration, intensity = :intensity WHERE id = :id");
            $stmt->execute([
                'name' => $this->getName(),
                'duration' => $this->getDuration(),
                'intensity' => $this->getIntensity(),
                'id' => $this->getId()
            ]);
        }
    }

    public function delete(): void
    {
        if (!$this->getId()) return;

        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $stmt = $pdo->prepare("DELETE FROM workouts WHERE id = :id");
        $stmt->execute(['id' => $this->getId()]);

        $this->setId(null);
        $this->setName(null);
        $this->setDuration(null);
        $this->setIntensity(null);
    }
}