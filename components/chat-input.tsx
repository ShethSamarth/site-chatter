"use client"

import { Send } from "lucide-react"
import { type useChat } from "ai/react"
import { Button, Textarea } from "@nextui-org/react"

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type SetInput = ReturnType<typeof useChat>["setInput"]

interface ChatInputProps {
  input: string
  setInput: SetInput
  handleInputChange: HandleInputChange
  handleSubmit: HandleSubmit
}

export const ChatInput = ({
  input,
  setInput,
  handleInputChange,
  handleSubmit
}: ChatInputProps) => {
  return (
    <div className="absolute bottom-0 left-0 z-10 w-full bg-zinc-900">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full flex-grow flex-col p-4">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                minRows={4}
                autoFocus
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                    setInput("")
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none rounded-xl bg-zinc-800 text-base"
              />

              <Button
                size="sm"
                type="submit"
                className="absolute bottom-2 right-2 z-10 bg-zinc-900"
              >
                <Send className="size-4 text-white" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
