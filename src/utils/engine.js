export const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const checkOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};

export const getRecommendedActivities = (user, activities) => {
  if (!user || !user.busy_schedule) return activities;

  return activities.filter(activity => {
    const actStart = timeToMinutes(activity.start);
    const actEnd = timeToMinutes(activity.end);
    
    // Check against user's busy schedule for the same day
    const daySchedule = user.busy_schedule.filter(s => s.day === activity.day);
    
    let hasOverlap = false;
    for (let block of daySchedule) {
      const blockStart = timeToMinutes(block.start);
      const blockEnd = timeToMinutes(block.end);
      if (checkOverlap(actStart, actEnd, blockStart, blockEnd)) {
        hasOverlap = true;
        break;
      }
    }
    
    // If it doesn't overlap with busy blocks, it's a "hueco"
    return !hasOverlap;
  });
};
