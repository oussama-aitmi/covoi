<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191230182308 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE offer (id INT AUTO_INCREMENT NOT NULL, departure_city VARCHAR(255) NOT NULL, arrival_city VARCHAR(255) NOT NULL, departure_spot VARCHAR(255) DEFAULT NULL, arrival_spot VARCHAR(255) DEFAULT NULL, departure_date DATETIME NOT NULL, departure_date_flexible TINYINT(1) DEFAULT NULL, price VARCHAR(6) DEFAULT NULL, seat_count VARCHAR(2) NOT NULL, luggage SMALLINT NOT NULL, car_type VARCHAR(20) DEFAULT NULL, car_color VARCHAR(20) DEFAULT NULL, animal_allowed SMALLINT DEFAULT NULL, smoking_allowed TINYINT(1) DEFAULT NULL, offer_closed TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE offer');
    }
}
