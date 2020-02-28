<?php

namespace App\DataFixtures;

use App\Entity\Offer;
use App\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class OfferFixtures extends BaseFixture implements DependentFixtureInterface
{

    private static $city = [
        'Casablanca',
        'Fes',
        'kenitra',
        'Raabat',
        'Marrakeche',
        'Oujda',
        'Tanger'
    ];

    private static $spot = [
        'Centre Ville',
        'gare ferroviaire',
        'Medina',
        'gare routière'
    ];

    private static $carType = [
        'Ford',
        'Renault',
        'Audi',
        'Citroen',
        'Mercedes',
        'Autre'
    ];

    private static $carColor = [
        'Blanche',
        'Noire',
        'rouge',
        'bleu',
        'gris'
    ];


    public function loadData(ObjectManager $manager)
    {
        $this->createMany(10, 'main_offres', function($count) use ($manager) {
            $offer = new Offer();
            $offer->setDepartureCity($this->faker->randomElement(self::$city))
                ->setArrivalCity($this->faker->randomElement(self::$city))
                ->setDepartureSpot($this->faker->randomElement(self::$spot))
                ->setArrivalSpot($this->faker->randomElement(self::$spot))
                ->setDepartureDateFlexible($this->faker->boolean(25))
                ->setDepartureDate($this->faker->dateTimeBetween('now', '+90 days'))
                ->setPrice($this->faker->numberBetween(50, 500))
                ->setSeatCount($this->faker->numberBetween(1, 6))
                ->setLuggage($this->faker->numberBetween(1, 4))
                ->setCarType($this->faker->randomElement(self::$carType))
                ->setCarColor($this->faker->randomElement(self::$carColor))
                ->setAnimalAllowed($this->faker->boolean(25))
                ->setSmokingAllowed($this->faker->boolean(25))

                ->setCreatedAt($this->faker->dateTime('now'))
                ->setUser($this->getRandomReference('main_users'))
            ;

            return $offer;
        });

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixture::class
        ];
    }
}
