import { GET_FILTERS } from './types'



//Return Errors
export const returnFilters = (result_array) =>{
  return{
    type: GET_FILTERS,
    payload: { result_array}
  };
}