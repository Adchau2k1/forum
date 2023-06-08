// Các trang riêng lẻ
import { Router } from 'express'
import SiteController from '../modules/site/siteController.js'

const route = Router()
const siteController = new SiteController()

route.get('/', siteController.index)

export default route
