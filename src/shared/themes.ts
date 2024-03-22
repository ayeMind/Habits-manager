type MantineColorsTuple = readonly [
    string, string, string, string, string,
    string, string, string, string, string,
    ...string[]
];


export function getTheme(theme: string): MantineColorsTuple | "light" | "standard" {
    switch (theme) {
        case 'blue':
            return blueTheme();
        case 'green':
            return greenTheme();
        case 'red':
            return redTheme();
        case 'purple':
            return purpleTheme();
        case 'yellow':
            return yellowTheme();
        case 'light':
            return "light"
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

function greenTheme(): MantineColorsTuple {
    return [
            '#d5e0d7',
            '#ace0ae',
            '#8fa38f',
            '#668066',
            '#4f664f',
            '#346a34',
            '#2c3d2c',
            '#1e301e',
            '#0d210d',
            '#010a01',
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

function yellowTheme(): MantineColorsTuple {
    return [
            '#e0e0d5',
            '#e0e0ac',
            '#a3a38f',
            '#808066',
            '#66664f',
            '#6a6a34',
            '#3d3d2c',
            '#30301e',
            '#21210d',
            '#0a0a01',
        ]
}
