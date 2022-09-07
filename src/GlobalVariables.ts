export const homeTabsEndingUrl = {
    myTeam: 'my-team',
    transfers: 'transfers',
    latestEvents: 'latest-events',
    profile: 'profile',
    prizes: 'prizes'
}

export function getPascalCase(string: string): string {
    return string.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        })
        .replace('-', '');
}

export const players = [
    {}
]