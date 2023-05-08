export interface ISideProject {
  slug: string
  frontmatter: {
    templateKey: string
    active: boolean
    date?: string
    title: string
    url?: string
    duties: Array<{
      point: string
    }>
  }
  content: string
}
