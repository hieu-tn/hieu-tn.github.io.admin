import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { IPortfoliosResponse } from '@models/portfolios.api.models'


const portfoliosDirectory = join(process.cwd(), 'contents', 'portfolio')

export const getPortfolioBySlug = (slug: string): IPortfoliosResponse => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(portfoliosDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)

  return {slug: realSlug, frontmatter: data, content} as IPortfoliosResponse
}

export const getAllPortfolios = (): IPortfoliosResponse[] => {
  const slugs = fs.readdirSync(portfoliosDirectory)
  const portfolios = slugs.map((slug: string) => getPortfolioBySlug(slug))

  return portfolios
}
