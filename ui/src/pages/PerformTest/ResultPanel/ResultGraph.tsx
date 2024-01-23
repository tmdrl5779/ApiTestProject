import { FC, useMemo } from 'react'
import { GraphData } from './utils/composeGraphData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { color, statusColor } from '@/data/variables.style'
import { css } from '@emotion/react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const plugins = {
  legend: {
    position: 'right' as const,
  },
  tooltip: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'index',
    intersec: false,
  },
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,

  scales: {
    x: {
      title: {
        display: true,
        text: 'ms',
      },
    },
    y: {
      title: {
        display: true,
        text: 'count',
      },
      min: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
}

export interface ResultGraphProps {
  graphData: GraphData
}

export const ResultGraph: FC<ResultGraphProps> = ({ graphData }) => {
  const { labels, success, fail } = graphData
  const data = useMemo(
    () => ({
      labels,
      plugins,
      datasets: [
        {
          label: 'SUCCESS',
          data: success,
          borderColor: statusColor.GOOD,
          backgroundColor: statusColor.GOOD,
        },
        {
          label: 'FAIL',
          data: fail,
          borderColor: statusColor.FAIL,
          backgroundColor: statusColor.FAIL,
        },
      ],
    }),
    [fail, labels, success]
  )
  return (
    <div css={wrapperCss}>
      <Line options={options} data={data} />
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
