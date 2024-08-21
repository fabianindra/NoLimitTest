import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class EmployeeService {
  private readonly index = 'companydatabase';

  constructor(private readonly esService: ElasticsearchService) {}

  async countEmployees() {
    const result = await this.esService.count({ index: this.index });
    return result.count;
  }

  async averageSalary() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          avg_salary: {
            avg: { field: 'Salary' },
          },
        },
      },
    });

    const avgSalary = result.aggregations?.avg_salary as { value: number };
    return avgSalary.value;
  }

  async salaryRange() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          min_salary: { min: { field: 'Salary' } },
          max_salary: { max: { field: 'Salary' } },
        },
      },
    });
    const minSalary = result.aggregations?.min_salary as { value: number };
    const maxSalary = result.aggregations?.max_salary as { value: number };
    return {
      min: minSalary.value,
      max: maxSalary.value,
    };
  }

  async ageDistribution() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          age_distribution: {
            histogram: {
              field: 'Age',
              interval: 10,
            },
          },
        },
      },
    });

    const ageDistribution = result.aggregations?.age_distribution as {
      value: number;
    };
    return ageDistribution.value;
  }

  async genderDistribution() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          gender_distribution: {
            terms: { field: 'Gender.keyword' },
          },
        },
      },
    });
    const genderDistribution = result.aggregations?.gender_distribution as {
      value: number;
    };
    return genderDistribution.value;
  }

  async maritalStatusDistribution() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          marital_status_distribution: {
            terms: { field: 'MaritalStatus.keyword' },
          },
        },
      },
    });
    const maritalStatusDistribution = result.aggregations
      ?.marital_status_distribution as { value: number };
    return maritalStatusDistribution.value;
  }

  async dateOfJoiningHistogram() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          joining_date_histogram: {
            date_histogram: {
              field: 'DateOfJoining',
              calendar_interval: 'year',
            },
          },
        },
      },
    });

    const buckets = (
      result.aggregations?.joining_date_histogram as { buckets: any[] }
    ).buckets;
    return buckets;
  }

  async topInterests() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          top_interests: {
            terms: { field: 'Interests.keyword' },
          },
        },
      },
    });
    const buckets = (result.aggregations?.top_interests as { buckets: any[] })
      .buckets;
    return buckets;
  }

  async designationDistribution() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          designation_distribution: {
            terms: { field: 'Designation.keyword' },
          },
        },
      },
    });
    const buckets = (
      result.aggregations?.designation_distribution as { buckets: any[] }
    ).buckets;
    return buckets;
  }
}
