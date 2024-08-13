import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { redis } from "@/lib/redis"
import { ragChat } from "@/lib/rag-chat"
import { ChatWrapper } from "@/components/chat-wrapper"
import { isValidUrl, reconstructUrl } from "@/lib/utils"

interface PageProps {
  params: { url: string | string[] | undefined }
}

const Url = async ({ params }: PageProps) => {
  const sessionCookie = cookies().get("aw-session-id")?.value
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] })

  if (!isValidUrl(reconstructedUrl)) return notFound()

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "")

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  )

  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId
  })

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 }
    })

    await redis.sadd("indexed-urls", reconstructedUrl)
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
}

export default Url
