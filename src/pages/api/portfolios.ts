import { NextApiRequest, NextApiResponse } from 'next'
import { IPortfoliosResponse } from '@models/portfolios.api.models'
import { getAllPortfolios } from '@lib/portfolios.lib'


export default (req: NextApiRequest, res: NextApiResponse<IPortfoliosResponse[]>) => {
  const portfolios: IPortfoliosResponse[] = getAllPortfolios()
  portfolios.sort((a, b) => {
    return new Date(b.frontmatter.date || '').valueOf() - new Date(a.frontmatter.date || '').valueOf()
  })
  res.status(200).json(portfolios)
}
