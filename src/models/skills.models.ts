export interface ISkill {
  slug: string
  frontmatter: {
    templateKey: string
    date?: string
    category?: string
    items?: string
  }
  content: string
}
