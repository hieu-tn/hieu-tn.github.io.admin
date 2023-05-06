import { join } from "path"
import fs from "fs"
import matter from "gray-matter"
import { ISideProject } from "@models/projects.models"


const sideProjectsDirectory = join(process.cwd(), "contents", "side-projects")

export const getSideProjectBySlug = (slug: string): ISideProject => {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(sideProjectsDirectory, `${ realSlug }.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const {data, content} = matter(fileContents)
  data.date = data.date.toString()

  return {slug: realSlug, frontmatter: data, content} as ISideProject
}

export const getAllSideProjects = (): ISideProject[] => {
  const slugs = fs.readdirSync(sideProjectsDirectory)
  const sideProjects = slugs.map((slug: string) => getSideProjectBySlug(slug))
  sideProjects.sort((a, b) => {
    return new Date(b.frontmatter.date || "").valueOf() - new Date(a.frontmatter.date || "").valueOf()
  })
  return sideProjects
}
