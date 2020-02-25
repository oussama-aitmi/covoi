<?php

namespace App\Controller;


use App\Repository\OfferRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(OfferRepository $offerRepository)
    {
        $offers =$offerRepository->getLatestOffer(6);

        //dd($offerRepository);

        return $this->render('homepage.html.twig', [
            'controller_name' => 'HomeController',
            'offers' =>$offers,
        ]);
    }

    /**
     * @Route("/teste", name="test")
     */
    public function getLastOffer( OfferRepository $offerRepository)
    {
        $offers =$offerRepository->getLatestOffer(6);

        //dd($offerRepository);

        return $this->render('homepage.html.twig', [
            'controller_name' => 'HomeController',
            'offers' =>$offers,
        ]);

    }
}
