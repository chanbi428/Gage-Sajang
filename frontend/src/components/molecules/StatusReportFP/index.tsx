import React from 'react';
import styled from 'styled-components';
import StatusReportChart from '../../molecules/StatusReportChart';
import StatusReportTitle from '../../molecules/StatusReportTitle';
import { useStatusFpData } from '../../../hooks/status';
import { numberComma, getMax } from '../../../utils/common';
import ReportContent from '../AmatuerReportContent';
import ReportComment from '../../atoms/ReportComment';

interface StatusReportFPProps {
  title?: any;
  fpDetail?: any;
  region?: string;
}

const StatusReportFP = ({ title, fpDetail, region }: StatusReportFPProps) => {
  const { fpGenderData, fpAgeData, fpQuaterData, fpWeekData, fpTimeData } =
    useStatusFpData(fpDetail);

  return (
    <Wrapper>
      <StatusReportTitle
        // 상세 페이지 내용 //
        title={title}
      >
        <div className="summary-div">
          하루 평균 유동인구 수는{' '}
          <span>{numberComma(Math.floor(fpDetail.total / 90))}명</span>
          입니다.
        </div>
        <div className="summary-div">
          성별은 <span>{getMax(fpDetail.gender, 'gender')}</span>의 비율이 더
          높으며, 주 연령대는 <span>{getMax(fpDetail.age, 'age')}</span>입니다.
        </div>
        <div className="summary-div">
          분기는 <span>{getMax(fpDetail.quarter, 'quarter')}</span>, 요일은{' '}
          <span>{getMax(fpDetail.week, 'week')}</span>, 시간대는{' '}
          <span>{getMax(fpDetail.time, 'time')}</span>에 유동인구가 가장
          많습니다.
        </div>
      </StatusReportTitle>

      <div className="report-div">
        <ReportContent
          title="분기별 일일 평균 유동인구"
          chartData={fpQuaterData}
          isVert={false}
          style={{ width: '600px' }}
          chartStyle={{ width: '600px' }}
        >
          {' '}
          <ReportComment>
            <span className="dongName">{region}</span>의 유동인구는{' '}
            <span className="emphasis">
              {getMax(fpQuaterData.data.datasets[0].data, 'quarter')}
            </span>
            가 가장 많습니다.
          </ReportComment>
        </ReportContent>
        <ReportContent style={{ flexGrow: 1 }}></ReportContent>
      </div>

      {/* 분기별 유동인구 */}

      <div className="report-div">
        {/* 성별별 유동인구 */}
        <ReportContent
          title="유동인구 평균 성별 비(분기 기준)"
          chartData={fpGenderData}
          style={{ flexGrow: 1 }}
        >
          {' '}
          <ReportComment>
            <span className="dongName">{region}</span>의 유동인구는{' '}
            <span className="emphasis">
              {getMax(fpGenderData.data.datasets[0].data, 'gender')}
            </span>
            이 더 많습니다.
          </ReportComment>
        </ReportContent>
        {/* 연령대별 유동인구 */}
        <ReportContent
          title="연령별 평균 유동인구(분기 기준)"
          chartData={fpAgeData}
          style={{ flexGrow: 1 }}
        >
          {' '}
          <ReportComment>
            <span className="dongName">{region}</span>의 유동인구는{' '}
            <span className="emphasis">emphasis</span>이 더 많습니다.
          </ReportComment>
        </ReportContent>
      </div>
      <div className="report-div">
        {/* 요일별 유동인구 */}
        <ReportContent
          title="요일별 평균 유동인구(분기 기준)"
          chartData={fpWeekData}
          style={{ flexGrow: 1 }}
        >
          {' '}
          <ReportComment>
            <span className="dongName">{region}</span>의 유동인구는{' '}
            <span className="emphasis">emphasis</span>이 더 많습니다.
          </ReportComment>
        </ReportContent>

        {/* 시간대별 유동인구 */}
        <ReportContent
          title="시간대별 평균 유동인구(분기 기준)"
          chartData={fpTimeData}
          style={{ flexGrow: 1 }}
        >
          {' '}
          <ReportComment>
            <span className="dongName">{region}</span>의 유동인구는{' '}
            <span className="emphasis">emphasis</span>이 더 많습니다.
          </ReportComment>
        </ReportContent>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & .report-div {
    display: flex;
    gap: 1rem;
  }
`;

export default StatusReportFP;