import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateAppointments1618358731567 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
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
            name: 'id_serviceprice',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'hour',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'decimal',
            comment: 'Valor referencia da tabela de serviço',
            precision: 16,
            scale: 4
          },
          {
            name: 'amount_charged',
            type: 'decimal',
            comment: 'Valor pago pelo cliente',
            precision: 16,
            scale: 4
          },
          {
            name: 'service_done',
            type: 'boolean',
            comment: 'Serviço feito?',
            default: false,
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
      'appointments',
      new TableForeignKey({
        name: 'Fkappointments_company',
        columnNames: ['id_company'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'Fkappointments_employees',
        columnNames: ['id_employee'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'Fkappointments_service_price',
        columnNames: ['id_serviceprice'],
        referencedColumnNames: ['id'],
        referencedTableName: 'service_price',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'Fkappointments_users',
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'Fkappointments_company');
    await queryRunner.dropForeignKey('appointments', 'Fkappointments_employees');
    await queryRunner.dropForeignKey('appointments', 'Fkappointments_service_price');
    await queryRunner.dropForeignKey('appointments', 'Fkappointments_users');
    await queryRunner.dropTable('appointments');
  }

}
