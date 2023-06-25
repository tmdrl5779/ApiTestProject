import { createObject, getObjectKeys } from '../ObjectHandler'

type GetMemoizedObj<IContext> = (obj: IContext) => IContext
// 객체 propertyNames 모르는 상태로 받아와서 memo하고 싶은 경우 useMemo 대신 쓸 수 있다.

function getMemoizedObjBuilder<IContext extends object>(): { getMemoizedObj: GetMemoizedObj<IContext> } {
  let memoizedObj = createObject<IContext>(null)

  const getMemoizedObj: GetMemoizedObj<IContext> = obj => {
    const keys = getObjectKeys(obj)
    const isSameAsMemoizedObj = keys.every(key => {
      return Object.is(obj[key], memoizedObj[key])
    })
    if (!isSameAsMemoizedObj) {
      memoizedObj = Object.create(obj)
    }
    return memoizedObj
  }

  return {
    getMemoizedObj,
  }
}

export { getMemoizedObjBuilder }
