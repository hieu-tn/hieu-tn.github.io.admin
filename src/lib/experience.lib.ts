import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { IExperienceResponse, IJobDescription } from '@models/experience.api.models'


const experienceDirectory = join(process.cwd(), 'contents', 'experience')

export const getExperienceBySlug = (slug: string): IExperienceResponse => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(experienceDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)
  const jd: string[] = data.jobDescription.map((desc: IJobDescription) => desc.point)

  return {slug: realSlug, frontmatter: {...data, jobDescription: jd}, content} as IExperienceResponse
}

export const getAllExperience = (): IExperienceResponse[] => {
  const slugs = fs.readdirSync(experienceDirectory)
  const experience = slugs.map((slug: string) => getExperienceBySlug(slug))

  return experience
}
