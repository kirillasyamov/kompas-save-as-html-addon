abstract class Matrix {
    protected abstract size: number;
    protected abstract elements: Float32Array;
    protected getIndex(i: number, j: number): number {
        const elementsCount = this.size ** 2;
        return (i - 1) * elementsCount + j - 1;
    }
    public get(i: number, j: number): number {
        const position = this.getIndex(i, j);
        return this.elements[position];
    }
    protected fill(condition: (i: number, j: number) => boolean, trueNum: number, falseNum: number): void {
        for (let index of this.elements) {
            const [i, j] = this.getRowColumn(index);
            if (condition(i, j)) this.elements[index] = trueNum;
            else this.elements[index] = falseNum;
        }
    }
}
enum MatrixType {
    identity
}
class Matrix2 extends Matrix {
    protected size = 4;
    protected elements = new Float32Array(this.size ** 2);
    constructor(type?: MatrixType, ...elements: number[]) {
        super();
        if (type === MatrixType.identity) this.fill((i, j) => i === j, 1, 0);
        if (arguments.length = 4) this.elements.set([...elements]);
    }
}
class Matrix3 extends Matrix {
    protected size = 3;
    protected elements = new Float32Array(this.size ** 2);
    constructor(type?: MatrixType, ...elements: number[]) {
        super();
        if (type === MatrixType.identity) this.fill((i, j) => i === j, 1, 0);
        if (arguments.length = 4) this.elements.set([...elements]);
    }
}
class Matrix4 extends Matrix {
    protected size = 4;
    protected elements = new Float32Array(this.size ** 2);
    constructor(type?: MatrixType, ...elements: number[]) {
        super();
        if (type === MatrixType.identity) this.fill((i, j) => i === j, 1, 0);
        if (arguments.length = 4) this.elements.set([...elements]);
    }
}

export { Matrix, Matrix2, Matrix3, Matrix4, MatrixType }