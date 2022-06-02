import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { IExperience, IJobDescription } from '@models/experience.models'


const experienceDirectory = join(process.cwd(), 'contents', 'experience')

export const getExperienceBySlug = (slug: string): IExperience => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(experienceDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)
  data.date = data.date.toString()
  const jd: string[] = data.jobDescription.map((desc: IJobDescription) => desc.point)

  return {slug: realSlug, frontmatter: {...data, jobDescription: jd}, content} as IExperience
}

export const getAllExperience = (): IExperience[] => {
  const slugs = fs.readdirSync(experienceDirectory)
  const experience = slugs.map((slug: string) => getExperienceBySlug(slug))
  experience.sort((a, b) => {
    return new Date(b.frontmatter.date || '').valueOf() - new Date(a.frontmatter.date || '').valueOf()
  })
  return experience
}
