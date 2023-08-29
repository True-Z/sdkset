export function waitFor(waitingTime: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, waitingTime)
  })
}
