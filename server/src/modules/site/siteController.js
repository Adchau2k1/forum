export default class SiteController {
    // [GET] /
    index(req, res) {
        res.send('Trang chủ')
    }

    // [GET] /test/:slug
    show(req, res) {
        const { id } = req.params

        res.send('Lấy thông tin user: ')
    }
}
