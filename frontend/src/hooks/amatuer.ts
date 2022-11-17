import { useMemo } from 'react';
import { useQuery, useQueryClient, useQueries } from '@tanstack/react-query';
import {
  getAmatuerResult,
  amatuerSales,
  amatuerLife,
  amatuerResident,
  amatuerJob,
  amatuerCount,
} from '../api/amatuer';
import {
  AmatuerResultParams,
  AmatuerSimulationParams,
} from '../models/amatuer';

export const useAmatuerResult = (params: AmatuerResultParams) =>
  useQuery({
    queryKey: ['amatuer', 'result', params.admCd, params.jobCode],
    queryFn: () => getAmatuerResult(params),
  });

export const usePrefetchAmatuerResult = async (params: AmatuerResultParams) => {
  const queryClient = useQueryClient();
  const data = await queryClient.prefetchQuery({
    queryKey: ['amatuer', 'result', params.admCd, params.jobCode],
    queryFn: () => getAmatuerResult(params),
  });

  return data;
};

export const useAmatuerSimulation = (params: AmatuerSimulationParams) => {
  const { dongName, industryName } = params;
  const response = useQueries({
    queries: [
      {
        queryKey: ['amatuer', 'sales', dongName, industryName],
        queryFn: () => amatuerSales(params),
      },
      {
        queryKey: ['amatuer', 'life', dongName, industryName],
        queryFn: () => amatuerLife(params),
      },
      {
        queryKey: ['amatuer', 'resident', dongName, industryName],
        queryFn: () => amatuerResident(params),
      },
      {
        queryKey: ['amatuer', 'job', dongName, industryName],
        queryFn: () => amatuerJob(params),
      },
      {
        queryKey: ['amatuer', 'count', dongName, industryName],
        queryFn: () => amatuerCount(params),
      },
    ],
  });
  console.log('res', response);
  const data = useMemo(
    () => ({
      sales: response[0].data,
      life: response[1].data,
      resident: response[2].data,
      job: response[3].data,
      count: response[4].data,
    }),
    [response]
  );
  const isSuccess = useMemo(
    () => response.every((e) => e.isSuccess),
    [response]
  );
  const isLoading = useMemo(
    () => response.some((e) => e.isLoading),
    [response]
  );
  const isError = useMemo(() => response.some((e) => e.isError), [response]);

  return { data, isSuccess, isLoading, isError };
};

// 이미사장 데이터
export const timeLabels = [
  '0~6시',
  '6~11시',
  '11~14시',
  '14~17시',
  '17~21시',
  '21~24시',
];
export const weekLabels = ['월', '화', '수', '목', '금', '토', '일'];
const genderLabels = ['남', '여'];
const ageLabels = ['10대', '20대', '30대', '40대', '50대', '60대'];
const yearLabels = [2017, 2018, 2019, 2020, 2021];
const storeCntLabels = [
  '2020년 1분기',
  '2020년 2분기',
  '2020년 3분기',
  '2020년 4분기',
  '2021년 1분기',
  '2021년 2분기',
  '2021년 3분기',
  '2021년 4분기',
];

const simulLabels = [
  '2022년 4분기',
  '2023년 1분기',
  '2023년 2분기',
  '2023년 3분기',
  '2023년 4분기',
];

export const genderGrad = [
  [
    [0, '#B6ACF1'],
    [1, '#27CFFB'],
  ],
  [
    [0, '#F3B79B'],
    [1, '#F872D4'],
  ],
];

const weekGrad = [
  [
    [0, '#23CFFA'],
    [0.25, '#A9B6F6'],
    [0.5, '#C2A0EB'],
    [0.75, '#D98CE1'],
    [1, '#FC6DD1'],
  ],
];

const timeGrad = [
  [
    [0, '#B29AF860'],
    [1, '#B29AF8d9'],
  ],
];

