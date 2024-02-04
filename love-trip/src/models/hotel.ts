export interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: { direcions: string; pointGeolocation: { x: number; y: number } }
  name: string
  price: number
  starRating: number
  mainImageUrl: string
  events: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      backgroundColor: string
      fontColor: string
    }
  }
}
