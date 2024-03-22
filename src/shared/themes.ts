type MantineColorsTuple = readonly [
    string, string, string, string, string,
    string, string, string, string, string,
    ...string[]
];


export function getTheme(theme: string): MantineColorsTuple | "light" | "standard" {
    switch (theme) {
        case 'blue':
            return blueTheme();
        case 'red':
            return redTheme();
        case 'purple':
            return purpleTheme();
        case 'light':
            return "light"
        case 'grey':
            return greyTheme();
        default: 
            return "standard"
    }
}


function blueTheme(): MantineColorsTuple {
    return [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
        ]
}


function redTheme(): MantineColorsTuple {
    return [
            '#e0d5d7',
            '#e0acae',
            '#a38f8f',
            '#806668',
            '#664f4f',
            '#6a3434',
            '#3d2c2c',
            '#301e1e',
            '#210d0d',
            '#0a0101',
        ]
}

function purpleTheme(): MantineColorsTuple {
    return [
            '#e0d7e0',
            '#e0aee0',
            '#a38fa3',
            '#806680',
            '#664f66',
            '#6a346a',
            '#3d2d3d',
            '#301e30',
            '#210d21',
            '#0a010a',
        ]
}

function greyTheme(): MantineColorsTuple {
    return [
            '#e0e0e0',
            '#aeaeae',
            '#8f8f8f',
            '#666666',
            '#4f4f4f',
            '#343434',
            '#2c2c2c',
            '#1e1e1e',
            '#0d0d0d',
            '#010101',
        ]
}
