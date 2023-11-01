import * as BABYLON from 'babylonjs'
import * as Materials from 'babylonjs-materials';
import 'babylonjs-loaders'

const myScene = (engine, canvas) => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Sample Sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    
    // Sphere Material
    const mySphereMat = new BABYLON.StandardMaterial("mySphereMat", scene);
    mySphereMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    sphere.material = mySphereMat;

    sphere.position.y = 1;

    // Sample Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
}

export default myScene;