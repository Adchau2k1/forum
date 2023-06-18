export default function viToEn(value) {
    if (!value) return ''

    const output = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')

    return output
}
