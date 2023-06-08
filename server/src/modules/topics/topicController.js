export default class TopicController {
    // [GET] /topic
    index(req, res) {
        res.json({
            id: 1,
            title: 'Bài đăng 1',
        })
    }

    // [GET] /topic/:slug
    show(req, res) {
        const { id } = req.params
        res.send('Bài viết thứ: ' + id)
    }
}
