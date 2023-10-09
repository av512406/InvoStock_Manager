// Function to get the current date in the format "YYYY-MM-DD"
export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // Function to get the current time in the format "HH:MM AM/PM"
  export function getCurrentTime() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${minutes} ${ampm}`;
  }
  