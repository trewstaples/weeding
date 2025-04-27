document.addEventListener('DOMContentLoaded', function () {
  const weddingDate = new Date('2025-04-25 12:00:00').getTime()

  // Функция для склонения слов
  function declensionNum(num, words) {
    const cases = [2, 0, 1, 1, 1, 2]
    return words[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]]
  }

  // Изменено: вместо прогресса теперь просто визуальное оформление
  function updateProgress() {
    const progressLine = document.querySelector('.progress-line')
    const progressHeart = document.querySelector('.progress-heart')

    if (progressLine && progressHeart) {
      progressLine.style.width = '100%'
      progressHeart.style.left = '100%'
    }
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
    years: null,
    months: null,
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  }

  // Изменено: обновляем счетчик для отображения времени после свадьбы
  function updateTimeAfterWedding() {
    const now = new Date().getTime()
    const difference = now - weddingDate

    // Если свадьба еще не наступила, показываем нули
    if (difference < 0) {
      return
    }

    const totalSeconds = Math.floor(difference / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const totalDays = Math.floor(totalHours / 24)

    // Расчет прошедших лет и месяцев
    const weddingDateObj = new Date(weddingDate)
    const currentDate = new Date()

    let years = currentDate.getFullYear() - weddingDateObj.getFullYear()
    let months = currentDate.getMonth() - weddingDateObj.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    // Корректировка дней
    const days = totalDays - years * 365 - Math.floor(months * 30.4)
    const hours = totalHours % 24
    const minutes = totalMinutes % 60
    const seconds = totalSeconds % 60

    const elements = {
      years: document.getElementById('years') || document.getElementById('weeks'),
      months: document.getElementById('months') || document.getElementById('days'),
      days: document.getElementById('days') || document.getElementById('hours'),
      hours: document.getElementById('hours') || document.getElementById('minutes'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds'),
    }

    const labels = {
      years: document.querySelector('[data-label="years"]') || document.querySelector('[data-label="weeks"]'),
      months: document.querySelector('[data-label="months"]') || document.querySelector('[data-label="days"]'),
      days: document.querySelector('[data-label="days"]') || document.querySelector('[data-label="hours"]'),
      hours: document.querySelector('[data-label="hours"]') || document.querySelector('[data-label="minutes"]'),
      minutes: document.querySelector('[data-label="minutes"]'),
      seconds: document.querySelector('[data-label="seconds"]'),
    }

    // Обновим названия меток
    if (labels.years && labels.years.dataset.label === 'weeks') {
      labels.years.dataset.label = 'years'
    }
    if (labels.months && labels.months.dataset.label === 'days') {
      labels.months.dataset.label = 'months'
    }

    const wordForms = {
      years: ['год', 'года', 'лет'],
      months: ['месяц', 'месяца', 'месяцев'],
      days: ['день', 'дня', 'дней'],
      hours: ['час', 'часа', 'часов'],
      minutes: ['минута', 'минуты', 'минут'],
      seconds: ['секунда', 'секунды', 'секунд'],
    }

    // Инициализируем начальные значения без ведущих нулей
    if (elements.years && !elements.years.textContent) {
      Object.keys(elements).forEach(key => {
        if (elements[key]) {
          elements[key].textContent = '0'
        }
      })

      // Добавляем начальную анимацию для всех элементов
      Object.values(elements).forEach(el => {
        if (el) {
          el.classList.add('flip')
          setTimeout(() => {
            el.classList.remove('flip')
          }, 600)
        }
      })
    }

    // Обновляем значения с анимацией только если они изменились
    if (elements.years && years !== previousValues.years) animateNumber(elements.years, years, previousValues.years, labels.years, wordForms.years)
    if (elements.months && months !== previousValues.months) animateNumber(elements.months, months, previousValues.months, labels.months, wordForms.months)
    if (elements.days && days !== previousValues.days) animateNumber(elements.days, days, previousValues.days, labels.days, wordForms.days)
    if (elements.hours && hours !== previousValues.hours) animateNumber(elements.hours, hours, previousValues.hours, labels.hours, wordForms.hours)
    if (elements.minutes && minutes !== previousValues.minutes) animateNumber(elements.minutes, minutes, previousValues.minutes, labels.minutes, wordForms.minutes)
    if (elements.seconds && seconds !== previousValues.seconds) animateNumber(elements.seconds, seconds, previousValues.seconds, labels.seconds, wordForms.seconds)

    // Сохраняем текущие значения как предыдущие
    previousValues = { years, months, days, hours, minutes, seconds }

    // Обновляем визуальное оформление
    updateProgress()
  }

  // Инициализация и обновление каждую секунду
  updateTimeAfterWedding()
  setInterval(updateTimeAfterWedding, 1000)
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
