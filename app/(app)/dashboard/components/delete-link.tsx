'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { deleteLink } from '../../actions/link'

const formSchema = z.object({
  slug: z.string().min(1, { message: 'The slug you entered is invalid.' }),
  confirm: z.string().min(1, {
    message: 'The text you entered did not match "delete this link"'
  })
})

type DeleteLinkProps = {
  slug: string
}

export const DeleteLink = ({ slug }: DeleteLinkProps) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: '',
      confirm: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.slug !== slug) {
      toast.error('Invalid slug', {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'The slug you entered does not match the link slug.'
      })
      return
    }

    if (values.confirm !== 'delete this link') {
      toast.error('Invalid confirmation', {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Please type "delete this link" to confirm.'
      })
      return
    }

    const result = await deleteLink(slug)

    if (!result.success) {
      toast.error(result.message, {
        icon: <AlertCircle className="h-4 w-4" />,
        description: 'Please try again.'
      })
      return
    }

    toast.success(result.message, {
      icon: <Trash2 className="h-4 w-4" />,
      description: 'The link has been permanently deleted.'
    })

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onSelect={e => e.preventDefault()}>
        <DropdownMenuItem
          variant="destructive"
          className="bg-destructive/10 transition-colors duration-300"
        >
          <Trash2 className="h-4 w-4" /> Delete Link
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            This action is not reversible. Please enter the slug and type the
            confirmation text to delete this link.
          </DialogDescription>
          <Alert variant="destructive" className="border-0 bg-destructive/10">
            <AlertDescription>
              This action is not reversible. Please be certain.
            </AlertDescription>
          </Alert>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="m-[0_calc(-1*24px)] grid gap-6 border-y bg-input/30 p-6">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-1 font-normal text-muted-foreground">
                      For verification, enter the <b>slug</b> below
                    </FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" placeholder={slug} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-1 font-normal text-muted-foreground">
                      To verify, type <b>delete this link</b> below
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="delete this link"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex pt-6 sm:justify-between">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    form.reset()
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="destructive">
                Delete Link
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
