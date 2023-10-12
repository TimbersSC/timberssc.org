import {
  diff,
  addedDiff,
  deletedDiff,
  updatedDiff,
  detailedDiff,
} from 'deep-object-diff';

/**
 * @returns the difference of the original and updated objects
 */
export const getDiff = (originalObj: object, updatedObj: object): object => {
  return diff(originalObj, updatedObj);
};

/**
 * @returns only the values added to the updated object
 */
export const getAddedDiff = (
  originalObj: object,
  updatedObj: object,
): object => {
  return addedDiff(originalObj, updatedObj);
};

/**
 * @returns only the values deleted in the updated object
 */
export const getDeletedDiff = (
  originalObj: object,
  updatedObj: object,
): object => {
  return deletedDiff(originalObj, updatedObj);
};

/**
 * @returns only the values that have been changed in the updated object
 */
export const getUpdatedDiff = (
  originalObj: object,
  updatedObj: object,
): object => {
  return updatedDiff(originalObj, updatedObj);
};

interface DetailedDiff {
  added: object;
  deleted: object;
  updated: object;
}

/**
 * @returns an object with the added, deleted and updated differences
 */
export const getDetailedDiff = (
  originalObj: object,
  updatedObj: object,
): DetailedDiff => {
  return detailedDiff(originalObj, updatedObj) as DetailedDiff;
};
