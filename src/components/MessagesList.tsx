import { Message } from '@/components/Message';

import { IMessage } from '@/types';
import { useRef } from 'react';

export function MessagesList({ messages }: any) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll when stream data
  // const scrollToBottom = useCallback(
  //   throttle(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  //   }, 1000),
  //   [messagesEndRef],
  // );
  // useEffect(() => {
  //   if (globalState.stream) scrollToBottom();
  // }, [answered]);

  if (!messages) return null;
  console.log(messages);
  return (
    <div>
      {(messages as IMessage[]).map((message, index) => {
        const isAssistant = message.role === 'assistant';
        return (
          <div className="mb-2" key={index}>
            <Message variant={isAssistant ? 'assistant' : 'default'}>
              {message.content}
            </Message>
          </div>
        );
      })}
      <div className="mt-12" key="ending" ref={messagesEndRef} />
    </div>
  );
}
