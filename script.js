document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const ampmElement = document.getElementById('ampm');
  const weekdayElement = document.getElementById('weekday');
  const monthElement = document.getElementById('month');
  const dayElement = document.getElementById('day');
  const yearElement = document.getElementById('year');
  const currentYearElement = document.getElementById('current-year');
  const themeToggle = document.getElementById('theme-toggle');
  const formatToggle = document.getElementById('format-toggle');

  // Constants
  const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // State
  let is24HourFormat = false;
  let currentTheme = localStorage.getItem('theme') || 'dark';

  // Initialize
  function init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.setAttribute('aria-pressed', currentTheme === 'light');
    
    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set up event listeners
    themeToggle.addEventListener('click', toggleTheme);
    formatToggle.addEventListener('click', toggleTimeFormat);
    
    // Initial clock update
    updateClock();
    
    // Update clock every second
    setInterval(updateClock, 1000);
  }

  // Update clock
  function updateClock() {
    const now = new Date();
    
    // Time
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    let ampm = '';
    if (!is24HourFormat) {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }
    
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    ampmElement.textContent = ampm;
    
    // Date
    weekdayElement.textContent = WEEKDAYS[now.getDay()];
    monthElement.textContent = MONTHS[now.getMonth()];
    dayElement.textContent = now.getDate().toString().padStart(2, '0');
    yearElement.textContent = now.getFullYear();
  }

  // Toggle theme
  function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.setAttribute('aria-pressed', currentTheme === 'light');
    localStorage.setItem('theme', currentTheme);
  }

  // Toggle time format
  function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    formatToggle.textContent = is24HourFormat ? '12 Hour' : '24 Hour';
  }

  // Start the app
  init();
});