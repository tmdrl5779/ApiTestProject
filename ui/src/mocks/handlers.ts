import { rest } from 'msw'

export const handlers = [
  // mocking할 api들을 넣어주세요.
  rest.post(`${process.env.REACT_APP_ADAPTOR_BASE_URL}/call/api`, (req, res, ctx) => {
    return res(
      ctx.delay(3000),
      ctx.status(200),
      ctx.cookie('test', '123'),
      ctx.cookie('test2', '456'),
      ctx.json({
        responseTime: 0,
        body: {
          message: 'hi',
          result: 'success',
        },
        status: '200',
      })
    )
  }),
]
