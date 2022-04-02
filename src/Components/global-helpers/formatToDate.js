
export const formatToDate = (timestamp, levelOfDetails = "dayOfTheWeek") => {
    const date = new Date(timestamp*1000)
    let thisDate;

    if (levelOfDetails === "dayOfTheWeek") {
      thisDate = date.getUTCDay()
      switch (thisDate) {
        case 1:
          thisDate = "Monday"
          break;
        case 2:
          thisDate = "Tuesday"
          break;
        case 3:
          thisDate = "Wednesday"
          break;
        case 4:
          thisDate = "Thursday"
          break;
        case 5:
          thisDate = "Friday"
          break;
        case 6:
          thisDate = "Saturday"
          break;
        case 0:
          thisDate = "Sunday"
          break;
        default:
          break;
      }

    } else if (levelOfDetails==="day") {
      let day = date.getDate();
      thisDate = day

    } else if (levelOfDetails==="day-month") {
      let day = date.getDate();
      let month = date.getMonth();
      switch (month) {
        case 0:
          month = "January"
          break;
        case 1:
          month = "February"
          break;
        case 2:
          month = "March"
          break;
        case 3:
          month = "April"
          break;
        case 4:
          month = "May"
          break;
        case 5:
          month = "June"
          break;
        case 6:
          month = "July"
          break;
        case 7:
          month = "August"
          break;
        case 8:
          month = "September"
          break;
        case 9:
          month = "October"
          break;
        case 10:
          month = "November"
          break;
        case 11:
          month = "December"
          break;
        default:
          break;
      }
      thisDate = `${day} ${month}`
    }

    return thisDate
}