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

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'right' as const,
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
      datasets: [
        {
          label: 'SUCCESS',
          data: success,
          borderColor: 'rgb(144, 238, 144)',
          backgroundColor: 'rgba(144, 238, 144, 0.5)',
        },
        {
          label: 'FAIL',
          data: fail,
          borderColor: 'rgb(226, 54, 54)',
          backgroundColor: 'rgba(226, 54, 54, 0.5)',
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
