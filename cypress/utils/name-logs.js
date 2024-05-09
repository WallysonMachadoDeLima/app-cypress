export function nameLogs (name, text) {
    const names = [
        {
        key: 'acessso',
        value: 'ACESSANDO'
        },
        {
        key: 'preencher',
        value: 'PREENCHENDO'
        }
    ]

    return ` ${names.find(n => n.key === name).value}: ${text}`
}