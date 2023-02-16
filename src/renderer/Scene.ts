import { Matrix, Matrix4 } from './Matrix';

class Scene {
    public matrixWorld: Matrix4;
    public bin: Array<Matrix>;
    constructor() {
        this.matrixWorld = new Matrix4();
        this.bin = new Array();
    }
}

export { Scene }