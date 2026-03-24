import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "A simple button component with variant support.",
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  },
]
