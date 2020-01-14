<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixture extends BaseFixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(10, 'main_users', function($i) use ($manager) {
            $user = new User();
            $user->setEmail(sprintf('convoi%d@nssafro.com', $i));
            $user->setFirstName($this->faker->firstName);
            $user->setLastName($this->faker->lastName);
            $user->setDescription($this->faker->text(120));

            //$user->agreeToTerms();

//            if ($this->faker->boolean) {
//                $user->setTwitterUsername($this->faker->userName);
//            }

            $user->setPassword($this->passwordEncoder->encodePassword(
                $user,
                'convoi'
            ));

//            $apiToken1 = new ApiToken($user);
//            $apiToken2 = new ApiToken($user);
//            $manager->persist($apiToken1);
//            $manager->persist($apiToken2);

            return $user;
        });

//        $this->createMany(3, 'admin_users', function($i) {
//            $user = new User();
//            $user->setEmail(sprintf('admin%d@thespacebar.com', $i));
//            $user->setFirstName($this->faker->firstName);
//            $user->setRoles(['ROLE_ADMIN']);
//            $user->agreeToTerms();
//
//            $user->setPassword($this->passwordEncoder->encodePassword(
//                $user,
//                'engage'
//            ));
//
//            return $user;
//        });
//
        $manager->flush();
    }
}
