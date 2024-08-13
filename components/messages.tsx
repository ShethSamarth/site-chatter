import { useEffect, useRef } from "react"
import { MessageSquare } from "lucide-react"
import { type Message as TMessage } from "ai/react"

import { Message } from "@/components/message"

interface MessagesProps {
  messages: TMessage[]
}

export const Messages = ({ messages }: MessagesProps) => {
  return (
    <div className="flex max-h-[calc(100vh-8rem)] flex-1 flex-col overflow-y-auto">
      {messages.length !== 0 ? (
        messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            isUserMessage={message.role === "user"}
          />
        ))
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageSquare className="size-10 text-blue-500" />
          <h3 className="text-2xl font-semibold text-white">
            You&apos;re all set!
          </h3>
          <p className="text-md text-zinc-500">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  )
}
