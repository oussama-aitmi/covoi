<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\Timestampable;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OfferRepository")
 */
class Offer
{
    use Timestampable;


    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $departure_city;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $arrival_city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $departure_spot;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $arrival_spot;

    /**
     * @ORM\Column(type="datetime")
     */
    private $departure_date;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $departure_date_flexible;

    /**
     * @ORM\Column(type="string", length=6, nullable=true)
     */
    private $price;

    /**
     * @ORM\Column(type="smallint", length=2)
     */
    private $seat_count;

    /**
     * @ORM\Column(type="smallint")
     */
    private $luggage;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $car_type;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $car_color;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     */
    private $animal_allowed;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $smoking_allowed;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $offer_closed;

    /**
     * @ORM\Column(type="string", length=155, unique=true)
     * @Gedmo\Slug(fields={"departure_city", "arrival_city"}, updatable=false, separator="-", dateFormat="d/m/Y")
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $publishedAt;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDepartureCity(): ?string
    {
        return $this->departure_city;
    }

    public function setDepartureCity(string $departure_city): self
    {
        $this->departure_city = $departure_city;

        return $this;
    }

    public function getArrivalCity(): ?string
    {
        return $this->arrival_city;
    }

    public function setArrivalCity(string $arrival_city): self
    {
        $this->arrival_city = $arrival_city;

        return $this;
    }

    public function getDepartureSpot(): ?string
    {
        return $this->departure_spot;
    }

    public function setDepartureSpot(string $departure_spot): self
    {
        $this->departure_spot = $departure_spot;

        return $this;
    }

    public function getArrivalSpot(): ?string
    {
        return $this->arrival_spot;
    }

    public function setArrivalSpot(?string $arrival_spot): self
    {
        $this->arrival_spot = $arrival_spot;

        return $this;
    }

    public function getDepartureDate(): ?\DateTimeInterface
    {
        return $this->departure_date;
    }

    public function setDepartureDate(\DateTimeInterface $departure_date): self
    {
        $this->departure_date = $departure_date;

        return $this;
    }

    public function getDepartureDateFlexible(): ?bool
    {
        return $this->departure_date_flexible;
    }

    public function setDepartureDateFlexible(bool $departure_date_flexible): self
    {
        $this->departure_date_flexible = $departure_date_flexible;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getSeatCount(): ?string
    {
        return $this->seat_count;
    }

    public function setSeatCount(string $seat_count): self
    {
        $this->seat_count = $seat_count;

        return $this;
    }

    public function getLuggage(): ?int
    {
        return $this->luggage;
    }

    public function setLuggage(int $luggage): self
    {
        $this->luggage = $luggage;

        return $this;
    }

    public function getCarType(): ?string
    {
        return $this->car_type;
    }

    public function setCarType(?string $car_type): self
    {
        $this->car_type = $car_type;

        return $this;
    }

    public function getCarColor(): ?string
    {
        return $this->car_color;
    }

    public function setCarColor(?string $car_color): self
    {
        $this->car_color = $car_color;

        return $this;
    }

    public function getAnimalAllowed(): ?int
    {
        return $this->animal_allowed;
    }

    public function setAnimalAllowed(?int $animal_allowed): self
    {
        $this->animal_allowed = $animal_allowed;

        return $this;
    }

    public function getSmokingAllowed(): ?bool
    {
        return $this->smoking_allowed;
    }

    public function setSmokingAllowed(?bool $smoking_allowed): self
    {
        $this->smoking_allowed = $smoking_allowed;

        return $this;
    }

    public function getOfferClosed(): ?bool
    {
        return $this->offer_closed;
    }

    public function setOfferClosed(?bool $offer_closed): self
    {
        $this->offer_closed = $offer_closed;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(?\DateTimeInterface $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }
}
