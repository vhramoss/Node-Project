import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToTasks1754666248257 implements MigrationInterface {
    name = 'AddUserIdToTasks1754666248257';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Passo 1: Adiciona a coluna user_id como nula
        await queryRunner.query(`ALTER TABLE "tasks" ADD "user_id" integer`);

        // Passo 2: Preenche os valores nulos com um ID de usuário existente
        await queryRunner.query(`UPDATE "tasks" SET "user_id" = 3 WHERE "user_id" IS NULL`);

        // Passo 3: Altera a coluna para não permitir mais valores nulos
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "user_id" SET NOT NULL`);

        // Passo 4: Adiciona a chave estrangeira
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_a0c3260c0d1c81a2f64d4b1a45a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_a0c3260c0d1c81a2f64d4b1a45a"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "user_id"`);
    }

}