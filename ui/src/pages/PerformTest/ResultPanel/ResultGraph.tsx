import { FC, lazy, useMemo } from 'react'
import { GraphData } from './utils/composeGraphData'

import { color, statusColor } from '@/data/variables.style'
import { css } from '@emotion/react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { Modal, useModal } from '@/components'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ScatterChart,
  CanvasRenderer,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
])

export interface ResultGraphProps {
  graphData: GraphData
}

export const ResultGraph: FC<ResultGraphProps> = ({ graphData }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const { labels, success, fail } = graphData

  const onEvents = useMemo(
    () => ({
      click: (params: { dataIndex: number; seriesId: string }) => {
        console.log(params.dataIndex, params.seriesId)
        openModal()
      },
    }),
    []
  )

  const options = {
    darkMode: true,
    grid: { left: '5%', right: '5%' },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '96%',
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 1,
        end: 35,
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        start: 29,
        end: 36,
      },
    ],
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
        lineStyle: {
          color: color.graphLine,
        },
      },
      // name: '시간',
      // nameLocation: 'end',
      // nameTextStyle: {
      //   // fontWeight: 'bold',
      //   fontSize: 12,
      //   color: color.primaryText,
      // },
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
        show: true,
        lineStyle: {
          color: color.graphLine,
        },
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
        id: 'success',
        data: success,
        type: 'scatter',
        smooth: true,
        color: statusColor.GOOD,
      },
      {
        id: 'fail',
        data: fail,
        type: 'scatter',
        smooth: true,
        color: statusColor.FAIL,
      },
    ],
    valueFormatter: (value: string) => `응답속도 ${value}ms`,
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
        onEvents={onEvents}
      />
      {/* <Modal /> */}
    </div>
  )
}

const wrapperCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 50px;
`
