/**
 * [v1[1,1] v2[1,2] v3[1,3] v4[1,4]]
 * 
 * [v1[2,1] v2[2,2] v3[2,3] v4[2,4]]
 * 
 * [v1[3,1] v2[3,2] v3[3,3] v4[3,4]]
 * 
 * [v1[4,1] v2[4,2] v3[4,3] v4[4,4]] 
 * 
 * 1[1,1],2[1,2],3[1,3], 4[2,1],5[2,2],6[2,3], 7[3,1],8[3,2],9[3,3]
 */
abstract class Matrix {
    protected abstract size: number;
    protected abstract elements: Float32Array;
    protected getElementIndex(i: number, j: number): number {
        const elementsCount = this.size ** 2;
        return (i - 1) * elementsCount + j - 1;
    }
    public get(i: number, j: number): number {
        const position = this.getElementIndex(i, j);
        return this.elements[position];
    }
    protected getRowColumn(index: number): number[] {
        const position = index + 1;
        const i = Math.trunc(position / this.size);
        const j = position % this.size ? position % this.size : this.size;
        return [i, j];
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