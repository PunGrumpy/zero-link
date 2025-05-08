import { Section } from '@/components/section'
import { cn } from '@/lib/utils'

export const Hero = () => {
  return (
    <Section crossPosition="both" className="border-t p-10">
      <div className="flex flex-col items-center gap-4">
        <h1
          className={cn(
            'max-w-4xl font-bold text-3xl leading-tight tracking-tight',
            'text-center text-4xl leading-tight',
            'md:text-5xl md:leading-tight'
          )}
        >
          Find a plan to power your apps.
        </h1>
        <p className="block text-muted-foreground md:text-md">
          Zero Link is a URL shortener that allows you to create and manage your
        </p>
      </div>
    </Section>
  )
}
