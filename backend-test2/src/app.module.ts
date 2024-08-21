import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
    EmployeeModule,
  ],
})
export class AppModule {}
