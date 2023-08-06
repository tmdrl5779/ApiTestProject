import {
  ApiOutlined,
  BarChartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LoadingOutlined,
  MergeCellsOutlined,
} from '@ant-design/icons'
import { EmptyObj } from 'common-types'

const navItemIconStyle = {
  fontSize: '32px',
}

export const ApiOutlinedIcon: React.FC<EmptyObj> = () => <ApiOutlined rev={'?'} style={navItemIconStyle} />
export const BarChartOutlinedIcon: React.FC<EmptyObj> = () => <BarChartOutlined rev={'?'} style={navItemIconStyle} />
export const MergeCellsOutlinedIcon: React.FC<EmptyObj> = () => (
  <MergeCellsOutlined rev={'?'} style={navItemIconStyle} />
)
export const DoubleLeftOutlinedIcon: React.FC<EmptyObj> = () => (
  <DoubleLeftOutlined rev={'?'} style={navItemIconStyle} />
)
export const DoubleRightOutlinedIcon: React.FC<EmptyObj> = () => (
  <DoubleRightOutlined rev={'?'} style={navItemIconStyle} />
)

export const LoadingOutlinedIcon: React.FC<EmptyObj> = () => (
  <LoadingOutlined rev={'?'} style={{ marginRight: '4px' }} />
)
