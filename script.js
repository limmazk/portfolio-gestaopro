const toggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.nav')
const year = document.getElementById('year')
const form = document.getElementById('contact-form')
const header = document.querySelector('.site-header')

if (toggle && nav) toggle.addEventListener('click', () => {
	nav.classList.toggle('open')
	toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false')
})

document.querySelectorAll('.nav a').forEach(a => {
	a.addEventListener('click', e => {
		const href = a.getAttribute('href')
		if (href && href.startsWith('#')) {
			e.preventDefault()
			document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			nav.classList.remove('open')
			toggle.setAttribute('aria-expanded', 'false')
		}
	})
})


if (year) year.textContent = String(new Date().getFullYear())

if (form) form.addEventListener('submit', e => {
	e.preventDefault()
	const data = {
		nome: document.getElementById('nome')?.value?.trim() || '',
		email: document.getElementById('email')?.value?.trim() || '',
		mensagem: document.getElementById('mensagem')?.value?.trim() || ''
	}
	if (!data.nome || !data.email || !data.mensagem) {
		alert('Preencha todos os campos.')
		return
	}
	alert('Mensagem enviada! Entraremos em contato em breve.')
	form.reset()
})

if (header) {
	const setScrolled = () => {
		if (window.scrollY > 6) header.classList.add('scrolled')
		else header.classList.remove('scrolled')
	}
	setScrolled()
	window.addEventListener('scroll', setScrolled, { passive: true })
}

const reveals = document.querySelectorAll('.reveal')
if (reveals.length) {
	const obs = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show')
				obs.unobserve(entry.target)
			}
		})
	}, { threshold: .15, rootMargin: '0px 0px -40px 0px' })
	reveals.forEach(el => obs.observe(el))
}