export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))



// 랜덤하게 숫자를 가져오는 함수
export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min