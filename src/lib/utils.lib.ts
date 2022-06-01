import remark from 'remark'
import html from 'remark-html'


export const scrollToTarget = (target: any) => {
  target = document.querySelector(target)
  if (!target) return

  const headerHeight = document.getElementById('site-header')?.clientHeight || 0
  // target.scrollIntoView({
  //   behavior: 'smooth'
  // })
  window.scrollTo({
    top: target.offsetTop - headerHeight,
    behavior: 'smooth'
  })
}

export const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const customLoader = ({ src }: {src: string}) => {
  return src
}
