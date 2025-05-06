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
  DialogTitle
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
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type DeleteAccountDialogProps = ComponentProps<typeof Dialog>

export const formSchema = z.object({
  confirm: z.string().min(1, {
    message: 'The text you entered did not match "delete my personal account"'
  })
})

export const DeleteAccountDialog = ({
  onOpenChange,
  ...props
}: DeleteAccountDialogProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: ''
    }
  })

  const handleDeleteAccount = async ({
    confirm
  }: z.infer<typeof formSchema>) => {
    const callbackUrl = new URL('/', window.location.origin)

    if (confirm !== 'delete my personal account') {
      toast.error(
        'Please confirm the action by entering the text "delete my personal account"'
      )
      return
    }

    await authClient.deleteUser({
      callbackURL: callbackUrl.toString(),
      fetchOptions: {
        throw: true
      }
    })

    toast.success('Account deleted', {
      icon: <Trash2 className="h-4 w-4" />,
      description: 'You have successfully deleted your account'
    })

    router.push(callbackUrl.toString())
  }

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent hideClose className="sm:max-w-md">
        <DialogHeader className="flex gap-4">
          <DialogTitle className="text-lg md:text-xl">
            Delete Personal Account
          </DialogTitle>
          <DialogDescription>
            Permanently remove your Personal Account and all of its contents
            from the Zero Link platform. This action is not reversible, so
            please continue with caution.
          </DialogDescription>
          <Alert variant="destructive" className="border-0 bg-destructive/10">
            <AlertDescription>
              This action is not reversible. Please be certain.
            </AlertDescription>
          </Alert>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDeleteAccount)}>
            <div className="m-[0_calc(-1*24px)] border-y bg-input/30 p-6">
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="gap-1 font-normal text-muted-foreground">
                      To verify, type <b>delete my personal account</b> below
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex pt-6 sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
