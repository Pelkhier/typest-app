export type GrassParams = {
    position: {
        x: number;
        y: number;
    };
    imgSrc: string;
    imageWidth: number;
    imageHeight: number;
};

export type DuckState =
    | "dead"
    | "left"
    | "topLeft"
    | "right"
    | "topRight"
    | "shot"
    | null;

export type DuckParams = {
    position: {
        x: number;
        y: number;
    };
    state: DuckState;
    sources: {
        left: string[];
        topLeft: string[];
        right: string[];
        topRight: string[];
        dead: string[];
        shot: string[];
    };
};

export type DogState = "laugh" | "single" | null;

export type DogParams = {
    position: {
        x: number;
        y: number;
        defaultY: number;
        maxY: number;
    };
    state: DogState;
    sources: {
        laugh: string[];
        single: string[];
    };
};
