const toggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.nav')
const year = document.getElementById('year')
const form = document.getElementById('contact-form')
const header = document.querySelector('.site-header')

if (toggle && nav) {
	toggle.addEventListener('click', () => {
		nav.classList.toggle('open')
		toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false')
	})

	document.addEventListener('click', (e) => {
		if (!nav.contains(e.target) && !toggle.contains(e.target)) {
			nav.classList.remove('open')
			toggle.setAttribute('aria-expanded', 'false')
		}
	})
}

document.querySelectorAll('.nav a').forEach(a => {
	a.addEventListener('click', e => {
		const href = a.getAttribute('href')
		if (href && href.startsWith('#')) {
			e.preventDefault()
			const target = document.querySelector(href)
			if (target) {
				const headerHeight = header?.offsetHeight || 0
				const targetPosition = target.offsetTop - headerHeight - 20
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				})
			}
			nav.classList.remove('open')
			toggle.setAttribute('aria-expanded', 'false')
		}
	})
})

if (year) year.textContent = String(new Date().getFullYear())

if (form) {
	form.addEventListener('submit', e => {
		e.preventDefault()
		const data = {
			nome: document.getElementById('nome')?.value?.trim() || '',
			email: document.getElementById('email')?.value?.trim() || '',
			mensagem: document.getElementById('mensagem')?.value?.trim() || ''
		}
		if (!data.nome || !data.email || !data.mensagem) {
			alert('⚠️ Por favor, preencha todos os campos.')
			return
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			alert('⚠️ Por favor, insira um e-mail válido.')
			return
		}
		const whatsappNumber = '5562994496323'
		const message = `Olá! Meu nome é ${data.nome}.\n\nEmail: ${data.email}\n\nMensagem: ${data.mensagem}`
		const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
		window.open(whatsappURL, '_blank')
		form.reset()
	})
}

if (header) {
	const setScrolled = () => {
		if (window.scrollY > 10) {
			header.classList.add('scrolled')
		} else {
			header.classList.remove('scrolled')
		}
	}
	setScrolled()
	window.addEventListener('scroll', setScrolled, { passive: true })
}

const reveals = document.querySelectorAll('.reveal')
if (reveals.length) {
	const obs = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.classList.add('show')
				}, entry.target.dataset.delay || 0)
				obs.unobserve(entry.target)
			}
		})
	}, { 
		threshold: 0.1, 
		rootMargin: '0px 0px -50px 0px' 
	})

	reveals.forEach((el, index) => {
		el.dataset.delay = index * 50
		obs.observe(el)
	})
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href')
		if (href === '#') return
		
		const target = document.querySelector(href)
		if (target) {
			e.preventDefault()
			const headerHeight = header?.offsetHeight || 0
			const targetPosition = target.offsetTop - headerHeight - 20
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			})
		}
	})
})
