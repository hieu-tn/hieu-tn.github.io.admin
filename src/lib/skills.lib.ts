import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { ISkill } from '@models/skills.models'


const skillsDirectory = join(process.cwd(), 'contents', 'skills')

export const getSkillBySlug = (slug: string): ISkill => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(skillsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)
  data.date = data.date.toString()

  return {slug: realSlug, frontmatter: data, content} as ISkill
}

export const getAllSkills = (): ISkill[] => {
  const slugs = fs.readdirSync(skillsDirectory)
  const skills = slugs.map((slug: string) => getSkillBySlug(slug))

  return skills
}
