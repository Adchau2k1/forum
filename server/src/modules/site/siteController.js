export default class SiteController {
    // [GET] /
    index(req, res) {
        res.send('Trang chủ')
    }

    // [GET] /test/:slug
    show(req, res) {
        const { slug } = req.params

        res.send('Lấy thông tin user: ' + slug)
    }
}
