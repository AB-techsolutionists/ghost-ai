import { Workflow, Sparkles, Share2 } from "lucide-react"

const features = [
  {
    icon: Workflow,
    title: "Visual Canvas",
    description: "Build workflows with an intuitive drag-and-drop interface",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Generate and edit workflows using natural language",
  },
  {
    icon: Share2,
    title: "Collaborate",
    description: "Share and collaborate with your team in real time",
  },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-elevated p-12">
        <div>
          <span className="text-lg font-bold text-copy-primary tracking-tight">
            GHOST AI
          </span>
        </div>

        <div className="mt-24 max-w-md">
          <h1 className="font-heading text-3xl font-bold text-copy-primary leading-tight">
            Build smarter workflows with AI
          </h1>
          <p className="mt-4 text-copy-secondary leading-relaxed">
            Design, automate, and optimize your processes with an intelligent
            visual editor that adapts to how you work.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                <feature.icon className="size-4 text-copy-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-copy-primary">
                  {feature.title}
                </p>
                <p className="mt-0.5 text-sm text-copy-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-base p-8">
        {children}
      </div>
    </div>
  )
}
