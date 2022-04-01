export interface ISkillsResponse {
  slug: string
  frontmatter: ISkill
  content: string
}

export interface ISkill {
  templateKey: string
  date?: Date
  category?: string
  items?: string
}
