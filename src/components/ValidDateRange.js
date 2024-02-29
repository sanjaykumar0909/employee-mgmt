export default function(){
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    minDate.setFullYear(minDate.getFullYear() - 118); // 118 years before current date
    const maxDate = new Date(currentDate);
    maxDate.setFullYear(maxDate.getFullYear() - 18); // 18 years before current date
  
    // Format the dates in YYYY-MM-DD format
    const minDateString = minDate.toISOString().split('T')[0];
    const maxDateString = maxDate.toISOString().split('T')[0];
    return [minDateString, maxDateString]
}