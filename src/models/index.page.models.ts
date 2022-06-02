import { IPageProps } from '@models/common.models'
import { IExperience } from '@models/experience.models'
import { ISkill } from '@models/skills.models'
import { IPortfolio } from '@models/portfolios.models'
import { ISideProject } from '@models/projects.models'


export interface IHomeProps extends IPageProps {
  designation: string
  overview: string
  certificates: ICertificate[]
  summary: ISummary[]
  contact: {
    email: string
    phone: string
    location: string
  },
  experience: IExperience[]
  skills: ISkill[]
  portfolios: IPortfolio[]
  sideProjects: ISideProject[]
}

export interface ICertificate {
  duration?: string
  place?: string
  url?: string
  title?: string
  description?: string
}

export interface ISummary {
  point: string
}
