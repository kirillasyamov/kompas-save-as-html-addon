import { Matrix4 } from './Matrix';
import { Vector3 } from './Vector'

class Object3d {
    protected childrens: Array<Object3d>;
    protected parent: Object3d | undefined;
    public uuid: number = Math.floor(Date.now() * Math.random());
    public name: string;
    public id: number;
    public objectMatrix: Matrix4;
    public projectionMatrix: Matrix4;
    public worldMatrix: Matrix4;

    constructor(name: string, parent?: Object3d | undefined) {
        this.worldMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.objectMatrix = new Matrix4();
        this.name = name;
        this.parent = parent;
        this.childrens = new Array();
        this.id = this.parent ? this.parent.id + 1 : 1;
    }
    public get position(): Vector3 {
        const x: number = this.worldMatrix.get(4, 1);
        const y: number = this.worldMatrix.get(4, 2);
        const z: number = this.worldMatrix.get(4, 3);
        return new Vector3(x, y, z);
    }
}

export { Object3d }