export const activeMenu = (href: string) => {
  let element = document.querySelector(`[data-href="${href}"]`)
  if (!element) return

  if (element.parentElement?.classList.contains('active')) return

  let siblings = getSiblings(element.parentElement)
  for (let sibling of siblings)
    sibling.classList.remove('active')

  element.parentElement?.classList.add('active')
  window.history.replaceState(null, '', href)
}

export const getSiblings = (el: any, filter = null) => {
  let siblings = []
  el = el.parentNode.firstChild
  do {
    // only God knows
    // if (!filter || filter(el)) siblings.push(el)
    siblings.push(el)
    el = el.nextSibling
  } while (el)
  return siblings
}

export const scrollToTarget = (target: any) => {
  target = document.querySelector(target)
  if (!target) return

  if (window.innerWidth < 992) {
    let headerMobileHeight = document.getElementsByClassName('mobile-visible')[0].clientHeight
    window.scrollTo({
      left: 0,
      top: target.offsetTop - headerMobileHeight,
      behavior: 'smooth'
    })
  } else {
    target.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

export const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}
