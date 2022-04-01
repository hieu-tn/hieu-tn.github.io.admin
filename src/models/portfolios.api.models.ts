export interface IPortfoliosResponse {
  slug: string
  frontmatter: IPortfolio
  content: string
}

export interface IPortfolio {
  templateKey: string
  date?: Date
  title: string
  duration?: string
  url?: string
  members?: number
  stacks?: string
}
