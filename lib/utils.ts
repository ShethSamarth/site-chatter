import { twMerge } from "tailwind-merge"
import clsx, { type ClassValue } from "clsx"

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input))
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

export const reconstructUrl = ({ url }: { url: string[] }) => {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  )

  return decodedComponents.join("/")
}
