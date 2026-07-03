"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40" onClick={onClose} />}
      <aside
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 border-r border-border bg-surface transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-12 items-center justify-between border-b border-border px-4">
          <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close sidebar">
            <X className="size-4" />
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="flex h-[calc(100%-3rem)] flex-col">
          <TabsList className="mx-4 mt-3">
            <TabsTrigger value="my-projects" className="flex-1">My Projects</TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 px-4 py-8">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-copy-muted">No projects yet</p>
            </div>
          </TabsContent>

          <TabsContent value="shared" className="flex-1 px-4 py-8">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-copy-muted">No shared projects</p>
            </div>
          </TabsContent>

          <div className="border-t border-border p-4">
            <Button className="w-full">
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        </Tabs>
      </aside>
    </>
  )
}
