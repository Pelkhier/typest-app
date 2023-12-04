export type PlayerProps = {
    position: {
        x: number;
        y: number;
    };
    velocity: {
        x: number;
        y: number;
    };
    health: number;
    offset: {
        x: number;
        y: number;
    };
    boxAttackProps: {
        offset: {
            x: number;
            y: number;
        };
        width: number;
        height: number;
    };
    imgFolderSrc: string;
    playerState: PlayerState;
    maxFrames: number;
    scale: number;
};

export type SpriteProps = {
    position: {
        x: number;
        y: number;
    };
    imgSrc: string;
};

export type PlayerState =
    | "idle"
    | "run"
    | "jump"
    | "attack"
    | "dead"
    | "defense";
