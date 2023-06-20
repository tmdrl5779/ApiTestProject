import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from '..'

describe('<Tabs />', () => {
  test('탭 아이템 렌더링', () => {
    render(
      <Tabs>
        <Tabs.Item key="1">1</Tabs.Item>
        <Tabs.Item key="2">2</Tabs.Item>
      </Tabs>
    )
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '2' })).toBeInTheDocument()
  })
  test('탭 아이템 클릭시 onTabClick 호출', async () => {
    const onTabClick = jest.fn()
    render(
      <Tabs onTabClick={onTabClick}>
        <Tabs.Item key="1">1</Tabs.Item>
        <Tabs.Item key="2">2</Tabs.Item>
      </Tabs>
    )
    const tab1 = screen.getByRole('tab', { name: '1' })
    await userEvent.click(tab1)
    expect(onTabClick).toHaveBeenCalled()
  })
  test('탭 아이템 클릭시 해당 아이템 선택 표시', async () => {
    render(
      <Tabs>
        <Tabs.Item key="1">1</Tabs.Item>
        <Tabs.Item key="2">2</Tabs.Item>
      </Tabs>
    )
    const tab1 = screen.getByRole('tab', { name: '1' })
    await userEvent.click(tab1)
    expect(tab1).toHaveAttribute('aria-selected', true)
  })
})
