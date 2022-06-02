export interface ISideProject {
  slug: string
  frontmatter: {
    templateKey: string
    date?: string
    title: string
    url?: string
  }
  content: string
}
