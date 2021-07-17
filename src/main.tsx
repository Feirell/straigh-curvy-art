import React from 'react';

import './main.scss';

interface Point {
    x: number;
    y: number;
}

interface Line {
    start: Point;
    end: Point;
}


// struct.push({start: {x: 0, y: 0}, end: {x: 1, y: 1}});
// struct.push({start: {x: 1, y: 0}, end: {x: 0, y: 1}});

const lines = 15;

const intersect: Point = {x: .5, y: 1};

const firstAxis: Line = {
    start: {x: 0, y: .5},
    end: intersect
}

const secondAxis: Line = {
    start: {x: 1, y: .5},
    end: intersect
}

function generateLineCrossings(lineA: Line, lineB: Line, lines: number, includeLastLine: boolean = false) {
    const interpolate = (line: Line, t: number): Point => {
        const {start, end} = line;

        const x = start.x * (1 - t) + end.x * t;
        const y = start.y * (1 - t) + end.y * t;

        return {x, y};
    }

    const struct: Line[] = [];

    if (includeLastLine)
        lines += 2;

    for (let i = 0; i < lines; i++) {
        const k = includeLastLine ?
            (i) / (lines - 1) :
            (i + 1) / (lines + 1);

        const start = interpolate(lineA, k);
        const end = interpolate(lineB, 1 - k);

        struct.push({start, end});
    }

    return struct;
}


export const Main = () => {

    const lineElems: any[] = [];


    const bottom = -0.1;

    const center = {x: 0.5, y: 0.5};

    const starCorners: Point[] = [];

    const lines = 10;
    const corners = 3;

    for (let i = 0; i < corners; i++) {
        const s = Math.sin(Math.PI * 2 * i / corners);
        const c = Math.cos(Math.PI * 2 * i / corners);

        starCorners.push({x: .5 + s * 0.45, y: .5 + c * 0.45});
    }

    starCorners.push(starCorners[0]);

    const allLines: Line[] = [];

    for (let i = 0; i < starCorners.length - 1; i++) {
        const a: Line = {start: starCorners[i], end: center};
        const b: Line = {start: starCorners[i + 1], end: center};

        allLines.push(...generateLineCrossings(a, b, lines, true));
    }

    let index = 0;
    for (const line of allLines) {
        const lineElem = <line
            x1={line.start.x} y1={line.start.y}
            x2={line.end.x} y2={line.end.y}

            key={index++}
        />;

        lineElems.push(lineElem);
    }

    return <svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
        {lineElems}

        {/*<circle cx="1" cy="0" r="1"/>*/}
    </svg>
};
