import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { ISideProjectsResponse } from '@models/projects.api.models'


const sideProjectsDirectory = join(process.cwd(), 'contents', 'side-projects')

export const getSideProjectBySlug = (slug: string): ISideProjectsResponse => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(sideProjectsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)

  return {slug: realSlug, frontmatter: data, content} as ISideProjectsResponse
}

export const getAllSideProjects = (): ISideProjectsResponse[] => {
  const slugs = fs.readdirSync(sideProjectsDirectory)
  const sideProjects = slugs.map((slug: string) => getSideProjectBySlug(slug))

  return sideProjects
}
