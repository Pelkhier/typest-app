import type { DogParams, DuckParams, GrassParams } from "./types";

export class Background {
    position;
    image;
    imageWidth;
    imageHeight;
    imgSrc;
    constructor({ position, imgSrc, imageWidth, imageHeight }: GrassParams) {
        this.position = position;
        this.image = new Image();
        this.imgSrc = imgSrc;
        this.image.src = imgSrc;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
    }
    draw(context: CanvasRenderingContext2D, screenW: number) {
        while (this.position.x < screenW) {
            context.drawImage(this.image, this.position.x, this.position.y);
            this.position.x += this.imageWidth;
        }
        this.position.x = 0;
    }
    update(context: CanvasRenderingContext2D, screenW: number) {
        this.draw(context, screenW);
    }
}

export class Duck {
    state;
    position;
    sources;
    images: any;
    flyBox;
    direction;
    speedX;
    hitRight;
    hitTop;
    maxFrames;
    holdFrame;
    frameCounter;
    currentFrame;

    constructor({ position, state, sources }: DuckParams) {
        this.position = position;
        this.state = state;
        this.sources = sources;
        this.images = {};
        this.flyBox = {
            width: 0,
            height: 0,
            x: 100,
            y: 100,
        };
        this.direction = {
            x: 10,
            y: 10,
        };
        this.speedX = 10;
        this.hitRight = false;
        this.hitTop = false;
        this.maxFrames = 3;
        this.holdFrame = 5;
        this.frameCounter = 0;
        this.currentFrame = 0;

        for (let source of Object.keys(sources)) {
            if (!Object.hasOwn(this.images, source)) {
                this.images = {
                    ...this.images,
                    [`${source}`]: [],
                };
            }
            // @ts-ignore
            for (let src of this.sources[`${source}`]) {
                let image = new Image();
                image.src = src;
                this.images[`${source}`].push(image);
            }
        }
    }

    draw(context: CanvasRenderingContext2D, ground: number) {
        context.drawImage(
            this.images[this.state ?? "left"][this.currentFrame],
            this.position.x,
            this.position.y
        );

        this.move(ground);
    }

    update(context: CanvasRenderingContext2D, ground: number) {
        if (!this.state) return;
        this.draw(context, ground);

        this.frameCounter += 1;
        if (this.frameCounter % this.holdFrame === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame += 1;
            } else {
                this.currentFrame = 0;
            }
        }
    }

    move(ground: number) {
        if (this.state === "dead" || this.state === "shot") {
            if (this.state === "dead") {
                if (this.position.y >= ground) {
                    this.state = null;
                    return;
                }
                this.position.y += this.direction.y;
            }
            return;
        }

        if (this.hitRight) {
            if (this.position.x <= this.flyBox.x) {
                this.hitRight = false;
                this.state = "right";
            } else {
                this.direction.x = -10;
            }
        }
        if (!this.hitRight) {
            if (this.position.x >= this.flyBox.width) {
                this.hitRight = true;
                this.state = "left";
            } else {
                this.direction.x = 10;
            }
        }
        if (this.hitTop) {
            if (this.position.y <= this.flyBox.y) {
                this.hitTop = false;
            } else {
                this.direction.y = -10;
            }
        }
        if (!this.hitTop) {
            if (this.position.y >= this.flyBox.height) {
                this.hitTop = true;
            } else {
                this.direction.y = 10;
            }
        }
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }
    die() {
        this.state = "shot";
        this.maxFrames = 1;
        this.currentFrame = 0;
        setTimeout(() => {
            this.state = "dead";
            this.maxFrames = 3;
            this.direction.y = 10;
        }, 500);
    }
}

export class Dog {
    position;
    state;
    sources;
    images: any;
    maxFrames;
    holdFrame;
    frameCounter;
    currentFrame;
    add;
    show;
    duckOnGround;
    constructor({ position, state, sources }: DogParams) {
        this.position = position;
        this.state = state;
        this.sources = sources;
        this.images = {};
        this.maxFrames = 2;
        this.holdFrame = 10;
        this.frameCounter = 0;
        this.currentFrame = 0;
        this.add = 0;
        this.show = false;
        this.duckOnGround = 0;

        for (let source of Object.keys(sources)) {
            if (!Object.hasOwn(this.images, source)) {
                this.images = {
                    ...this.images,
                    [`${source}`]: [],
                };
            }
            // @ts-ignore
            for (let src of this.sources[`${source}`]) {
                let image = new Image();
                image.src = src;
                this.images[`${source}`].push(image);
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        // Note : try and catch here because of a bug, it accure when two states of animation conflict
        try {
            context.drawImage(
                this.images[this.state ?? "laugh"][this.currentFrame],
                this.position.x,
                this.position.y
            );

            this.position.y += this.add;
            this.move();
        } catch (error) {
            console.log(error);
        }
    }

    update(context: CanvasRenderingContext2D) {
        if (!this.state) return;

        this.draw(context);

        this.frameCounter += 1;
        if (this.frameCounter % this.holdFrame === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame += 1;
            } else {
                this.currentFrame = 0;
            }
        }
    }

    move() {
        if (this.state === "laugh") {
            if (this.position.y <= this.position.maxY) {
                this.add = 0;
                setTimeout(() => {
                    this.add = 5;
                    this.show = false;
                }, 1000);
            } else if (this.show) {
                this.add = -5;
                return;
            } else if (
                !this.show &&
                this.position.y >= this.position.defaultY
            ) {
                this.state = null;
                this.add = 0;
            }
            return;
        }

        if (this.state === "single") {
            if (this.position.y <= this.position.maxY) {
                this.add = 0;
                setTimeout(() => {
                    this.add = 5;
                    this.show = false;
                }, 1000);
            } else if (this.show) {
                this.add = -5;
                return;
            } else if (
                !this.show &&
                this.position.y >= this.position.defaultY
            ) {
                this.state = null;
                this.add = 0;
            }
            return;
        }
    }

    laugh() {
        this.maxFrames = 2;
        this.show = true;
        this.state = "laugh";
    }

    find(isDuckDead: boolean) {
        if (isDuckDead) {
            this.duckOnGround += 1;
            this.maxFrames = 1;
            this.show = true;
            this.state = "single";
        } else if (this.duckOnGround > 0) {
            this.duckOnGround -= 1;
        }
    }
}
