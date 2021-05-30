import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export default class CreateFKCompanyEmployee1618147997118 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_employee',
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
            name: 'id_employee',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'company_employee',
      new TableForeignKey({
        name: 'Fkcompany',
        columnNames: ['id_company'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'company_employee',
      new TableForeignKey({
        name: 'Fkemployee',
        columnNames: ['id_employee'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('company_employee', 'Fkcompany');
    await queryRunner.dropForeignKey('company_employee', 'Fkemployee');

    await queryRunner.dropTable('company_employee');
  }

}
