export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    latestEvents: 'latest-events',
    profile: 'profile',
    prizes: 'prizes'
}

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpIiwiaXNfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY2Mjk3NDg2MiwiZXhwIjoxNjYzMDYxMjYyfQ.reJ7nXhAmhbv9MS07cXSG8KyGLNqqHIJRirqds3HEHg'

export const showingMyTeamTabsEndingUrl = {
    schematic: 'schematic',
    list: 'list'
}

export const serverUrl = 'http://178.216.248.39:8000';

export function toFarsiNumber(number: number) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number
        .toString()
        .replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
}