/* 업종 분석 */
export const useStoreData = (amatuerResult: any) => {
  // 해당 동 점포 수 (2021.4분기, 2020.4분기)
  const storeCntData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['2020년', '2021년'],
        datasets: [
          {
            label: '해당 업종 점포 수',
            data: [amatuerResult.store.yearAgo, amatuerResult.store.total],
            barThickness: 70,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BECc1'],
          [1, '#545BF9c1'],
        ],
        [
          [0, '#A82BEC'],
          [1, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // 해당 동 업종별 고객 성비(2021.4분기)
  const storeGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels,
        datasets: [
          {
            label: '매출',
            barThickness: 70,
            data: amatuerResult.store.gender,
            datalabels: {
              // 데이터라벨 숨김
              color: 'white',
            },
          },
        ],
      },
      // grad: [[[0, '#78BFE9']], [[0, '#ED7996']]],
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  // 해당동 업종 대분류별 고객 연령대 비율(2021.4분기)
  const storeAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '유동 인구',
            data: amatuerResult.store.age,
            barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#714BF4'],
          [1, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  return { storeCntData, storeGenderData, storeAgeData };
};

/* 매출 분석 - 2021년 연평균 (단위 : 분기) */
export const useSalesData = (amatuerResult: any) => {
  // 5년 총 매출 추이
  const salesTotalData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: '총 매출(단위: 원)',
            data: amatuerResult.sales.total,
            borderColor: '#A82BEC',
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          // [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // 매출 Top3 상권
  const salesAreaTop3Data = useMemo(
    () => amatuerResult.sales.top3,
    [amatuerResult]
  );

  // 일별 매출
  const salesWeekData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: '요일별 매출',
            data: amatuerResult.sales.week,
            barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerResult]
  );

  // 시간대별 매출
  const salesTimeData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: '시간대별 매출',
            data: amatuerResult.sales.time,
            borderColor: '#B29AF8',
            backgroundColor: '#B29AF8',
            borderWidth: 2,
            fill: true,
            datalabels: {
              color: 'transparent',
            },
            tension: 0.5,
          },
        ],
      },
      grad: timeGrad,
    }),
    [amatuerResult]
  );

  // 연령별 매출
  const salesAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '연령대별 매출',
            data: amatuerResult.sales.age,
            barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // 성별 매출
  const salesGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels,
        datasets: [
          {
            label: '매출',
            barThickness: 70,
            data: amatuerResult.sales.gender,
            datalabels: {
              // 데이터라벨 숨김
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  return {
    salesTotalData,
    salesAreaTop3Data,
    salesWeekData,
    salesTimeData,
    salesAgeData,
    salesGenderData,
  };
};

/* 유동 인구 */
export const useLivingData = (amatuerResult: any) => {
  // 동 기준 5년 총 유동인구 추이
  const livingTotalData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: '총 유동인구 추이',
            data: amatuerResult.living.total,
            borderColor: '#A82BEC',
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [[[0, '#A82BEC']]],
    }),
    [amatuerResult]
  );

  // 동 기준 유동인구 top3 상권
  const livingAreaTop3Data = useMemo(
    () => amatuerResult.living.top3,
    [amatuerResult]
  );

  // 동 기준 일별 유동인구
  const livingWeekData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: '요일별 유동인구',
            data: amatuerResult.living.week,
            barThickness: 40,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerResult]
  );

  // 동 기준 시간대별 유동인구
  const livingTimeData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: '시간대별 유동인구',
            data: amatuerResult.living.time,
            borderColor: '#B29AF8',
            backgroundColor: '#B29AF8',
            borderWidth: 2,
            fill: true,
            datalabels: {
              color: 'transparent',
            },
            tension: 0.5,
          },
        ],
      },
      grad: timeGrad,
    }),
    [amatuerResult]
  );

  // 동 기준 연령대별 유동인구
  const livingAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '연령대별 매출',
            data: amatuerResult.living.age,
            barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // 동 기준 성별 유동인구
  const livingGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels,
        datasets: [
          {
            label: '매출',
            barThickness: 70,
            data: amatuerResult.living.gender,
            datalabels: {
              // 데이터라벨 숨김
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  return {
    livingTotalData,
    livingAreaTop3Data,
    livingWeekData,
    livingTimeData,
    livingAgeData,
    livingGenderData,
  };
};

/* 점포 수 */
export const useStoreCntData = (amatuerResult: any) => {
  const storeCntOpenData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '개업 현황',
            data: amatuerResult.open.open,
            barThickness: 40,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#B6ACF1'],
          [1, '#27CFFB'],
        ],
      ],
      options: {
        legend: {
          display: false,
        },
      },
    }),
    [amatuerResult]
  );

  const storeCntOpenRateData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '개업률(단위: %)',
            data: amatuerResult.open.rate,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
            backgroundColor: '#27CFFB',
            borderColor: '#27CFFB',
          },
        ],
      },
    }),
    [amatuerResult]
  );

  const storeCntCloseData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '폐업 현황',
            data: amatuerResult.close.close,
            barThickness: 40,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#ECA6DD'],
          [1, '#FE5D84'],
        ],
      ],
    }),
    [amatuerResult]
  );

  const storeCntCloseRateData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '폐업률(단위: %)',
            barThickness: 70,
            data: amatuerResult.close.rate,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
            backgroundColor: '#FE5D84',
            borderColor: '#FE5D84',
          },
        ],
      },
    }),
    [amatuerResult]
  );

  return {
    storeCntOpenData,
    storeCntCloseData,
    storeCntOpenRateData,
    storeCntCloseRateData,
  };
};

/* 상권 배후지 */
export const useHinterlandData = (amatuerResult: any) => {
  const hinterlandPeopleData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['유동 인구', '직장 인구', '거주 인구'],
        datasets: [
          {
            label: '상권 배후지 인구',
            data: [
              amatuerResult.hinterland.living,
              amatuerResult.hinterland.work,
              amatuerResult.hinterland.resident,
            ],
            barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  const hinterlandAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '연령대별 매출',
            data: amatuerResult.hinterland.age,
            barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  const hinterlandGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels,
        datasets: [
          {
            label: '매출',
            barThickness: 70,
            data: amatuerResult.hinterland.gender,
            datalabels: {
              // 데이터라벨 숨김
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  return { hinterlandPeopleData, hinterlandAgeData, hinterlandGenderData };
};

export const useRiskData = (amatuerResult: any) => {
  const riskData = useMemo(
    () => ({ risk: amatuerResult.risk, riskRate: amatuerResult.riskRate }),
    [amatuerResult]
  );

  return { riskData };
};

// 시뮬레이션 데이터
export const useAmatuerSimulationData = (amatuerSimulation: any) => {
  const amaSimulSalesData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: 'sales',
            data: amatuerSimulation.sales.map((e: any) => e.value),
            // barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerSimulation]
  );
  const amaSimulLifeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: 'life',
            data: amatuerSimulation.life.map((e: any) => e.value),
            // barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerSimulation]
  );
  const amaSimulResidentData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: 'resident',
            data: amatuerSimulation.resident.map((e: any) => e.value),
            // barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerSimulation]
  );
  const amaSimulJobData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: 'job',
            data: amatuerSimulation.job.map((e: any) => e.value),
            // barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerSimulation]
  );
  const amaSimulCountData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: 'count',
            data: amatuerSimulation.count.map((e: any) => e.value),
            // barThickness: 30,
            datalabels: {
              // 데이터라벨 숨김
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerSimulation]
  );

  return {
    amaSimulSalesData,
    amaSimulLifeData,
    amaSimulResidentData,
    amaSimulJobData,
    amaSimulCountData,
  };
};