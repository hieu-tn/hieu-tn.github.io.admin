import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { ISkillsResponse } from '@models/skills.api.models'


const skillsDirectory = join(process.cwd(), 'contents', 'skills')

export const getSkillBySlug = (slug: string): ISkillsResponse => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(skillsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)

  return {slug: realSlug, frontmatter: data, content} as ISkillsResponse
}

export const getAllSkills = (): ISkillsResponse[] => {
  const slugs = fs.readdirSync(skillsDirectory)
  const skills = slugs.map((slug: string) => getSkillBySlug(slug))

  return skills
}
