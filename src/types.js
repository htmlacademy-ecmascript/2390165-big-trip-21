/**
* @typedef {{
*  id: string
*  base_price: number
*  date_from: string
*  date_to: string
*  destination: string
*  is_favorite: boolean
*  offers: Array<string>
*  type: PointType
* }} Point
*/

/**
* @typedef {{
*  id: string
*  name: string
*  description: string
*  pictures: Array<Picture>
* }} Destination
*/

/**
* @typedef {{
*  src: string
*  description: string
* }} Picture
*/

/**
* @typedef {{
*  type: PointType
*  offers: Array<Offer>
* }} OfferGroup
*/

/**
* @typedef {{
*  id: string
*  title: string
*  price: number
* }} Offer
*/

/**
* @typedef {(
*   'taxi'
* | 'bus'
* | 'train'
* | 'ship'
* | 'drive'
* | 'flight'
* | 'check-in'
* | 'sightseeing'
* | 'restaurant'
* )} PointType
*/
