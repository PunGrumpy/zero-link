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

type TagColorOptions = {
  background?: boolean
  border?: boolean
  backgroundOpacity?: number
  borderOpacity?: number
}

export const getTagColor = (
  tagColor: string | null,
  isSelected: boolean,
  options: TagColorOptions = { background: true, border: true }
) => {
  if (!tagColor) {
    return {
      backgroundColor: '',
      borderColor: ''
    }
  }

  const {
    background = true,
    border = true,
    backgroundOpacity = 25,
    borderOpacity = 50
  } = options

  const getColor = (opacity: number) =>
    isSelected ? tagColor : `${tagColor}${opacity}`

  return {
    backgroundColor: background ? getColor(backgroundOpacity) : '',
    borderColor: border ? getColor(borderOpacity) : ''
  }
}
