<?php


namespace App\Controller;


use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;


class ArticleController extends AbstractController
{

//    private $isDebug;
//
//    public function __construct(bool $isDebug)
//    {
//
//        $this->isDebug = $isDebug;
//    }

    /**
     * @Route("/", name="home-page", methods={"GET"})
     */
    public function homepage()
    {
        return $this->render('homepage.html.twig');
        //return new Response("Bismi Allah");

    }

    /**
     * @Route("/new-page/{slug}", name="new-page")
     */
    public function newPage($slug, MarkdownParserInterface $markdownParser)
    {
        $comments = [
            'Un plan d’action national pour lutter contre l’exploitation des enfants à des fins de mendicité vient d’être lancé à Rabat en vue d’être déployé dans toutes les régions. Il vise à 
            lutter contre un phénomène qui prend de plus en plus d’ampleur dans certaines villes, comme Rabat et Casablanca.',
            'Une fois ces étapes franchies, l’enfant sera réinséré dans sa famille et bénéficiera d’un accompagnement à travers des programmes de soutien social disponibles'

        ];

        $articleContent = <<<EOF
            ## H2
            'Un plan d’action with **asterisks** or __underscores__. pour lutter contre l’exploitation des enfants à des fins de mendicité vient d’être lancé à Rabat en vue d’être déployé dans toutes les régions. Il vise à 
            lutter contre un phénomène qui prend de plus en plus d’ampleur dans certaines villes, comme Rabat et Casablanca.',
            'Une fois ces étapes franchies, l’enfant sera réinséré dans sa famille et bénéficiera d’un accompagnement à travers des programmes de soutien social disponibles'
EOF;


        $articleContent = $markdownParser->transformMarkdown($articleContent);
        return $this->render('article/show.html.twig', [
                'title' => ucwords(str_replace('-', ' ', $slug)),
                'articleContent' =>  $articleContent,
                'comments'=>$comments,
            ]);
    }

    /**
     * @Route("/news", name="news", methods={"POST"})
     */
    public function returnNewsJson()
    {
        //$logger->log('ARticle is being hearted');
        //return new JsonResponse(['hearts' => rand(5, 100)];
    }

}