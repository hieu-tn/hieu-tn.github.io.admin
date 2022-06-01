import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Image from 'next/image'
import useSwr from 'swr'
import { IExperienceResponse } from '@models/experience.api.models'
import { ISkillsResponse } from '@models/skills.api.models'
import { IPortfoliosResponse } from '@models/portfolios.api.models'
import { ISideProjectsResponse } from '@models/projects.api.models'
import { ICertificate, IHomeProps, ISummary } from '@models/home.page.models'
import styles from '@styles/pages/home.module.scss'
// @ts-ignore
import { attributes as homeAttributes } from '@contents/home.md'
// @ts-ignore
import { attributes as contactAttributes } from '@contents/contact.md'
import { markdownToHtml } from '@lib/utils.lib'


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      designation: homeAttributes.designation || null,
      overview: homeAttributes.overview || null,
      heroImage: homeAttributes.heroImage || null,
      certificates: homeAttributes.certificates || null,
      summary: homeAttributes.summary || null,
      contact: {
        email: contactAttributes.email || null,
        phone: contactAttributes.phone || null,
        location: contactAttributes.location || null,
      },
    }
  }
}

const Home: NextPage<IHomeProps> = (data) => {
  const experience: IExperienceResponse[] = useGetExperience()
  const skills: ISkillsResponse[] = useGetSkills()
  const portfolios: IPortfoliosResponse[] = useGetPortfolios()
  const sideProjects: ISideProjectsResponse[] = useGetSideProjects()

  const gap = new Date(Date.now() - new Date(process.env.CAREER_BEGINNING || '').valueOf())
  const exp = Math.abs(gap.getUTCFullYear() - 1970)

  return (
    <>
      <section id="about" className={`${styles.section} ${styles.sectionAbout}`}>
        <h2>about</h2>
      </section>

      <section id="resume" className={`${styles.section} ${styles.sectionResume}`}>
        <div className="container">
          <div className="row">
            <div className={`grids ${styles.grids} ${styles.gridHeadline}`}>
              <h2>Resume</h2>
            </div>
            <div className={`grids ${styles.grids} ${styles.gridDescription} text-right`}>
              <p>{exp}+ Years of Experience</p>
            </div>
            <div className={`grids ${styles.grids} ${styles.gridBody}`}>

              <h3 className={styles.title}>Summary</h3>
              <div>
                {data.summary && data.summary.map((s: ISummary) => (
                  <p key={s.point}>- {s.point}</p>
                ))}
              </div>

              <div className={styles.dividerSpace}></div>

              <h3 className={styles.title}>Skills</h3>
              <div className="skills-info">
                {skills && skills.map((skill: ISkillsResponse) => (
                  <p key={skill.slug}><i>- {skill.frontmatter.category}:</i> {skill.frontmatter.items}</p>
                ))}
                {/*{skills && skills.map((skill: ISkillsResponse) => (*/}
                {/*  <div id={skill.frontmatter.} className="skill-item" key={skill.frontmatter.id}>*/}
                {/*    <h4 className="skill__title">{skill.frontmatter.title}</h4>*/}
                {/*    <p className="skill__description">{skill.frontmatter.description}</p>*/}
                {/*    <div className="skill__percentage" name={skill.frontmatter.id}>*/}
                {/*      <div style={{width: skill.frontmatter.percentage + '%'}} className="active"></div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*))}*/}
              </div>

              <div className={styles.dividerSpace}></div>

              <h3 className={styles.title}>Experience</h3>
              <div>
                {experience && experience.map((exp: IExperienceResponse) => (
                  <div className={styles.timelineItem} key={exp.frontmatter.duration}>
                    <div className={styles.leftPart}>
                      <p className={styles.timelineDuration}>{exp.frontmatter.duration}</p>
                      <p className={styles.timelinePlace}>
                        <a href={exp.frontmatter.url} target="_blank" rel="noreferrer">
                          {exp.frontmatter.place}
                        </a>
                      </p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.rightPart}>
                      <h4 className={styles.timelineTitle}>{exp.frontmatter.designation}</h4>
                      <ul>
                        {exp.frontmatter.jobDescription && exp.frontmatter.jobDescription.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.dividerSpace}></div>

              <h3 className={styles.title}>education</h3>
              <div>
                {data.certificates && data.certificates.map((cert: ICertificate) => (
                  <div className={styles.timelineItem} key={cert.duration}>
                    <div className={styles.leftPart}>
                      <p className={styles.timelineDuration}>{cert.duration}</p>
                      <p className={styles.timelinePlace}>
                        <a href={cert.url} target="_blank" rel="noreferrer">
                          {cert.place}
                        </a>
                      </p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.rightPart}>
                      <h4 className={styles.timelineTitle}>{cert.title}</h4>
                      <p>{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.dividerSpace}></div>

              <h3 className={styles.title}>side projects</h3>
              {sideProjects && sideProjects.map((p: ISideProjectsResponse) => (
                <div key={p.slug}>
                  <p><strong>{p.frontmatter.title}</strong></p>
                  <div dangerouslySetInnerHTML={{__html: p.content}} />
                  <p>Available at: <a href={p.frontmatter.url}>{p.frontmatter.url}</a></p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className={`${styles.section} ${styles.sectionPortfolio}`}>
        <div className="container">
          <div className="row">
            <div className={`grids ${styles.grids} ${styles.gridHeadline}`}>
              <h2>Portfolio</h2>
            </div>
            <div className={`grids ${styles.grids} ${styles.gridDescription} text-right`}>
              <p>My Works</p>
            </div>
            <div className={`grids ${styles.grids} ${styles.gridBody}`}>
              <div className={styles.portfolios}>
                {portfolios && portfolios.map((portfolio: IPortfoliosResponse) => (
                  <div className={styles.portfolioItem} key={portfolio.frontmatter.title}>
                    <h4 className={styles.portfolioTitle}>
                      <a href={portfolio.frontmatter.url} target="_blank" rel="noreferrer">
                        {portfolio.frontmatter.title}
                      </a>
                    </h4>
                    <p className={styles.portfolioDuration}><i>{portfolio.frontmatter.duration}</i></p>
                    <p><i>Team members:</i> {portfolio.frontmatter.members}</p>
                    <p><i>Stacks:</i> {portfolio.frontmatter.stacks}</p>
                    {/*<PostContent content={portfolio.html} className="portfolio__description" />*/}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.sectionContact}`}>
        <div className="container">
          <div className="row">
            <div className={`grids ${styles.grids} ${styles.gridHeadline}`}>
              <h2>Contact</h2>
            </div>
            <div className={`grids ${styles.grids} ${styles.gridDescription} text-right`}>
              <p>Get in Touch</p>
            </div>
            <div className={`grids ${styles.grids} ${styles.gridBody}`}>
              <p>Thank you for watching.</p>
              <p>If you are interested:</p>
              <div>
                <a href={data.metadata.github} target="_blank" rel="noreferrer">
                  <span className={styles.helper}></span>
                  <i className="icon-github"></i>
                </a>
                <a href={data.metadata.linkedin} target="_blank" rel="noreferrer">
                  <span className={styles.helper}></span>
                  <i className="icon-linkedin"></i>
                </a>
                <a href={`mailto:${data.metadata.email}`} target="_blank" rel="noreferrer">
                  <span className={styles.helper}></span>
                  <i className="icon-plane"></i>
                </a>
                <a href={data.metadata.map} target="_blank" rel="noreferrer">
                  <span className={styles.helper}></span>
                  <i className="icon-location"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

const fetcher = (url: string) => fetch(url).then((res: Response) => res.json())

const useGetExperience = (): IExperienceResponse[] => {
  const {data, error} = useSwr('/api/experience', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}

const useGetSkills = (): ISkillsResponse[] => {
  const {data, error} = useSwr('/api/skills', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}


const useGetPortfolios = (): IPortfoliosResponse[] => {
  const {data, error} = useSwr('/api/portfolios', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}

const useGetSideProjects = (): ISideProjectsResponse[] => {
  const {data, error} = useSwr('/api/side-projects', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}
