import {
  BufferGeometry,
  BufferAttribute,
  Mesh,
  MeshBasicMaterial
} from "three";

const geometry = new BufferGeometry();
const vertices = new Float32Array([
  -1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  1.0,
  1.0,

  1.0,
  1.0,
  1.0,
  -1.0,
  1.0,
  1.0,
  -1.0,
  -1.0,
  1.0
]);
const material = new MeshBasicMaterial({ color: 0xff0000 });
geometry.setAttribute("position", new BufferAttribute(vertices, 3));
export default () => new Mesh(geometry, material);
