export interface IExperience {
  slug: string
  frontmatter: {
    templateKey: string
    date?: string
    duration?: string
    place: string
    url?: string
    designation?: string
    jobDescription?: string[]
  }
  content: string
}

export interface IJobDescription {
  point: string
}
