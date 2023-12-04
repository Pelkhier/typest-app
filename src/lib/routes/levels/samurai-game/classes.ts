import type { PlayerProps, PlayerState, SpriteProps } from "./types";

//  =================== constants ====================
const gravity = 0.6;

// ==================== Class Sprite =================
export class Sprite {
    position;
    image;
    constructor({ position, imgSrc }: SpriteProps) {
        this.position = position;
        this.image = new Image();
        this.image.src = imgSrc;
    }
    draw(context: CanvasRenderingContext2D, w: number, h: number) {
        context.drawImage(this.image, this.position.x, this.position.y);
        if (this.image.width < w) {
            context.drawImage(this.image, this.image.width, this.position.y);
        }
    }
    update(context: CanvasRenderingContext2D, w: number, h: number) {
        this.draw(context, w, h);
    }
}

//  =================== Class Player ==================
export class Player {
    position;
    velocity;
    width;
    height;
    lastKey;
    attackBox;
    isAttack;
    health;
    image;
    imgFolderSrc;
    maxFrames;
    scale;
    currentFrame;
    frameHold;
    frameCounter;
    playerState;

    constructor({
        position,
        velocity,
        health,
        offset,
        boxAttackProps,
        imgFolderSrc,
        scale,
        maxFrames,
        playerState,
    }: PlayerProps) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey = "";
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: {
                x: boxAttackProps.offset.x,
                y: boxAttackProps.offset.y,
            },
            width: boxAttackProps.width,
            height: boxAttackProps.height,
        };
        this.isAttack = false;
        this.health = health;
        this.image = new Image();
        this.image.src = `${imgFolderSrc}/${playerState}.png`;
        this.imgFolderSrc = imgFolderSrc;
        this.maxFrames = maxFrames;
        this.scale = scale;
        this.currentFrame = 0;
        this.frameCounter = 0;
        this.frameHold = 5;
        this.playerState = playerState;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.maxFrames),
            0,
            this.image.width / this.maxFrames,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.maxFrames) * this.scale,
            this.image.height * this.scale
        );
    }
    update(context: CanvasRenderingContext2D, bgHeight: number) {
        this.draw(context);
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.image.height + this.position.y >= bgHeight - 140) {
            this.velocity.y = 0;

            this.position.y = bgHeight - this.image.height - 140;
        } else {
            this.velocity.y += gravity;
        }
        this.frameCounter += 1;
        if (this.frameCounter % this.frameHold === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame += 1;
            } else {
                this.currentFrame = 0;
            }
        }
    }
    attack() {
        this.switchMovement("attack", 5);
    }
    switchMovement(state: PlayerState, maxFrames: number) {
        if (
            this.playerState === "attack" &&
            this.currentFrame < this.maxFrames - 1
        ) {
            return;
        }

        switch (state) {
            case "attack":
                this.isAttack = true;
                this.playerState = state;
                this.image.src = `${this.imgFolderSrc}/${state}.png`;
                this.maxFrames = maxFrames;
                this.currentFrame = 0;

                setTimeout(() => {
                    this.isAttack = false;
                }, 500);
                break;
            default:
                if (this.playerState !== state) {
                    this.image.src = `${this.imgFolderSrc}/${state}.png`;
                    this.playerState = state;
                    this.maxFrames = maxFrames;
                    this.currentFrame = 0;
                }
                break;
        }
    }
}
