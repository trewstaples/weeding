document.addEventListener('DOMContentLoaded', function () {
  const startDate = new Date('2025-03-25 00:00:00').getTime()
  const weddingDate = new Date('2025-04-25 00:00:00').getTime()
  const totalPeriod = weddingDate - startDate

  // Функция для склонения слов
  function declensionNum(num, words) {
    const cases = [2, 0, 1, 1, 1, 2]
    return words[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]]
  }

  function updateProgress() {
    const now = new Date().getTime()
    const elapsed = now - startDate
    const progress = Math.min(Math.max((elapsed / totalPeriod) * 100, 0), 100)

    const progressLine = document.querySelector('.progress-line')
    const progressHeart = document.querySelector('.progress-heart')

    progressLine.style.width = `${progress}%`
    progressHeart.style.left = `${progress}%`
  }

  function animateNumber(element, newValue, oldValue, labelElement, words) {
    // Создаем новый элемент для анимации
    const currentElement = element

    // Форматируем число: без ведущего нуля для чисел < 10
    const formattedNewValue = String(newValue)
    const formattedOldValue = oldValue !== null ? String(oldValue) : '0'

    // Добавляем анимацию переворота только если значение изменилось
    if (formattedNewValue !== formattedOldValue) {
      currentElement.classList.add('flip')

      // Меняем значение на половине анимации
      setTimeout(() => {
        currentElement.textContent = formattedNewValue
        // Обновляем склонение
        if (labelElement && words) {
          labelElement.textContent = declensionNum(newValue, words)
        }
      }, 300)

      // Удаляем класс после завершения анимации
      setTimeout(() => {
        currentElement.classList.remove('flip')
      }, 600)
    }
  }

  let previousValues = {
    weeks: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  }

  function updateCountdown() {
    const now = new Date().getTime()
    const difference = weddingDate - now

    const totalHours = Math.floor(difference / (1000 * 60 * 60))
    const totalDays = Math.floor(totalHours / 24)

    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7
    const hours = totalHours % 24
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    const elements = {
      weeks: document.getElementById('weeks'),
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds'),
    }

    const labels = {
      weeks: document.querySelector('[data-label="weeks"]'),
      days: document.querySelector('[data-label="days"]'),
      hours: document.querySelector('[data-label="hours"]'),
      minutes: document.querySelector('[data-label="minutes"]'),
      seconds: document.querySelector('[data-label="seconds"]'),
    }

    const wordForms = {
      weeks: ['неделя', 'недели', 'недель'],
      days: ['день', 'дня', 'дней'],
      hours: ['час', 'часа', 'часов'],
      minutes: ['минута', 'минуты', 'минут'],
      seconds: ['секунда', 'секунды', 'секунд'],
    }

    // Инициализируем начальные значения без ведущих нулей
    if (!elements.weeks.textContent) {
      elements.weeks.textContent = '0'
      elements.days.textContent = '0'
      elements.hours.textContent = '0'
      elements.minutes.textContent = '0'
      elements.seconds.textContent = '0'

      // Добавляем начальную анимацию для всех элементов
      Object.values(elements).forEach(el => {
        el.classList.add('flip')
        setTimeout(() => {
          el.classList.remove('flip')
        }, 600)
      })
    }

    // Обновляем значения с анимацией только если они изменились
    if (weeks !== previousValues.weeks) animateNumber(elements.weeks, weeks, previousValues.weeks, labels.weeks, wordForms.weeks)
    if (days !== previousValues.days) animateNumber(elements.days, days, previousValues.days, labels.days, wordForms.days)
    if (hours !== previousValues.hours) animateNumber(elements.hours, hours, previousValues.hours, labels.hours, wordForms.hours)
    if (minutes !== previousValues.minutes) animateNumber(elements.minutes, minutes, previousValues.minutes, labels.minutes, wordForms.minutes)
    if (seconds !== previousValues.seconds) animateNumber(elements.seconds, seconds, previousValues.seconds, labels.seconds, wordForms.seconds)

    // Сохраняем текущие значения как предыдущие
    previousValues = { weeks, days, hours, minutes, seconds }

    // Update progress bar
    updateProgress()
  }

  // Инициализация и обновление каждую секунду
  updateCountdown()
  setInterval(updateCountdown, 1000)
})

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.map__tab-button')
  const mapFrame = document.querySelector('.map__iframe')
  const resetButton = document.querySelector('.reset-button')
  const searchButton = document.querySelector('.search-button')
  const addressInput = document.querySelector('.address-input')

  const mapUrls = {
    registry_office: 'https://yandex.ru/map-widget/v1/?ll=30.244703%2C59.987105&z=17.62&text=Отдел ЗАГС Приморского района',
    banquet: 'https://yandex.ru/map-widget/v1/?ll=30.244631%2C59.993622&z=17.62&text=Академия Вкуса&pt=30.244631,59.993622',
  }

  const destinations = {
    registry_office: '59.987105,30.244703',
    banquet: '59.993622,30.244631',
  }

  function createRoute(startAddress) {
    if (startAddress.length > 0) {
      startAddress = 'Россия, ' + startAddress
    }

    const activeIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'))
    const destination = activeIndex === 0 ? destinations.registry_office : destinations.banquet

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const userGeo = position.coords.latitude + ',' + position.coords.longitude
            if (startAddress.length > 0) {
              mapFrame.src = `https://yandex.ru/map-widget/v1/?mode=routes&rtext=${startAddress}~${destination}&rtt=auto`
            } else {
              mapFrame.src = `https://yandex.ru/map-widget/v1/?mode=routes&rtext=${userGeo}~${destination}&rtt=auto`
            }
          },
          function (error) {
            if (error.PERMISSION_DENIED) {
              mapFrame.src = `https://yandex.ru/map-widget/v1/?mode=routes&rtext=${startAddress}~${destination}&rtt=auto&z=14`
            }
          }
        )
      }
    } else {
      mapFrame.src = `https://yandex.ru/map-widget/v1/?mode=routes&rtext=${startAddress}~${destination}&rtt=auto&z=14`
    }
  }

  searchButton.addEventListener('click', () => {
    const address = addressInput.value.trim()
    createRoute(address)
  })

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')

      const address = addressInput.value.trim()

      if (address.length > 0) {
        createRoute(address)
      } else {
        mapFrame.src = index === 0 ? mapUrls.registry_office : mapUrls.banquet
      }
    })
  })

  resetButton.addEventListener('click', () => {
    const activeIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'))
    addressInput.value = ''
    mapFrame.src = activeIndex === 0 ? mapUrls.registry_office : mapUrls.banquet
  })
})

function handleScrollAnimation() {
  const sections = document.querySelectorAll('section')
  const fadeElements = document.querySelectorAll('.fade-up')

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  sections.forEach(section => {
    observer.observe(section)
  })

  fadeElements.forEach(element => {
    observer.observe(element)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation()
})
