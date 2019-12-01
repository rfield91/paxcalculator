import reduce from 'lodash-es/reduce';

export const PAX_VALUES = [
    {
        name: 'Street',
        values: [
            { name: 'SS', pax: 0.821 },
            { name: 'AS', pax: 0.817 },
            { name: 'BS', pax: 0.81 },
            { name: 'CS', pax: 0.809 },
            { name: 'DS', pax: 0.8 },
            { name: 'ES', pax: 0.789 },
            { name: 'FS', pax: 0.803 },
            { name: 'GS', pax: 0.788 },
            { name: 'HS', pax: 0.78 },
            { name: 'SSR', pax: 0.843 },
        ],
    },
    {
        name: 'Street Touring',
        values: [
            { name: 'SSC', pax: 0.801 },
            { name: 'STS', pax: 0.811 },
            { name: 'STX', pax: 0.815 },
            { name: 'STR', pax: 0.827 },
            { name: 'STU', pax: 0.828 },
            { name: 'STH', pax: 0.813 },
        ],
    },
    {
        name: 'CAM',
        values: [
            { name: 'CAMT', pax: 0.812 },
            { name: 'CAMC', pax: 0.82 },
            { name: 'CAMS', pax: 0.833 },
        ],
    },
    {
        name: 'Street Prepared',
        values: [
            { name: 'SSP', pax: 0.853 },
            { name: 'ASP', pax: 0.85 },
            { name: 'BSP', pax: 0.851 },
            { name: 'CSP', pax: 0.857 },
            { name: 'DSP', pax: 0.84 },
            { name: 'ESP', pax: 0.836 },
            { name: 'FSP', pax: 0.824 },
        ],
    },
    {
        name: 'Street Modified',
        values: [
            { name: 'SMF', pax: 0.841 },
            { name: 'SM', pax: 0.855 },
            { name: 'SSM', pax: 0.875 },
        ],
    },
    {
        name: 'Prepared',
        values: [
            { name: 'XP', pax: 0.885 },
            { name: 'BP', pax: 0.865 },
            { name: 'CP', pax: 0.848 },
            { name: 'DP', pax: 0.858 },
            { name: 'EP', pax: 0.849 },
            { name: 'FP', pax: 0.863 },
        ],
    },
    {
        name: 'Modified',
        values: [
            { name: 'AM', pax: 1.0 },
            { name: 'BM', pax: 0.96 },
            { name: 'CM', pax: 0.891 },
            { name: 'DM', pax: 0.895 },
            { name: 'EM', pax: 0.894 },
            { name: 'FM', pax: 0.907 },
            { name: 'FSAE', pax: 0.962 },
        ],
    },
    {
        name: 'Kart',
        values: [
            { name: 'KM', pax: 0.93 },
            { name: 'JA', pax: 0.856 },
            { name: 'JB', pax: 0.822 },
            { name: 'JC', pax: 0.718 },
        ],
    },
    {
        name: 'Historic',
        values: [
            { name: 'HCS', pax: 0.793 },
            { name: 'HCR', pax: 0.814 },
        ],
    },
];

export const PAX_VALUES_FLATTENED = reduce(
    PAX_VALUES,
    (PAX_VALUES_FLATTENED, paxClass) => {
        return reduce(
            paxClass.values,
            (PAX_VALUES_FLATTENED, paxSubclass) => {
                const id = `${paxClass.name}/${paxSubclass.name}`;
                PAX_VALUES_FLATTENED.push({
                    id,
                    parent: paxClass.name,
                    ...paxSubclass,
                });
                return PAX_VALUES_FLATTENED;
            },
            PAX_VALUES_FLATTENED
        );
    },
    []
);
