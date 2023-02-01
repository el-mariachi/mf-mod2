import AppNav from './index'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store/index'

describe('Testing AppNav component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })
  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <AppNav
          caption="One Bit Dungeon"
          paths={[
            {
              title: 'Играть!',
              path: '/',
              icon: 'Dice3Fill',
            },
            {
              title: 'Список лидеров',
              path: '/leaderboard',
              icon: 'BarChartLineFill',
            },
            {
              title: 'Игровой форум',
              path: '/forum',
              icon: 'ChatLeftTextFill',
            },
            {
              title: 'Профиль игрока',
              path: '/profile',
              icon: 'PersonSquare',
            },
          ]}
        />
      </Provider>,
      { wrapper: BrowserRouter }
    )
    expect(container).toMatchSnapshot()
  })
})
