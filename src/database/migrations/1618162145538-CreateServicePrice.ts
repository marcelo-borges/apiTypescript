import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateServicePrice1618162145538 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_price',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_company',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 16,
            scale: 4
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'service_price',
      new TableForeignKey({
        name: 'Fkservice_price',
        columnNames: ['id_company'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('service_price', 'Fkservice_price');
    await queryRunner.dropTable('service_price');
  }

}
