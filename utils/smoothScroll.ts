export const smoothScroll = (target: string) => {
  const element = document.querySelector(target)
  if (!element) return

  const headerOffset = 80 // Height of the navigation bar
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Initialize scroll spy for section highlighting
export const initScrollSpy = () => {
  const sections = document.querySelectorAll('section')
  const navItems = document.querySelectorAll('nav a')

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.id

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove('text-primary-400')
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('text-primary-400')
          }
        })
      }
    })
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
} 