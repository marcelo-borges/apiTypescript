import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateEmployees1617916360297 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'sex',
            type: 'enum',
            enum: ['male', 'female'],
            isNullable: false,
          },
          {
            name: 'identity_document',
            type: 'varchar',
            isNullable: true,
            comment: 'RG'
          },
          {
            name: 'registration_individuals',
            type: 'varchar',
            isNullable: true,
            comment: 'CPF'
          },
          {
            name: 'postal_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            comment: 'bairro',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            comment: 'cidade',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cell_phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'office',
            type: 'varchar',
            isNullable: true,
            comment: 'Cargo do Funcionário'
          },
          {
            name: 'admission_date',
            type: 'timestamp',
            comment: 'Data admissão',
            isNullable: false,
          },
          {
            name: 'resignation_date',
            type: 'timestamp',
            isNullable: true,
            comment: 'Data Demissão'
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }

}
