<?php

namespace App\Controller;

use App\Entity\Channel; // ustaw na prawidłową ścieżkę do Twojej encji Channel
use App\Repository\ChannelRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChannelController extends AbstractController
{
    private $entityManager;
    private $channelRepository;

    public function __construct(EntityManagerInterface $entityManager, ChannelRepository $channelRepository)
    {
        $this->entityManager = $entityManager;
        $this->channelRepository = $channelRepository;
    }

    /**
     * @Route("/api/channels", name="channel_list", methods={"GET"})
     */
    public function index(): Response
    {
        $channels = $this->channelRepository->findAll();
        return $this->json($channels);
    }

    /**
     * @Route("/api/channels", name="channel_create", methods={"POST"})
     */
    public function store(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $channel = new Channel();
        $channel->setName($data['name']); 
        $channel->setClientCount($data['client_count']);
        $this->entityManager->persist($channel);
        $this->entityManager->flush();

        return $this->json($channel, Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/channels/{id}", name="channel_show", methods={"GET"})
     */
    public function show(Channel $channel): Response
    {
        return $this->json($channel);
    }

    /**
     * @Route("/api/channels/{id}", name="channel_update", methods={"PUT"})
     */
    public function update(Request $request, Channel $channel): Response
    {
        $data = json_decode($request->getContent(), true);
    
        $channel->setName($data['name']); 
        $channel->setClientCount($data['client_count']);
        $this->entityManager->flush();

        return $this->json($channel, Response::HTTP_OK);
    }

    /**
     * @Route("/api/channels/{id}", name="channel_delete", methods={"DELETE"})
     */
    public function destroy(Channel $channel): Response
    {
        $this->entityManager->remove($channel);
        $this->entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
