"use client"

import { toast } from "sonner"
import { Input } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { ArrowBigRight } from "lucide-react"
import { SyntheticEvent, useState } from "react"

import { isValidUrl } from "@/lib/utils"
import { BackgroundBeams } from "@/components/background-beams"

const Home = () => {
  const router = useRouter()

  const [url, setUrl] = useState("")

  const onPaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setUrl(text)
        toast.success("Pasted from clipboard")
      })
      .catch(() => toast.error("Error reading clipboard"))
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (isValidUrl(url)) {
      router.push(`/${encodeURIComponent(url)}`)
    } else {
      toast.error("Not a valid URL")
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-950">
      <div className="z-10 mx-5 max-w-3xl md:mx-auto">
        <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-center text-3xl font-bold text-transparent md:text-5xl lg:text-6xl">
          Engage Any Website
        </h1>
        <p className="py-3 text-center text-sm text-neutral-500 md:text-base">
          Chat with any website just by entering its URL. Our platform lets you
          start real-time conversations with sites, making it easy to get help,
          explore features, or simply connect. It&apos;s a hassle-free way to
          interact directly with the web!
        </p>
        <Input
          autoFocus
          type="url"
          className="mt-2"
          label="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          endContent={
            <div className="flex h-full items-center justify-center gap-x-3">
              <button
                type="button"
                onClick={onPaste}
                className="text-base text-zinc-400"
              >
                Paste
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className="rounded-lg bg-blue-600 p-2"
              >
                <ArrowBigRight className="size-5" />
              </button>
            </div>
          }
        />
      </div>
      <BackgroundBeams />
    </div>
  )
}

export default Home
