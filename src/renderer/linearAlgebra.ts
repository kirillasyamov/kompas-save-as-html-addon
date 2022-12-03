abstract class Vector {
    protected elements: Float32Array;

    public static dot(vecA: Vector, vecB: Vector): number {
        return vecA.elements.reduce((sum, val, i) => val * vecB.elements[i]);
    }
}
class Vector2 extends Vector {
    constructor(x?: number, y?: number) {
        super();
        if (arguments.length) this.elements = new Float32Array([x, y]);
        else return this;
    }
    public get x() {
        return this.elements[0];
    }
    public get y() {
        return this.elements[1];
    }
    public set x(value: number) {
        this.elements[0] = value;
    }
    public set y(value: number) {
        this.elements[1] = value;
    }
}
class Vector3 extends Vector2 {
    constructor(x?: number, y?: number, z?: number) {
        super();
        if (arguments.length) this.elements = new Float32Array([x, y, z]);
        else return this;
    }
    public get z() {
        return this.elements[2];
    }
    public set z(value: number) {
        this.elements[2] = value;
    }
}
class Vector4 extends Vector3 {
    constructor(x?: number, y?: number, z?: number, w?: number) {
        super();
        if (arguments.length) this.elements = new Float32Array([x, y, z, w]);
        else return this;
    }
    public get w() {
        return this.elements[3];
    }
    public set w(value: number) {
        this.elements[3] = value;
    }
}
class UnitVector {
    constructor(size: number) {
        if (size === 2) return new Vector2(1, 1);
        else if (size === 3) return new Vector3(1, 1, 1);
        else if (size === 4) return new Vector4(1, 1, 1, 1);
        else throw new Error('Unsupported Vector Size:' + size);
    }
}
class ZeroVector {
    constructor(size: number) {
        if (size === 2) return new Vector2(0, 0);
        else if (size === 3) return new Vector3(0, 0, 0);
        else if (size === 4) return new Vector4(0, 0, 0, 0);
        else throw new Error('Unsupported Vector Size:' + size);
    }
}
abstract class Matrix {
    protected elements: Float32Array;
}
class Matrix2 extends Matrix {
    constructor(...elements: number[]) {
        super();
        if (arguments.length = 4) this.elements = new Float32Array([...elements]);
        else return this;
    }
}
class Matrix3 extends Matrix {
    constructor(...elements: number[]) {
        super();
        if (arguments.length = 9) this.elements = new Float32Array([...elements]);
        else return this;
    }
}
class Matrix4 extends Matrix {
    constructor(...elements: number[]) {
        super();
        if (arguments.length = 16) this.elements = new Float32Array([...elements]);
        else return this;
    }
}
class IdentityMatrix {
    constructor(size: number) {
        if (size === 2) return new Matrix2(1, 0, 0, 1);
        else if (size === 3) return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
        else if (size === 4) return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        else throw new Error('Unsupported Matrix Size:' + size);
    }
}

export { Vector, Vector2, Vector3, Vector4, UnitVector, ZeroVector, Matrix, Matrix2, Matrix3, Matrix4, IdentityMatrix };