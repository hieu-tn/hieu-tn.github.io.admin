export interface ISideProjectsResponse {
  slug: string
  frontmatter: ISideProject
  content: string
}

export interface ISideProject {
  templateKey: string
  date?: Date
  title: string
  url?: string
}
