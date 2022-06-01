import { NextApiRequest, NextApiResponse } from 'next'
import { ISideProjectsResponse } from '@models/projects.api.models'
import { getAllSideProjects } from '@lib/projects.lib'
import { markdownToHtml } from '@lib/utils.lib'


export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const sideProjects: ISideProjectsResponse[] = getAllSideProjects()
  const results: ISideProjectsResponse[] = []
  for (const item of sideProjects) {
    item.content = await markdownToHtml(item.content)
    results.push(item)
  }
  results.sort((a, b) => {
    return new Date(b.frontmatter.date || '').valueOf() - new Date(a.frontmatter.date || '').valueOf()
  })

  res.status(200).json(results)
}
