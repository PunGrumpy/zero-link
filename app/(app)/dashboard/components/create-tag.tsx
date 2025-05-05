'use client'

import { Button } from '@/components/ui/button'
import { ColorInput } from '@/components/ui/color-input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { tag } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { createTag } from '../actions/tag'

type CreateTagProps = {
  children: ReactNode
  tags: (typeof tag.$inferSelect)[]
}

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a tag name.' }).max(15, {
    message: 'Tag name must be 15 characters or less.'
  }),
  color: z.string().min(1, { message: 'Please select a tag color.' })
})

export const CreateTag = ({ children, tags }: CreateTagProps) => {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    if (tags.map(tag => tag.name).includes(value.name)) {
      toast.error('Tag name already exists.', {
        icon: <AlertCircle className="size-4" />,
        description: 'Please try a different tag name.'
      })
      return
    }

    const result = await createTag(value)

    if (!result.success) {
      toast.error(result.message, {
        icon: <AlertCircle className="size-4" />,
        description: 'Please try again.'
      })
      return
    }

    toast.success(result.message, {
      icon: <CheckCircle2 className="size-4" />,
      description: 'You can now use this tag to organize your links.'
    })

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new tag</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <ColorInput
                        {...field}
                        onChange={e => {
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create Tag</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
