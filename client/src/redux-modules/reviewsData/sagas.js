import "regenerator-runtime/runtime";
import {put, call, all, takeEvery} from 'redux-saga/effects';
import {setDefault, setLoading, setSearching} from '../moduleMode/actions.js';
import {updateReviews, updateReviewsError, setSort, setSearchedTerm, clearSearchedTerm} from './actions.js';
import {fetchReviews, searchReviews} from '../../Utils/Api.js';
import types from '../reviewsData/types.js';

const SORT_PARAM_VALUES = ['', '-date', 'date', '-stars', 'stars', 'elites'];

const requestReviews = function* (action){
  console.log('i am requestReviews in middleware')
  
  
  // get sortBy value
  const {sortOptionIdx} = action;
  const sortBy = SORT_PARAM_VALUES[sortOptionIdx];
  console.log(sortOptionIdx)
  // dispatch sortBy update
  yield put(setSort(sortOptionIdx));
  
  // dispatch loading action
  yield put(setLoading());
  // try
  try{
    // get reviews
    const {reviews, error} = yield call(fetchReviews, {sortBy} );
    //throw fetch error to be handled by catch along with other errors
    if(error) {
      throw error;
    }
    // dispatch update action
    yield put(updateReviews(reviews));
    // set sortOption
  // catch 
  }catch(error){
    console.error(error);
    // dispatch update error
    yield put(updateReviewsError(error));
  // finally reset mode to default
  }finally{
    yield put(clearSearchedTerm());
    yield put(setDefault());
  }
}

const requestSearchReviews = function* (action){
  console.log('i am requestSearchReviews in middleware')
  // get searchterm
  const {searchTerm} = action;
  
  // dispatch searched term update
  yield put(setSearchedTerm(searchTerm));

  // dispatch loading action
  yield put(setLoading());
  // try
  try{
    // get reviews
    const {reviews, error} = yield call(searchReviews, searchTerm);
    //throw fetch error to be handled by catch along with other errors
    if(error) {
      throw error;
    }
    // dispatch update action
    yield put(updateReviews(reviews));
  // catch 
  }catch(error){
    // dispatch update error
    console.error(error);
    yield put(updateReviewsError(error));

  // finally set mode to searching
  }finally{
    yield put(setSearching());
  }
}


export const reviewsSaga = function* () {
  yield all([
    takeEvery(types.REVIEWS_FETCH_SORTED, requestReviews),
    takeEvery(types.REVIEWS_FETCH_SEARCH, requestSearchReviews),
  ]);
}