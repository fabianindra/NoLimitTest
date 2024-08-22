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

    const ageDistribution = (
      result.aggregations?.age_distribution as {
        buckets: { key: number; doc_count: number }[];
      }
    ).buckets;
    return ageDistribution;
  }

  async genderDistribution() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          gender_distribution: {
            terms: { field: 'Gender' },
          },
        },
      },
    });

    const genderDistribution = (
      result.aggregations?.gender_distribution as {
        buckets: { key: string; doc_count: number }[];
      }
    ).buckets;
    return genderDistribution;
  }

  async maritalStatusDistribution() {
    const result = await this.esService.search({
      index: this.index,
      body: {
        aggs: {
          marital_status_distribution: {
            terms: { field: 'MaritalStatus' },
          },
        },
      },
    });

    const maritalStatusDistribution = (
      result.aggregations?.marital_status_distribution as {
        buckets: { key: string; doc_count: number }[];
      }
    ).buckets;
    return maritalStatusDistribution;
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
            terms: { field: 'Interests' },
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
            terms: { field: 'Designation' },
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
