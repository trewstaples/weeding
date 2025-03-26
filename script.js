document.addEventListener('DOMContentLoaded', function () {
  const weddingDate = new Date('2025-04-25 00:00:00').getTime()

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

    document.getElementById('weeks').innerText = weeks
    document.getElementById('days').innerText = days
    document.getElementById('hours').innerText = hours
    document.getElementById('minutes').innerText = minutes
    document.getElementById('seconds').innerText = seconds
  }

  setInterval(updateCountdown, 1000)
  updateCountdown()
})

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.map__tab-button')
  const mapFrame = document.querySelector('.map__iframe')
  const resetButton = document.querySelector('.reset-button')

  const mapUrls = {
    registry_office: 'https://yandex.ru/map-widget/v1/?ll=30.244703%2C59.987105&z=17.62&text=Отдел ЗАГС Приморского района',
    banquet: 'https://yandex.ru/map-widget/v1/?ll=30.244631%2C59.993622&z=17.62&text=Академия Вкуса&pt=30.244631,59.993622',
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')
      mapFrame.src = index === 0 ? mapUrls.registry_office : mapUrls.banquet
    })
  })

  // Обработчик для кнопки сброса
  resetButton.addEventListener('click', () => {
    const activeIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'))
    mapFrame.src = activeIndex === 0 ? mapUrls.registry_office : mapUrls.banquet
  })
})
