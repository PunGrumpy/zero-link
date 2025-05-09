import { Section } from '@/components/section'
import { cn } from '@/lib/utils'

export const Hero = () => {
  return (
    <Section crossPosition="top-left" className="border-t p-24">
      <div className="flex flex-col items-center gap-4">
        <h1
          className={cn(
            'max-w-4xl font-bold text-3xl leading-tight tracking-tight',
            'text-center text-4xl leading-tight',
            'md:text-5xl md:leading-tight'
          )}
        >
          Zero Link
        </h1>
        <p className="block text-muted-foreground md:text-md">
          Unleash the thunderbolt of efficiency with our divine URL shortener
          that will make your life easier.
        </p>
      </div>
    </Section>
  )
}
