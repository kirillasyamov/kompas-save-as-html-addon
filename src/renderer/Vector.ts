abstract class Vector {
    protected abstract size: number;
    protected abstract elements: Float32Array;
    public static dot(vectorA: Vector, vectorB: Vector): number {
        return vectorA.elements.reduce((sum, val, i) => val * vectorB.elements[i]);
    }
    public get(i: number): number {
        return this.elements[i - 1];
    }
    protected fill(num: number): void {
        this.elements.fill(num, 0);
    }
}
enum VectorType {
    unit,
    zero
}
class Vector2 extends Vector {
    protected size = 2;
    protected elements = new Float32Array(this.size);
    constructor(type?: VectorType, x?: number, y?: number) {
        super();
        if (type === VectorType.unit) this.fill(1);
        if (type === VectorType.zero) this.fill(0);
        if (arguments.length = 2) this.elements.set([...arguments]);
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
    protected size = 3;
    protected elements = new Float32Array(this.size);
    constructor(type?: VectorType, x?: number, y?: number, z?: number) {
        super();
        if (type === VectorType.unit) this.fill(1);
        if (type === VectorType.zero) this.fill(0);
        if (arguments.length = 4) this.elements.set([...arguments]);
    }
    public get z() {
        return this.elements[2];
    }
    public set z(value: number) {
        this.elements[2] = value;
    }
}
class Vector4 extends Vector3 {
    protected size = 4;
    protected elements = new Float32Array(this.size);
    constructor(type?: VectorType, x?: number, y?: number, z?: number, w?: number) {
        super();
        if (type === VectorType.unit) this.fill(1);
        if (type === VectorType.zero) this.fill(0);
        if (arguments.length = 4) this.elements.set([...arguments]);
    }
    public get w() {
        return this.elements[3];
    }
    public set w(value: number) {
        this.elements[3] = value;
    }
}

export { Vector, Vector2, Vector3, Vector4, VectorType }
