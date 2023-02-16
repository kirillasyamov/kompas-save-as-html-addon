import { Object3d } from './Object3d';
import { Matrix4 } from './Matrix';

interface CameraProps {
    zoom: number;
    perspective: CameraPerspective;
    orthographic: CameraPerspective;
    type: string;
}

class Camera extends Object3d {
    props: CameraProps;
    matrixWorldInvert: Matrix4;
    matrixProjection: Matrix4;
    matrixInitial: Matrix4;
    matrixRotation: Matrix4;
    constructor(name: string, parent: Object3d, props: CameraProps) {
        super(name, parent);
        this.props = props;
        this.matrixWorldInvert = new Matrix4();
        this.matrixProjection = new Matrix4();
        this.matrixInitial = new Matrix4();
        this.matrixRotation = new Matrix4();
    }
}

export { Camera }