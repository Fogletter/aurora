import {
  useState,
  useRef,
  useEffect
} from 'react'
import useTitle from '@/hooks/useTitle'
import {
  kimiChat
} from '@/llm'
import styles from './assistant.module.css'
import {
  Input,
  Button,
  Loading,
  Toast
} from 'react-vant'
import {
  ChatO,
  UserO
} from '@react-vant/icons'

const Assistant = () => {
  useTitle('智能小助手')
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const bottomRef = useRef(null)
  // 数据驱动界面
  const [messages, setMessages] = useState([
      {
          id: 2,
          content: '你好',
          role: 'user'
      },
      {
          id: 1,
          content: 'hello,I am a assistant',
          role: 'assistant'
      }
  ])
  const handleChat = async () => {
      if (text.trim() === '') {
          Toast.info('请输入问题')
          return
      }
      setIsSending(true)
      setMessages(prev => {
          return [
              ...prev,
              {
                  role: 'user',
                  content: text
              }
          ]
      })
      const newMessage = await kimiChat([{
          role: 'user',
          content: text,
      }])
      setMessages(prev => {
          return [
              ...prev,
              newMessage.data
          ]
      })
      setIsSending(false)
      setText('')
  }
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  return (
      <div className='flex flex-col h-all'>
          <div className={`flex-1 ${styles.chatArea}`}>
              {
                  messages.map((msg, index) => (
                      <div
                          key={index}
                          className={
                              msg.role === 'user' ?
                                  styles.messageRight :
                                  styles.messageLeft
                          }
                      >
                          {
                              msg.role === 'assistant' ?
                                  <ChatO /> :
                                  <UserO />
                          }
                          {msg.content}
                      </div>
                  ))
              }
              <div ref={bottomRef} />
          </div>
          <div className={`flex ${styles.inputArea}`}>
              <Input
                  value={text}
                  onChange={(e) => setText(e)}
                  placeholder='请输入'
                  className={`flex-1 ${styles.input}`}
              />
              <Button
                  disabled={isSending}
                  type='primary'
                  onClick={handleChat}
              >
                  发送
              </Button>
          </div>
          {isSending && (<div className='fixed-loading'><Loading type='ball' /></div>)}
      </div>
  )
}

export default Assistant