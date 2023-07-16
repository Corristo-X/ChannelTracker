<?php

namespace App\Entity;
use App\Repository\ChannelRepository;
use Doctrine\ORM\Mapping as ORM;
#[\ApiPlatform\Metadata\ApiResource()]
#[ORM\Entity(repositoryClass: ChannelRepository::class)]
class Channel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $clientCount = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getClientCount(): ?int
    {
        return $this->clientCount;
    }
    public function setClientCount(?int $clientCount): static
    {
        $this->clientCount = $clientCount;

        return $this;
    }
}
