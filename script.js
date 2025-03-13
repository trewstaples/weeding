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
