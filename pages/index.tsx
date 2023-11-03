import React, { useState, useEffect, useRef } from "react";
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
/**
 * # MY ACCOUNT GOOGLE PLAY:
 * @see {@link https://play.google.com/store/apps/developer?id=dzino Google Play}
 */

export default function PrivatePage(props) {
  const [file, setFile] = useState(null);
  let [customGLBSetFlag, setCustomGLBSetFlag] = useState<Boolean>(false);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  let canvas, engine: BABYLON.Engine, scene: BABYLON.Nullable<BABYLON.Scene> | undefined, camera, light;

  const onFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
      setCreateObjectURL(URL.createObjectURL(i));
      const body = new FormData();
      body.append('file', i);
      fetch('/api/file', {
        method: "POST", body
      }).then(res => {
        const response = res;
        console.log("File uploaded: (response): ", response);
        console.log(i);
        BABYLON.SceneLoader.ImportMeshAsync(`${i.name}`, `./${i.name}`, '', scene, (meshes) => {
        // BABYLON.SceneLoader.ImportMeshAsync('', "./tshirt.glb", '', scene, (meshes) => {
          // Position, scale, or modify the imported meshes if needed
          // For example, you can iterate through the `meshes` array and apply transformations
    
          // Set up your Babylon.js scene here

          const mesh = meshes[0];
          // mesh.scaling = new BABYLON.Vector3(20, 20, 20);
          // mesh.position = new BABYLON.Vector3(0, -30, 0);
        });
      }).catch(err => {
        alert('error uploading');
        console.error("errors occured in client side uploading", err);
      })
    }
  };

  useEffect(() => {

    canvas = document.getElementById('ViewCanvas');
    engine = new BABYLON.Engine(canvas, true);
    
    //////////////////////////////// Scene Start ////////////////////////////////

    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // // Sample Sphere
    // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
        
    // Sphere Material
    // const mySphereMat = new BABYLON.StandardMaterial("mySphereMat", scene);
    // mySphereMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // sphere.material = mySphereMat;
    
    // sphere.position.y = 1;

    // // Sample Ground
    // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    
    //////////////////////////////// Scene End ////////////////////////////////

    engine.runRenderLoop(() => {
        scene?.render();
    });

    return () => {
      engine.dispose();
    };

}, []);

  return (
      <div className="row">
            <div className = "col-md-3 p-2">
                <input className="form-control" type="file" name='file' onChange={onFileUpload} />
            </div>
            <div className = "col-md-9">
                <div className = "card-body">
                    <canvas style={{height: "100%", width: "100%"}} id="ViewCanvas" />
                </div>
            </div>
        </div>
  );
}
