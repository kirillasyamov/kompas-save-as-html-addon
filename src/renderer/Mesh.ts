import { Object3d } from './Object3d';
import { Geometry } from '/Geometry';

class Mesh extends Object3d {
    public geometry: Geometry;
    protected program?: WebGLProgram;
    protected visible: boolean;

    constructor(isVisible: boolean, name: string, parent?: Object3d) {
        super(name, parent);
        this.program = null;
        this.visible = isVisible;
    }
}

export { Mesh }
