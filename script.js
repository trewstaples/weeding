document.addEventListener('DOMContentLoaded', function () {
  const weddingDate = new Date('2025-04-25 00:00:00').getTime()

  function animateNumber(element, newValue) {
    // Создаем новый элемент для анимации
    const currentElement = element
    const newElement = currentElement.cloneNode(true)

    // Устанавливаем новое значение с ведущим нулем
    newElement.textContent = String(newValue).padStart(2, '0')
    newElement.classList.add('flip-in')

    // Добавляем анимацию для текущего элемента
    currentElement.classList.add('flip-out')

    // После завершения анимации
    setTimeout(() => {
      currentElement.textContent = newElement.textContent
      currentElement.classList.remove('flip-out')
      currentElement.classList.add('flip-in')
    }, 300)
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

    // Инициализируем начальные значения с ведущими нулями
    if (!elements.weeks.textContent) elements.weeks.textContent = '00'
    if (!elements.days.textContent) elements.days.textContent = '00'
    if (!elements.hours.textContent) elements.hours.textContent = '00'
    if (!elements.minutes.textContent) elements.minutes.textContent = '00'
    if (!elements.seconds.textContent) elements.seconds.textContent = '00'

    // Сохраняем предыдущие значения
    const previousValues = {
      weeks: elements.weeks.textContent,
      days: elements.days.textContent,
      hours: elements.hours.textContent,
      minutes: elements.minutes.textContent,
      seconds: elements.seconds.textContent,
    }

    // Обновляем значения с анимацией только если они изменились
    if (String(weeks).padStart(2, '0') !== previousValues.weeks) animateNumber(elements.weeks, weeks)
    if (String(days).padStart(2, '0') !== previousValues.days) animateNumber(elements.days, days)
    if (String(hours).padStart(2, '0') !== previousValues.hours) animateNumber(elements.hours, hours)
    if (String(minutes).padStart(2, '0') !== previousValues.minutes) animateNumber(elements.minutes, minutes)
    if (String(seconds).padStart(2, '0') !== previousValues.seconds) animateNumber(elements.seconds, seconds)
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
