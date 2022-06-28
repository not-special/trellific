/* eslint-disable no-undef */
import { cleanCard, formatDateLong, formatDateShort } from "./Utils";

describe('card cleaner', () => {
  test('removes desired properties', () => {
    const card = {"_id":{"$oid":"62ab51fdeaf347138c12b108"},"dueDate":null,"labels":[],"description":"","commentsCount":{"$numberInt":"0"},"position":{"$numberInt":"65535"},"archived":false,"completed":false,"comments":[],"actions":[],"title":"another test card","listId":{"$oid":"62a9fc1eb9e7dbb1bddb0fe4"},"boardId":{"$oid":"62a9fbf7b9e7dbb1bddb0fe2"},"createdAt":{"$date":{"$numberLong":"1655394813215"}},"updatedAt":{"$date":{"$numberLong":"1655394813215"}},"__v":{"$numberInt":"0"}}
    const cleanedCard = cleanCard(card);
    expect(cleanedCard).not.toHaveProperty("_id");
    expect(cleanedCard).not.toHaveProperty("actions");
    expect(cleanedCard).not.toHaveProperty("comments");
    expect(cleanedCard).not.toHaveProperty("boardId");
    expect(cleanedCard).not.toHaveProperty("commentsCount");
    expect(cleanedCard).not.toHaveProperty("createdAt");
    expect(cleanedCard).not.toHaveProperty("updatedAt");
  })
})

describe('date formatter', () => {
  test('formatDateLong presents a correct and readable date', () => {
    expect(formatDateLong("2022-06-15T23:22:00.877+00:00")).toBe("Wed Jun 15 2022");
  });
  
  test('formatDateShort presents a correct and readable date', () => {
    expect(formatDateShort("2022-06-15T23:22:00.877+00:00")).toBe("Jun 15");
  });
})


