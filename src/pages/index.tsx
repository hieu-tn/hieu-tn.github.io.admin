import type { NextPage } from 'next'
import Layout from '@core/Layout'
import { attributes as homeAttributes } from '@contents/home.md'
import { attributes as contactAttributes } from '@contents/contact.md'
import { attributes as expAttributes } from '@contents/experience/*.md'

const Home: NextPage = () => {
  console.log(expAttributes)
  return (
    <>
      <Layout>

        <section className="section-intro"></section>

        <section className="section-resume"></section>

        <section className="section-portfolio">
          <div className="container">
            <div className="row">
              <div className="grids grid-headline">
                <h2>Portfolio</h2>
              </div>
              <div className="grids grid-description">
                <p>My works</p>
              </div>
              <div className="grids gird-body">
                <h3 className={`title`}>Experience</h3>
                <div className={`timeline`}>
                  {experience && experience.map(({node: exp}) => (
                    <div className={`timeline-item`} key={exp.frontmatter.period}>
                      <div className={`left-part`}>
                        <p className={`timeline__period`}>{exp.frontmatter.period}</p>
                        <p className={`timeline__place`}><a href={exp.frontmatter.url} target={`_blank`}
                                                            rel={`noopener noreferrer`}>{exp.frontmatter.place}</a></p>
                      </div>
                      <div className={`divider`}></div>
                      <div className={`right-part`}>
                        <h4 className={`timeline__title`}>{exp.frontmatter.title}</h4>
                        <ul>
                          {exp.frontmatter.jobDescription && exp.frontmatter.jobDescription.map(item => (
                            <li key={item.point}>{item.point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-contact">
          <div className="container">
            <div className="row">
              <div className="grids grid-headline">
                <h2>Contact</h2>
              </div>
              <div className="grids grid-description">
                <p>Get in touch</p>
              </div>
              <div className="grids grid-body">
                <p>Thank you for watching.</p>
                <p>If you are interested, please do not hesitate to get a brief of my information</p>
                <p><a className="download-cv" href={contactAttributes.cv} target="_blank">Download CV</a></p>
                <p>or contact me via</p>
                <div className="row">
                  <div className="grids contact-item text-center">
                    <a className="contact-item__inner" href={contactAttributes.linkPhone}>
                      <i className="icon-bullhorn"></i><h4>{contactAttributes.phone}</h4>
                    </a>
                  </div>
                  <div className="grids contact-item text-center">
                    <a className="contact-item__inner" href={contactAttributes.linkLocation}>
                      <i className="icon-map-pin-stroke"></i><h4>{contactAttributes.location}</h4>
                    </a>
                  </div>
                  <div className="grids contact-item text-center">
                    <a className="contact-item__inner" href={contactAttributes.linkEmail}>
                      <i className="icon-paperplane"></i><h4>{contactAttributes.email}</h4>
                    </a>
                  </div>
                  <div className="grids contact-item text-center">
                    <a className="contact-item__inner" href={contactAttributes.linkEmail}>
                      <i className="icon-power"></i><h4>Freelance Available</h4>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}

export default Home
