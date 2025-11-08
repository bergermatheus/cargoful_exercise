export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatSchedule = (repetition, date) => {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  if (repetition === 'Daily') {
    return `Daily at ${time}`;
  } else if (repetition === 'Weekly') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Every ${days[date.getUTCDay()]} at ${time}`;
  } else if (repetition === 'Monthly') {
    return `Every ${date.getUTCDate()} of the month at ${time}`;
  }
  return `Daily at ${time}`;
};

export const parseDateTimeLocalAsUTC = (dateTimeLocalString) => {
  if (!dateTimeLocalString) return null;
  
  const [datePart, timePart] = dateTimeLocalString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  
  return new Date(Date.UTC(year, month - 1, day, hours, minutes));
};

export const calculateNextRun = (startDateUTC, repetition) => {
  const now = new Date();
  const next = new Date(startDateUTC);

  if (repetition === 'Daily') {
    if (next < now) {
      next.setUTCDate(next.getUTCDate() + 1);
    }
  } else if (repetition === 'Weekly') {
    const startDay = next.getUTCDay();
    while (next < now || next.getUTCDay() !== startDay) {
      next.setUTCDate(next.getUTCDate() + 1);
    }
  } else if (repetition === 'Monthly') {
    next.setUTCMonth(now.getUTCMonth() + 1);
  }

  return next;
};

