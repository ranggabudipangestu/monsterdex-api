export const filterHandler = (filterValues:any):string =>{
  let filter: string
	if(filterValues.length > 0) {
		filter = ` AND`
	} else {
		filter = ` WHERE`
	}
	return filter
}