import { FC, lazy, useMemo } from 'react'
import { GraphData } from './utils/composeGraphData'

import { color, statusColor } from '@/data/variables.style'
import { css } from '@emotion/react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, DatasetComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, GridComponent, ScatterChart, CanvasRenderer])

export interface ResultGraphProps {
  graphData: GraphData
}

export const ResultGraph: FC<ResultGraphProps> = ({ graphData }) => {
  const { labels, success, fail } = graphData

  const options = {
    darkMode: true,
    grid: { left: '5%', right: '5%' },
    xAxis: {
      type: 'value',
      data: labels,
      axisLabel: {
        formatter: '{value}s',
      },
      axisLine: {
        lineStyle: {
          color: color.secondaryText,
        },
      },
      splitLine: {
        show: false,
      },
      name: '시간',
      nameLocation: 'end',
      nameTextStyle: {
        // fontWeight: 'bold',
        fontSize: 16,
        color: color.primaryText,
      },
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: '{value}ms',
      },
      axisLine: {
        lineStyle: {
          color: color.secondaryText,
        },
      },
      splitLine: {
        show: false,
      },
      name: '응답 시간',
      nameLocation: 'end',
      nameTextStyle: {
        // fontWeight: 'bold',
        fontSize: 16,
        color: color.primaryText,
      },
    },
    series: [
      {
        data: success,
        type: 'scatter',
        smooth: true,
        color: statusColor.GOOD,
      },
      {
        data: fail,
        type: 'scatter',
        smooth: true,
        color: statusColor.FAIL,
      },
    ],

    tooltip: {
      trigger: 'item',
    },
  }
  return (
    <div css={wrapperCss}>
      <ReactEChartsCore
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{}}
      />
    </div>
  )
}

const wrapperCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // padding: 0 50px;
`
