import {
  func,
  object,
  shape,
  string,
} from 'prop-types';

export const dictionaryType = shape({
  dictionary: object.isRequired,
  exact: object.isRequired,
  greek: object.isRequired,
  latin: object.isRequired,
});

export const historyType = shape({
  push: func.isRequired,
});

export const matchType = shape({
  params: shape({
    word: string,
  }).isRequired,
});
