import "./_bootstrap.js"

// TODO: Does not work for nested links
var pathname = window.location.pathname;
document.querySelector(`.navbar-nav li a[href="${pathname}"]`)?.classList?.add('active');


// Scroll Smooth
document.querySelectorAll(".smoothscroll").forEach(item => {
    item.addEventListener('click', e => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    const offsetTop = document.querySelector(href).offsetTop
    scroll({
      top: offsetTop,
      behavior: 'smooth'
    })
    return false;
  })
})
