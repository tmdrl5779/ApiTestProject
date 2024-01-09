import { useCallback } from 'react'
import { useAPIContext } from '../..'
import Editor from '@monaco-editor/react'

export const BodyEditor = () => {
  const { api, updateSingleAPI } = useAPIContext()
  const onChangeBody = useCallback(
    (value: string | undefined) => {
      updateSingleAPI({
        value: value ?? '',
        _tag: 'UpdateBodyAction',
      })
    },
    [updateSingleAPI]
  )

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      language="json"
      defaultLanguage="json"
      defaultValue={api['request'].body}
      onChange={onChangeBody}
      loading={<p>편집기를 로딩중입니다...</p>}
    />
  )
}
