
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp*1000)
    const hours = "0" + date.getHours()
    const minutes = "0" + date.getMinutes()
    const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2)
    return formattedTime
  }