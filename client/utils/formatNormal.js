import dayjs from 'dayjs'

export default function formatNormal(time) {
    if (!time) return ''

    return dayjs(time).format('DD/MM/YYYY')
}
