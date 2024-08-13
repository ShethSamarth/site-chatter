"use client"

import { Message, useChat } from "ai/react"

import { Messages } from "@/components/messages"
import { ChatInput } from "@/components/chat-input"

export const ChatWrapper = ({
  sessionId,
  initialMessages
}: {
  sessionId: string
  initialMessages: Message[]
}) => {
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages
    })

  return (
    <main className="relative flex h-screen flex-col justify-between gap-2 divide-y divide-zinc-700 bg-zinc-900">
      <div className="flex flex-1 flex-col justify-between bg-zinc-800 text-black">
        <Messages messages={messages} />
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </main>
  )
}
