import { NextApiRequest, NextApiResponse } from 'next'
import { IExperienceResponse } from '@models/experience.api.models'
import { getAllExperience } from '@lib/experience.lib'


export default (req: NextApiRequest, res: NextApiResponse<IExperienceResponse[]>) => {
  const experience: IExperienceResponse[] = getAllExperience()
  experience.sort((a, b) => {
    return new Date(b.frontmatter.date || '').valueOf() - new Date(a.frontmatter.date || '').valueOf()
  })
  res.status(200).json(experience)
}
