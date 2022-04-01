export interface IExperienceResponse {
  slug: string
  frontmatter: IExperience
  content: string
}

export interface IJobDescription {
  point: string
}

export interface IExperience {
  templateKey: string
  date?: Date
  duration?: string
  place: string
  url?: string
  designation?: string
  jobDescription?: string[]
}
