import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterEmployee1618354218313 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.addColumn(
      'employees',
      new TableColumn({
        name: 'interval',
        type: 'integer',
        isNullable: false,
        default: 0
      }),
    );

    await queryRunner.addColumn(
      'employees',
      new TableColumn({
        name: 'start_time',
        type: 'varchar',
        isNullable: false,
        default: "'00:00'"
      }),
    );

    await queryRunner.addColumn(
      'employees',
      new TableColumn({
        name: 'end_time',
        type: 'varchar',
        isNullable: false,
        default: "'00:00'"
      }),
    );

    await queryRunner.addColumn(
      'employees',
      new TableColumn({
        name: 'break_start',
        type: 'varchar',
        isNullable: false,
        default: "'00:00'"
      }),
    );

    await queryRunner.addColumn(
      'employees',
      new TableColumn({
        name: 'break_end',
        type: 'varchar',
        isNullable: false,
        default: "'00:00'"
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('employees', 'interval');
    await queryRunner.dropColumn('employees', 'start_time');
    await queryRunner.dropColumn('employees', 'end_time');
    await queryRunner.dropColumn('employees', 'break_start');
    await queryRunner.dropColumn('employees', 'break_end');
  }

}
