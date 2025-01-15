declare global {
  type Res<T> = {
    data: T
    code: number
    message: string
  }
}

export {}
