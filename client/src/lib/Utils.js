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
