import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { IPortfolio } from '@models/portfolios.models'


const portfoliosDirectory = join(process.cwd(), 'contents', 'portfolio')

export const getPortfolioBySlug = (slug: string): IPortfolio => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(portfoliosDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)
  data.date = data.date.toString()

  return {slug: realSlug, frontmatter: data, content} as IPortfolio
}

export const getAllPortfolios = (): IPortfolio[] => {
  const slugs = fs.readdirSync(portfoliosDirectory)
  const portfolios = slugs.map((slug: string) => getPortfolioBySlug(slug))
  portfolios.sort((a, b) => {
    return new Date(b.frontmatter.date || '').valueOf() - new Date(a.frontmatter.date || '').valueOf()
  })
  return portfolios
}
