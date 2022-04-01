import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next'
import useSwr from 'swr'
import { IExperienceResponse } from '@models/experience.api.models'
import { ISkillsResponse } from '@models/skills.api.models'
import { IPortfoliosResponse } from '@models/portfolios.api.models'
import { ICertificate, IHomeProps, ISummary } from '@models/home.page.models'
// @ts-ignore
import { attributes as homeAttributes } from '@contents/home.md'
// @ts-ignore
import { attributes as contactAttributes } from '@contents/contact.md'
import { useEffect } from 'react'
import { activeMenu, scrollToTarget } from '@lib/utils.lib'


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
  const experience: IExperienceResponse[] = getExperience()
  const skills: ISkillsResponse[] = getSkills()
  const portfolios: IPortfoliosResponse[] = getPortfolios()

  const gap = new Date(Date.now() - new Date(process.env.CAREER_BEGINNING || '').valueOf())
  const exp = Math.abs(gap.getUTCFullYear() - 1970)

  return (
    <div className="page-home">
      <section className="section section-overviews bg--mine-shaft1" id="about" data-target="#about">
        <div className="container">
          <div className="row">
            <div className="grids grid-avatar">
              <div className="avatar-container">
                <img className="avatar" src="images/logo.jpg" alt="logo"/>
              </div>
            </div>
            <div className="grids grid-content">
              <p>{data.designation}</p>
              <h1>{data.metadata.author}</h1>
              <p>{data.overview}</p>
              {data.summary && data.summary.map((s: ISummary) => (
                <p key={s.point}>- {s.point}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-resume" id="resume" data-target="#resume">
        <div className="container">
          <div className="row">
            <div className="grids grid-headline">
              <h1>Resume</h1>
            </div>
            <div className="grids grid-description text-right cl--silver">
              <p>{exp} Years of Experience</p>
            </div>
            <div className="grids grid-content">
              <h3 className="title">Experience</h3>
              <div className="timeline">
                {experience && experience.map((exp: IExperienceResponse) => (
                  <div className="timeline-item" key={exp.frontmatter.duration}>
                    <div className="left-part">
                      <p className="timeline__duration">{exp.frontmatter.duration}</p>
                      <p className="timeline__place">
                        <a href={exp.frontmatter.url} target="_blank" rel="noopener noreferrer">
                          {exp.frontmatter.place}
                        </a>
                      </p>
                    </div>
                    <div className="divider"></div>
                    <div className="right-part">
                      <h4 className="timeline__title">{exp.frontmatter.place}</h4>
                      <ul>
                        {exp.frontmatter.jobDescription && exp.frontmatter.jobDescription.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider-space"></div>

              <h3 className="title">education</h3>
              <div className="timeline">
                {data.certificates && data.certificates.map((cert: ICertificate) => (
                  <div className="timeline-item" key={cert.duration}>
                    <div className="left-part">
                      <p className="timeline__duration">{cert.duration}</p>
                      <p className="timeline__place">
                        <a href={cert.url} target="_blank" rel="noopener noreferrer">
                          {cert.place}
                        </a>
                      </p>
                    </div>
                    <div className="divider"></div>
                    <div className="right-part">
                      <h4 className="timeline__title">{cert.title}</h4>
                      <p>{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider-space"></div>

              <h3 className="title">Skills</h3>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section section-portfolios bg--mine-shaft1" id="portfolio" data-target="#portfolio">
        <div className="container">
          <div className="row">
            <div className="grids grid-headline">
              <h1>Portfolio</h1>
            </div>
            <div className="grids grid-description text-right cl--silver">
              <p>My Works</p>
            </div>
            <div className="grids grid-content">
              <div className="portfolios">
                {portfolios && portfolios.map((portfolio: IPortfoliosResponse) => (
                  <div className="portfolio-item" key={portfolio.frontmatter.title}>
                    <h4 className="portfolio__title">
                      <a href={portfolio.frontmatter.url} target="_blank" rel="noopener noreferrer">
                        {portfolio.frontmatter.title}
                      </a>
                    </h4>
                    <p className="portfolio__duration"><i>{portfolio.frontmatter.duration}</i></p>
                    <p className="portfolio__members"><i>Team members:</i> {portfolio.frontmatter.members}</p>
                    <p className="portfolio__stacks"><i>Stacks:</i> {portfolio.frontmatter.stacks}</p>
                    {/*<PostContent content={portfolio.html} className="portfolio__description" />*/}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-contact" id="contact" data-target="#contact">
        <div className="container">
          <div className="row">
            <div className="grids grid-headline">
              <h1>Contact</h1>
            </div>
            <div className="grids grid-description text-right cl--silver">
              <p>Get in Touch</p>
            </div>
            <div className="grids grid-content">
              <p>Thank you for watching.</p>
              <p>If you are interested, please do not hesitate to get a brief of my information</p>
              {/*<p><button className="download-cv" onClick={downloadPDF.bind(this, PDF)}>Download CV</button></p>*/}
              <p><a className="download-cv" href={data.metadata.pdf} target="_blank">Download CV</a></p>
              <p>or contact me via</p>
              <div className="row">
                <div className="grids contact-item text-center">
                  <a className="contact-item__inner" href={'tel:' + data.metadata.tel}>
                    <i className=" icon-bullhorn"></i>
                    <h4>{data.contact.phone}</h4>
                  </a>
                </div>
                <div className=" grids contact-item text-center">
                  <a className=" contact-item__inner" href={data.metadata.map}>
                    <i className="icon-map-pin-stroke"></i>
                    <h4>{data.contact.location}</h4>
                  </a>
                </div>
                <div className=" grids contact-item text-center">
                  <a className=" contact-item__inner" href={'mailto:' + data.metadata.email}>
                    <i className=" icon-paperplane">
                    </i>
                    <h4>{data.contact.email}</h4>
                  </a>
                </div>
                <div className=" grids contact-item text-center">
                  <a className=" contact-item__inner" href={'mailto:' + data.metadata.email}>
                    <i className=" icon-power">
                    </i>
                    <h4>Freelance Available</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

const fetcher = (url: string) => fetch(url).then((res: Response) => res.json())

const getExperience = (): IExperienceResponse[] => {
  const {data, error} = useSwr('/api/experience', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}

const getSkills = (): ISkillsResponse[] => {
  const {data, error} = useSwr('/api/skills', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}


const getPortfolios = (): IPortfoliosResponse[] => {
  const {data, error} = useSwr('/api/portfolios', fetcher)
  if (error) {
    console.log(error)
    return error
  }
  return data
}
