import { IPageProps } from '@models/common.models'


export interface IHomeProps extends IPageProps {
  designation: string
  overview: string
  certificates: ICertificate[]
  summary: ISummary[]
  contact: {
    email: string
    phone: string
    location: string
  }
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
