import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomString = (length: number) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const getTagBackgroundColor = (
  tagColor: string | null,
  isSelected: boolean,
  opacity = 25
) => {
  if (!tagColor) {
    return ''
  }
  return isSelected ? tagColor : `${tagColor}${opacity}`
}
