import { FC, lazy, useEffect, useMemo, useRef, useState } from 'react'
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
import { Blinker, Modal, Tabs, useModal } from '@/components'
import { APITestResponse } from './types'
import { APIResponseViewer } from '@/features/API'
import { ResponseListViewer } from './ResponseListViewer'

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
  const { modalInfo, openModal, closeModal } = useModal()
  const { labels, success, fail, detail } = graphData
  // 차트 재렌더 막기
  const detailRef = useRef<{ success: APITestResponse[]; fail: APITestResponse[] }>({ success: [], fail: [] })

  useEffect(() => {
    detailRef.current = detail
  }, [detail])
  //

  const onEvents = useMemo(
    () => ({
      click: (params: { dataIndex: number; seriesId: 'success' | 'fail' }) => {
        const { dataIndex: idx, seriesId: id } = params
        console.log(idx, id)
        const selectedTestResponse = detailRef.current[id][idx]
        console.log(selectedTestResponse)
        openModal(
          () => <ResponseListViewer list={selectedTestResponse.responseList} />,
          () => <span>테스트 결과 상세</span>
        )
      },
    }),
    [openModal]
    // [failDetail, successDetail]
  )

  const options = useMemo(
    () => ({
      ...graphStaticOptions,

      xAxis: {
        type: 'value',
        data: labels,
        axisLabel: {
          formatter: '{value}s',
        },
        ...graphAxisConfig,
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value}ms',
        },
        ...graphAxisConfig,
        name: '응답 시간',
        nameLocation: 'end',
        nameTextStyle: {
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
    }),
    [fail, labels, success]
  )
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

      <Modal isOpen={modalInfo.open} content={modalInfo.content} footer={modalInfo.footer} close={closeModal}></Modal>
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

const graphStaticOptions = {
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
    },
    {
      type: 'inside',
      yAxisIndex: [0],
    },
  ],
  valueFormatter: (value: string) => `응답속도 ${value}ms`,
  tooltip: {
    trigger: 'item',
  },
}

const graphAxisConfig = {
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
}
