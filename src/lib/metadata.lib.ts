import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { IMetadata } from '@models/common.models'


export const getMetadata = (): IMetadata => {
  const fullPath = join(process.cwd(), 'contents', 'metadata.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data} = matter(fileContents)

  return data as IMetadata
}
