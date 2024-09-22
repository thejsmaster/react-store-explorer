export function buildObjectOrArrayPreview(obj: any) {
  if (Array.isArray(obj)) {
    let val = "";
    if (obj.length > 6) val = "0,1,2,3,4..." + (obj.length - 1);
    if (obj.length <= 6) {
      val = "1 "
        .repeat(obj.length - 1)
        .split(" ")
        .map((a, b) => b)
        .join(",");
    }
    return "[" + val + "]";
  } else {
    let val = Object.keys(obj).slice(0, 5).join(", ");
    if (val.length > 10) val = val.substring(0, 15) + "...";
    else if (Object.keys(obj).length > 4) {
      val = val + "...";
    }
    return "{" + val + "}";
  }
}
export function Timer(targetTime: any) {
  if (!targetTime || typeof targetTime !== "string") {
    return "";
  }
  const now: any = new Date();
  const target: any = new Date();
  const [hh, mm, ss, ms] = targetTime.split(":").map(Number);

  target.setHours(hh);
  target.setMinutes(mm);
  target.setSeconds(ss);
  target.setMilliseconds(ms);

  const timeDifference: any = now - target;

  if (timeDifference < 2000) {
    return "Just now";
  } else if (timeDifference < 60000) {
    const secondsAgo = Math.floor(timeDifference / 1000);
    return `${secondsAgo} s ago`;
  } else if (timeDifference < 3600000) {
    const minutesAgo = Math.floor(timeDifference / 60000);
    return `${minutesAgo} m ago`;
  } else {
    return targetTime;
  }
}
export function formatTimeExtended(timeString: string) {
  const [hh, mm, ss, ms] = timeString.split(":").map(Number);
  const date = new Date(); // Create a new Date object
  date.setHours(hh);
  date.setMinutes(mm);
  date.setSeconds(ss);
  date.setMilliseconds(ms);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();

  const amPm = hours >= 12 ? "pm" : "am";
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    amPm +
    ", " +
    seconds.toString() +
    "s, " +
    milliseconds.toString() +
    "ms";

  return formattedTime;
}
