export interface IPortfolio {
  slug: string
  frontmatter: {
    templateKey: string
    date?: string
    title: string
    duration?: string
    url?: string
    members?: number
    stacks?: string
  }
  content: string
}
