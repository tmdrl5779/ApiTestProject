import { Table } from '@/components'
import { getObjectKeys } from '@/utils/ObjectHandler'
import { css } from '@emotion/react'
import { FC } from 'react'
import { ISummaryReport } from './utils/composeSummaryReport'

interface SummaryReportProps {
  summaryReport: ISummaryReport
}

export const SummaryReport: FC<SummaryReportProps> = ({ summaryReport }) => {
  const data = getObjectKeys(summaryReport).map(label => {
    const { total, avgResponseTime, minResponseTime, maxResponseTime, failRate } = summaryReport[label]
    return [label, total, avgResponseTime.toFixed(2), minResponseTime, maxResponseTime, failRate.toFixed(2)]
  })
  return (
    <div css={tableWrapperCss}>
      <Table
        columns={['라벨', '표본 수', '평균 응답시간(ms)', '최소 응답시간(ms)', '최대 응답시간(ms)', '오류 %']}
        data={data}
      />
    </div>
  )
}

const tableWrapperCss = css`
  width: 100%;
`
