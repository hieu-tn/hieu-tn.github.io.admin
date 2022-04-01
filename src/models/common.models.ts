export interface IMetadata {
  siteURL: string
  title: string
  description: string
  author: string
  keywords: string
  email: string
  tel: string
  map: string
  pdf: string
  github: string
  linkedin: string
}

export interface IPageProps {
  metadata: IMetadata
}

export interface ILayoutProps {
  metadata: IMetadata
  children: any
}

export interface IHeaderProps {
  metadata: IMetadata
}
