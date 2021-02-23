import "./_bootstrap.js"

// TODO: Does not work for nested links
var pathname = window.location.pathname;
const navLinks = document.querySelector(`.navbar-nav li a[href="${pathname}"]`)?.classList?.add('active');
