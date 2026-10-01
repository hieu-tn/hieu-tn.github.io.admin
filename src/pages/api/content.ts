import type {NextApiRequest, NextApiResponse} from "next"
import {getAllExperience} from "@lib/experience.lib"
import {ISkill} from "@models/skills.models"
import {getAllSkills} from "@lib/skills.lib"
import {IPortfolio} from "@models/portfolios.models"
import {getAllPortfolios} from "@lib/portfolios.lib"
import {ISideProject} from "@models/projects.models"
import {getAllSideProjects} from "@lib/projects.lib"
import {markdownToHtml} from "@lib/utils.lib"
import {getMetadata} from "@lib/metadata.lib"

const longDash = "--------------------------------------------------\n"
const shortDash = "------------------------\n"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let metadata = "METADATA:\n"
  for (let [key, value] of Object.entries(getMetadata())) {
    metadata += `${key}: ${value}\n`
  }

  let experience = "EXPERIENCE:\n"
  for (let item of getAllExperience()) {
    if (!item.frontmatter.active) {
      continue
    }
    experience += `company: ${item.frontmatter.place}\n`
    experience += `website: ${item.frontmatter.url}\n`
    experience += `duration: ${item.frontmatter.duration}\n`
    experience += `designation: ${item.frontmatter.designation}\n`
    experience += `duties: \n`
    experience += `${item.frontmatter.jobDescription?.join("\n")}\n`
    experience += shortDash
  }

  let skills = "SKILLS:\n"
  for (let item of getAllSkills()) {
    if (!item.frontmatter.active) {
      continue
    }
    skills += `${item.frontmatter.category}: ${item.frontmatter.items}\n`
  }

  let portfolios = "PORTFOLIOS:\n"
  for (let item of getAllPortfolios()) {
    if (!item.frontmatter.active) {
      continue
    }
    const duties = item.frontmatter.duties.map(duty => duty.point)
    portfolios += `project: ${item.frontmatter.title}\n`
    portfolios += `website: ${item.frontmatter.url}\n`
    portfolios += `duration: ${item.frontmatter.duration}\n`
    portfolios += `stacks: ${item.frontmatter.stacks}\n`
    portfolios += `duties:\n`
    portfolios += `${duties.join("\n")}\n`
    portfolios += shortDash
  }

  let sideProjects = "SIDE PROJECT:\n"
  for (let item of getAllSideProjects()) {
    if (!item.frontmatter.active) {
      continue
    }
    const duties = item.frontmatter.duties.map(duty => duty.point)
    sideProjects += `title: ${item.frontmatter.title}\n`
    sideProjects += await markdownToHtml(item.content)
    sideProjects += `website: ${item.frontmatter.url}\n`
    sideProjects += `duties:\n`
    sideProjects += `${duties.join("\n")}\n`
    portfolios += shortDash
  }

  const persona = metadata + longDash + experience + longDash + skills + longDash + portfolios + longDash + sideProjects
  res.status(200).send(persona)
}
