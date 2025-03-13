document.addEventListener('DOMContentLoaded', function () {
  // Устанавливаем дату свадьбы
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

  // Обновляем счётчик каждую секунду
  setInterval(updateCountdown, 1000)
  updateCountdown()
})

document.addEventListener('DOMContentLoaded', () => {
  // Находим все кнопки табов
  const tabButtons = document.querySelectorAll('.tab-button')
  const tabPanes = document.querySelectorAll('.tab-pane')

  // Добавляем обработчик для каждой кнопки
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Убираем активный класс у всех кнопок
      tabButtons.forEach(btn => {
        btn.classList.remove('active')
      })

      // Убираем активный класс у всех панелей
      tabPanes.forEach(pane => {
        pane.classList.remove('active')
      })

      // Добавляем активный класс нажатой кнопке
      button.classList.add('active')

      // Находим и показываем соответствующую панель
      const tabId = button.getAttribute('data-tab')
      const targetPane = document.getElementById(tabId)
      if (targetPane) {
        targetPane.classList.add('active')
      }
    })
  })
})
