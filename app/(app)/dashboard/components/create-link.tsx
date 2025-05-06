'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { tag } from '@/db/schema'
import { generateRandomString, getTagBackgroundColor } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  CheckCircle2,
  Plus,
  Rocket,
  Shuffle,
  Tags
} from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { createLink, isSlugExists } from '../../actions/link'
import { CreateTag } from './create-tag'

type CreateLinkProps = {
  children: ReactNode
  slug?: string
  tags: (typeof tag.$inferSelect)[]
}

export const formSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'Please enter a URL.' })
    .url({
      message:
        "Please enter a valid URL. Don't forget to include 'http://' or 'https://'."
    })
    .regex(/^(?!.*(?:http|https):\/\/(?:slug|slugr)\.vercel\.app).*$/, {
      message: 'You cannot use the Zero Link URL as a redirect destination.'
    })
    .regex(/^\S+$/, {
      message: 'URL cannot contain spaces.' // No blank spaces
    }),
  slug: z
    .string()
    .min(4, {
      message: 'Short link must be at least 4 characters long.'
    })
    .regex(/^[a-z0-9_-]*$/, {
      message:
        'Short link can only contain lowercase letters, numbers, underscores, and hyphens.'
    })
    .regex(/^(?!.*&c$)/, {
      message: "Short link cannot end with '&c'."
    }),
  description: z
    .string()
    .max(100, { message: 'Description must be 100 characters or less.' }),
  selectedTags: z.array(z.string())
})

export const CreateLink = ({ children, slug, tags }: CreateLinkProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      slug: slug || '',
      description: '',
      selectedTags: []
    }
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const slugExists = await isSlugExists(value.slug)

    if (slugExists) {
      toast.error('Slug already exists.', {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Please try a different slug.'
      })
      return
    }

    const result = await createLink(value)

    if (!result.success) {
      toast.error(result.message, {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Please try again.'
      })
      return
    }

    toast.success(result.message, {
      icon: <CheckCircle2 className="h-4 w-4" />,
      description: 'You can now use this link to redirect to your desired URL.',
      duration: 10000
    })

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://pungrumpy.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short link</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input {...field} placeholder="pungrumpy" />
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-0 rounded-none rounded-r-md border-none"
                          onClick={e => {
                            e.preventDefault()
                            field.onChange(generateRandomString(4))
                          }}
                        >
                          <Shuffle className="h-4 w-4" />
                          <span className="sr-only">Generate random slug</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write something about this link (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap items-center gap-2">
                {tags.map(tag => (
                  <Button
                    key={tag.id}
                    className="lowercase transition-colors hover:opacity-80"
                    variant={
                      form.watch('selectedTags').includes(tag.id)
                        ? 'default'
                        : 'outline'
                    }
                    style={{
                      backgroundColor: getTagBackgroundColor(
                        tag.color,
                        form.watch('selectedTags').includes(tag.id)
                      ),
                      borderColor: tag.color ? `${tag.color}8D` : ''
                    }}
                    onClick={e => {
                      e.preventDefault()
                      const currentTags = form.getValues('selectedTags')
                      if (currentTags.includes(tag.id)) {
                        form.setValue(
                          'selectedTags',
                          currentTags.filter(id => id !== tag.id)
                        )
                      } else {
                        form.setValue('selectedTags', [...currentTags, tag.id])
                      }
                    }}
                  >
                    {tag.name}
                  </Button>
                ))}
                <CreateTag tags={tags}>
                  <Button size="icon" variant="outline">
                    {tags.length > 0 ? (
                      <Plus className="h-4 w-4" />
                    ) : (
                      <Tags className="h-4 w-4" />
                    )}
                    <span className="sr-only">Create new tag</span>
                  </Button>
                </CreateTag>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                <Rocket className="h-4 w-4" />
                Create {form.watch('slug') || 'Link'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
