export const selectReviews = ({reviewsData}) => {
  const {languages, reviewsByLanguage, selectedLanguage} = reviewsData;
  return reviewsByLanguage[languages[selectedLanguage]];
}

export const selectLanguagesCount = ({reviewsData}) => {
  const {languages_count} = reviewsData;
  return languages_count;
}

export const getLanguages = ({reviewsData}) => {
  const {languages} = reviewsData;
  return languages;
} 

export const selectSelectedLanguage = ({reviewsData}) => {
  const {selectedLanguage} = reviewsData;
  return selectedLanguage;
}

export const selectSortOpitons = ({reviewsData}) => {
  const {sortOptions} = reviewsData;
  return sortOptions;
}

export const selectSelectedSort = ({reviewsData}) => {
  const {selectedSort} = reviewsData;
  return selectedSort;
}

export const getSearchedTerm = ({reviewsData}) => {
  const {searchedTerm} = reviewsData;
  return searchedTerm;
}