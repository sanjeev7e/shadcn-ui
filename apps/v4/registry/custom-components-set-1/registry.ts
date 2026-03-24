import { type Registry } from "shadcn/schema"

import { ui } from "./ui/_registry"

export const registry: Registry = {
  name: "custom-components-set-1",
  homepage: "https://shadcn2.yourdomain.com",
  items: [...ui],
}
