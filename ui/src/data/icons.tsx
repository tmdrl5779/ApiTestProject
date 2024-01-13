import {
  ApiOutlined,
  BarChartOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LoadingOutlined,
  MergeCellsOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  FrownOutlined,
} from '@ant-design/icons'
import { EmptyObj } from 'common-types'

const navItemIconStyle = {
  fontSize: '32px',
}

export const ApiOutlinedIcon: React.FC<EmptyObj> = () => <ApiOutlined style={navItemIconStyle} />
export const BarChartOutlinedIcon: React.FC<EmptyObj> = () => <BarChartOutlined style={navItemIconStyle} />
export const MergeCellsOutlinedIcon: React.FC<EmptyObj> = () => <MergeCellsOutlined style={navItemIconStyle} />
export const DoubleLeftOutlinedIcon: React.FC<EmptyObj> = () => <DoubleLeftOutlined style={navItemIconStyle} />
export const DoubleRightOutlinedIcon: React.FC<EmptyObj> = () => <DoubleRightOutlined style={navItemIconStyle} />

const loadingIconStyle = { marginRight: '4px' }

export const LoadingOutlinedIcon: React.FC<EmptyObj> = () => <LoadingOutlined style={loadingIconStyle} />

const bigIconStyle = {
  fontSize: '100px',
}

export const ApiOutlinedBigIcon: React.FC<EmptyObj> = () => <ApiOutlined style={bigIconStyle} />
