// Устанавливаем дату свадьбы
const weddingDate = new Date('2025-04-25 00:00:00').getTime()

function updateCountdown() {
  const now = new Date().getTime()
  const difference = weddingDate - now

  const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7))
  const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
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
