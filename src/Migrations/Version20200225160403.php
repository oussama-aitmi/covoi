<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200225160403 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE offer (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, departure_city VARCHAR(255) NOT NULL, arrival_city VARCHAR(255) NOT NULL, departure_spot VARCHAR(255) DEFAULT NULL, arrival_spot VARCHAR(255) DEFAULT NULL, departure_date DATETIME NOT NULL, departure_date_flexible TINYINT(1) DEFAULT NULL, price VARCHAR(6) DEFAULT NULL, seat_count SMALLINT NOT NULL, luggage SMALLINT NOT NULL, car_type VARCHAR(20) DEFAULT NULL, car_color VARCHAR(20) DEFAULT NULL, animal_allowed SMALLINT DEFAULT NULL, smoking_allowed TINYINT(1) DEFAULT NULL, offer_closed TINYINT(1) DEFAULT NULL, slug VARCHAR(155) NOT NULL, published_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_29D6873E989D9B62 (slug), INDEX IDX_29D6873EA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873EA76ED395');
        $this->addSql('DROP TABLE offer');
        $this->addSql('DROP TABLE user');
    }
}
