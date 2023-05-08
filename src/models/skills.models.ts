export interface ISkill {
  slug: string
  frontmatter: {
    templateKey: string
    active: boolean
    date?: string
    category?: string
    items?: string
  }
  content: string
}
