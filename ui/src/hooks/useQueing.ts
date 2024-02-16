import { useCallback, useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'

let GLOBALQUEUE: Array<MessageEvent<any>> = []
let timer: NodeJS.Timeout

type MsgTypeChecker = (msg: MessageEvent<any>) => boolean

const isRealtime: MsgTypeChecker = msg => {
  return msg !== null && !msg.data.startsWith('connection')
}

const isOpen: MsgTypeChecker = msg => {
  return msg?.data.includes('open')
}

const isClose: MsgTypeChecker = msg => {
  return msg?.data.includes('close')
}

interface UseQueueingProps {
  websocketUrl: string
  onOpen?: (msg: MessageEvent<any>) => void
  onQueue?: (queue: Array<MessageEvent<any>>) => void
  startMsg: string | null
  onClose?: (msg: MessageEvent<any>) => void
}

export const useQueueing = ({ websocketUrl, onOpen, startMsg, onQueue, onClose }: UseQueueingProps) => {
  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(websocketUrl)

  const [queue, setQueue] = useState<any[]>([])
  const prevQueueLen = useRef<number>(0)

  const startTick = useCallback(() => {
    const timer = setInterval(() => {
      if (GLOBALQUEUE.length !== 0) {
        const t = [...GLOBALQUEUE]
        GLOBALQUEUE = []
        setQueue(prev => {
          prevQueueLen.current = prev.length
          return [...prev, ...t]
        })
      }
    }, 1000)
    return timer
  }, [])

  useEffect(() => {
    if (lastMessage != null) {
      if (isRealtime(lastMessage)) {
        GLOBALQUEUE.push(lastMessage)
        // console.log('global q:', GLOBALQUEUE)
      } else if (isOpen(lastMessage)) {
        if (startMsg != null) {
          sendMessage(startMsg)
        }
        onOpen?.(lastMessage)
        timer = startTick()
      } else if (isClose(lastMessage)) {
        onClose?.(lastMessage)
        setTimeout(() => {
          clearInterval(timer)
        }, 5000)
      }
    }
  }, [lastMessage, onClose, onOpen, sendMessage, startMsg, startTick])

  useEffect(() => {
    const added = queue.slice(prevQueueLen.current)
    onQueue?.(added)
  }, [onQueue, queue])

  useEffect(() => {
    return () => {
      getWebSocket()?.close()
      clearInterval(timer)
    }
  }, [getWebSocket])

  return [queue]
}
