export interface Plant {
  id: number
  name: string
  about: string
  water_tips: string
  photo: string
  environments: string[]
  frequency: {
    times: number
    repeat_every: string
  }
  dateTimeNotification: Date
}

export interface MyPlant extends Plant {
  hour: string
}

export type Environment = {
  key: string
  title: string
}

export type StoragePlant = {
  [id: string]: {
    data: Plant
  }
}
