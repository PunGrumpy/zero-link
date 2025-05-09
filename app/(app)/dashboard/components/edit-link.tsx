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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
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
import { cn, getTagColor } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Edit, Plus, Tags } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { updateLink } from '../../actions/link'
import type { LinkWithTag } from '../../actions/link'
import { formSchema } from './create-link'
import { CreateTag } from './create-tag'

type EditLinkProps = {
  link: LinkWithTag
  tags: (typeof tag.$inferSelect)[]
  isCustomSlugs: boolean
}

export const EditLink = ({ link, tags, isCustomSlugs }: EditLinkProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: link.url,
      slug: link.slug,
      description: link.description || '',
      selectedTags: link.tags.map(tag => tag.id)
    }
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const result = await updateLink(link.slug, value)

    if (!result.success) {
      toast.error(result.message, {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Please try again.'
      })
      return
    }

    toast.success(result.message, {
      icon: <CheckCircle2 className="h-4 w-4" />,
      description: 'Your link has been updated successfully.',
      duration: 10000
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onSelect={e => e.preventDefault()}>
        <DropdownMenuItem>
          <Edit className="h-4 w-4" /> Edit Link
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
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
                      <Input
                        {...field}
                        placeholder="pungrumpy"
                        disabled={!isCustomSlugs}
                        className={cn(!isCustomSlugs && 'cursor-not-allowed')}
                      />
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
                      ...getTagColor(
                        tag.color,
                        form.watch('selectedTags').includes(tag.id)
                      )
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
                <Edit className="h-4 w-4" />
                Update {form.watch('slug') || 'Link'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
