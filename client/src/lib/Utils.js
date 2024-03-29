export const cleanCard = (card) => {
  const propertiesToRemove = [
    "actions", 
    "comments",
    "boardId",
    "commentsCount",
    "createdAt",
    "updatedAt",
    "_id",
  ]
  const cardClone = { ...card };
  propertiesToRemove.forEach(property => {
    delete cardClone[property]
  })

  return cardClone;
}

export const formatDateLong = (dueDateStr) => {
  return new Date(Date.parse(dueDateStr, "YYYY-MM-DD")).toDateString();
}

export const formatDateShort = (dueDateStr) => {
  const options = { month: "short", day: "numeric" };
  return new Date(Date.parse(dueDateStr, "YYYY-MM-DD")).toLocaleDateString("en-us", options);
}

export const pastDue = (dueDateStr) => {
  return dateDiff(dueDateStr) < 0;
}

const millisecondsToDays = (ms) => {
  return Math.ceil(ms/(1000*60*60*24));
}

export const dateDiff = (dueDateStr) => {
  const diff = millisecondsToDays(Date.parse(dueDateStr, "YYYY-MM-DD") - Date.now());
  return diff;
}

export const dueDateStatus = (dueDateStr) => {
  const daysUntilDue = dateDiff(dueDateStr);
  
  if (daysUntilDue < 0) {
    return "overdue"
  } else if (daysUntilDue < 3) {
    return "due-soon"
  }
  return "due-later"
}
