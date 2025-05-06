'use client'

import { SettingCardFooter } from '@/components/setting/setting-card-footer'
import { SettingCardHeader } from '@/components/setting/setting-card-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import type { auth } from '@/lib/auth'
import { Construction } from 'lucide-react'
import { toast } from 'sonner'

type UpdateAvatarCardProps = {
  session: typeof auth.$Infer.Session
}

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    const reader = new FileReader()

    reader.onload = event => {
      image.src = event.target?.result as string
    }

    image.onload = () => resolve(image)
    image.onerror = error => reject(error)

    reader.readAsDataURL(file)
  })

const resizeAndCropImage = async ({
  file,
  name,
  size,
  avatarExtension
}: {
  file: File
  name: string
  size: number
  avatarExtension: string
}) => {
  const image = await loadImage(file)

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size

  const ctx = canvas.getContext('2d')

  const minEdge = Math.min(image.width, image.height)

  const sx = (image.width - minEdge) / 2
  const sy = (image.height - minEdge) / 2
  const sWidth = minEdge
  const sHeight = minEdge

  ctx?.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, size, size)

  const resizedImageBlob = await new Promise<Blob | null>(resolve =>
    canvas.toBlob(resolve, `image/${avatarExtension}`)
  )

  return new File(
    [resizedImageBlob as BlobPart],
    `${name}.${avatarExtension}`,
    {
      type: `image/${avatarExtension}`
    }
  )
}

export const UpdateAvatarCard = ({ session }: UpdateAvatarCardProps) => {
  const _ = async (file: File) => {
    if (!session) {
      return
    }

    const resizedFile = await resizeAndCropImage({
      file,
      name: session.user.name,
      size: 128,
      avatarExtension: 'png'
    })

    toast.success('Avatar updated', {
      description: resizedFile.name
    })
  }

  return (
    <Card className="w-full pb-0 text-start">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <SettingCardHeader
            title="Avatar"
            description={
              <>
                <p>This is your avatar.</p>
                <p>
                  Click on the avatar to upload a custom one from your files.
                </p>
              </>
            }
          />
        </div>
        <button
          type="button"
          className="group me-6"
          onClick={() =>
            toast.warning('Now this feature is not available.', {
              icon: <Construction className="h-4 w-4" />
            })
          }
        >
          <Avatar className="h-20 w-20 bg-muted transition-opacity duration-300 group-hover:opacity-70">
            <AvatarImage
              src={session.user.image || ''}
              alt={session.user.name}
            />
            <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </div>
      <SettingCardFooter instructions="An avatar is optional but strongly recommended." />
    </Card>
  )
}
