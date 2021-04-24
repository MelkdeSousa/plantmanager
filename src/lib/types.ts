export interface Plant {
  id: string
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
  hour: string
}

export type Environment = {
  key: string
  title: string
}

export type StoragePlant = {
  [id: string]: {
    data: Plant
    notificationId: string
  }
}
