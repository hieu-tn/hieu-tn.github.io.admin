export interface IPortfolio {
  slug: string
  frontmatter: {
    templateKey: string
    active: boolean
    date?: string
    title: string
    duration?: string
    url?: string
    members?: number
    stacks?: string
    duties: Array<{
      point: string
    }>
  }
  content: string
}
