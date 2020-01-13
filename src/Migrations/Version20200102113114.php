<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200102113114 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE offer ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, CHANGE slug slug VARCHAR(155) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_29D6873E989D9B62 ON offer (slug)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP INDEX UNIQ_29D6873E989D9B62 ON offer');
        $this->addSql('ALTER TABLE offer DROP created_at, DROP updated_at, CHANGE slug slug LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
