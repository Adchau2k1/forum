// Các trang riêng lẻ
import { Router } from 'express'
import SiteController from '../modules/site/siteController.js'

const route = Router()
const siteController = new SiteController()

route.get('/search', siteController.getSearchResults)

route.get('/showPosts', siteController.getShowPosts)

route.get('/forumStatistics', siteController.getForumStatistics)

route.get('/topPosts', siteController.getTopPosts)

export default route
