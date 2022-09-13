export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    latestEvents: 'latest-events',
    profile: 'profile',
    prizes: 'prizes'
}

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1haGRpIiwiaXNfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY2MzA2NTcxNywiZXhwIjoxNjYzMTUyMTE3fQ.RFlcz8FzvywqrB24smurswfJspUATiz8t5xYE_jGNf4'

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