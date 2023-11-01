import 'bootstrap/dist/css/bootstrap.css'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import {useEffect} from 'react';

const BabylonScene = (props) => {
    useEffect(() => {
        const canvas = document.getElementById('babylon-canvas');
        const engine = new BABYLON.Engine(canvas, true);

        // From here, the things are same as normal Babylon js!
        const scene = new BABYLON.Scene(engine);
    
        // Create a camera
        const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
    
        // Attach the camera to the canvas
        camera.attachControl(canvas, true);
    
        // Create a light source
        const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 5, -5), scene);
    
        // Import the .glb file
        const file = props.file;
        console.log("BabylonScene.tsx");
        console.log(file);
        if (file !== "" && file !== "./undefined") {
          console.log("yes", file);
          BABYLON.SceneLoader.ImportMesh('', file, '', scene, (meshes) => {
          // Position, scale, or modify the imported meshes if needed
          // For example, you can iterate through the `meshes` array and apply transformations
    
          // Set up your Babylon.js scene here
    
          engine.runRenderLoop(() => {
            scene.render();
          });
        });
        }

        else {
          console.log("no");
          BABYLON.SceneLoader.ImportMesh('', "./default.glb", '', scene, (meshes) => {
          // Position, scale, or modify the imported meshes if needed
          // For example, you can iterate through the `meshes` array and apply transformations
    
          // Set up your Babylon.js scene here
    
          engine.runRenderLoop(() => {
            scene.render();
          });
        });
        }
    
        return () => {
          engine.dispose();
        };
    }, []);

    return (
      <div className = "card shadow-sm">
        <div className = "card-body">
          <canvas style={{height: "100%", width: "100%"}} id="babylon-canvas" />
        </div>
      </div>
    );
}

export default BabylonScene;