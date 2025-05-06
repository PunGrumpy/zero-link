'use client'

import { SettingCardFooter } from '@/components/setting/setting-card-footer'
import { SettingCardHeader } from '@/components/setting/setting-card-header'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { auth } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateName } from '../actions/name'

type UpdateNameCardProps = {
  session: typeof auth.$Infer.Session
}

export const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required'
    })
    .max(32, {
      message: 'Name must be 32 characters or less'
    })
})

export const UpdateNameCard = ({ session }: UpdateNameCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.user.name
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { success, message } = await updateName(data.name)

    if (success) {
      toast.success(message, {
        icon: <User className="h-4 w-4" />,
        description: 'Your name has been updated'
      })
    } else {
      toast.error(message, {
        icon: <User className="h-4 w-4" />,
        description: 'Your name has not been updated'
      })
    }

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full pb-0 text-start">
          <SettingCardHeader
            title="Display Name"
            description="Please enter you name, or a display name."
          />
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <SettingCardFooter
            instructions="Please use 32 characters at maximum."
            actionLabel="Save"
            variant="default"
            action={form.handleSubmit(onSubmit)}
          />
        </Card>
      </form>
    </Form>
  )
}
