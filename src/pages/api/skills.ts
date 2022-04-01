import { NextApiRequest, NextApiResponse } from 'next'
import { ISkillsResponse } from '@models/skills.api.models'
import { getAllSkills } from '@lib/skills.lib'


export default (req: NextApiRequest, res: NextApiResponse<ISkillsResponse[]>) => {
  const skills: ISkillsResponse[] = getAllSkills()
  skills.sort((a, b) => {
    return new Date(b.frontmatter.date || '').valueOf() - new Date(a.frontmatter.date || '').valueOf()
  })
  res.status(200).json(skills)
}
