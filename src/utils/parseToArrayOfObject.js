import isEmpty from 'lodash/isEmpty';

export const parseToArrayOfObject = (array) => {

  if (array instanceof Array) {

    if (isEmpty(array)) {
      return [];
    }

    return array
      .map(issue => {
        if (typeof issue === 'object') {
          return {
            id: issue.id
          };
        }
        return JSON.parse(issue)
      })
      .map(issue => ({ id: issue.id }));
  }

};