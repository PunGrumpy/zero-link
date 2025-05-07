'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { link } from '@/db/schema'
import { Download, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

type QRCodeProps = {
  baseUrl: string
  linkInfo: typeof link.$inferSelect
}

export const QRCode = ({ baseUrl, linkInfo }: QRCodeProps) => {
  const handleDownloadQRCode = (type: 'png' | 'svg') => {
    const svg = document.getElementById('qr-code') as HTMLElement
    const svgData = new XMLSerializer().serializeToString(svg)
    if (type === 'svg') {
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' })
      const downloadLink = document.createElement('a')
      downloadLink.download = `${linkInfo.slug}_zero_link.svg`
      downloadLink.href = window.URL.createObjectURL(svgBlob)
      downloadLink.click()
    } else if (type === 'png') {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `${linkInfo.slug}_zero_link.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild onSelect={e => e.preventDefault()}>
        <DropdownMenuItem>
          <QrCode className="h-4 w-4" /> Copy QR Code
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            QR Code for
            <Badge variant="outline" className="py-1.5">
              {`/${linkInfo.slug}`}
            </Badge>
          </DialogTitle>
          <DialogDescription>{linkInfo.description}</DialogDescription>
        </DialogHeader>
        <div className="my-3 flex flex-col items-center justify-center space-y-3 overflow-hidden">
          <div className="rounded-lg border p-2 shadow-md">
            <QRCodeSVG
              id="qr-code"
              className="h-32 w-32"
              style={{ height: 'auto' }}
              value={`${baseUrl}/${linkInfo.slug}`}
            />
          </div>
        </div>
        <DialogFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4" />
                <span>Download QR</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownloadQRCode('png')}>
                Download as PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadQRCode('svg')}>
                Download as SVG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
