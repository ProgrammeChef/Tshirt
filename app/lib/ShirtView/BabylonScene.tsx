import 'bootstrap/dist/css/bootstrap.css'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import {useEffect} from 'react';

const BabylonScene = (props) => {
    useEffect(() => {
        const canvas = document.getElementById('babylon-canvas');
        const engine = new BABYLON.Engine(canvas, true);

        // ============================================ Start Playground ============================================
        // From here, the things are same as normal Babylon js as babylonjs playground.

        const scene = new BABYLON.Scene(engine);
    
        // Create a camera
        const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
    
        // Attach the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        // Import the .glb file
        const file = props.file;

        if (file !== "" && file !== "./undefined") {
          console.log("yes", file);

          BABYLON.SceneLoader.ImportMesh('', file, '', scene, (meshes) => {
            // Position, scale, or modify the imported meshes if needed
            // For example, you can iterate through the `meshes` array and apply transformations
      
            // Set up your Babylon.js scene here
          });
        }
      

        else {
          console.log("no");
          BABYLON.SceneLoader.ImportMesh('', "./default.glb", '', scene, (meshes) => {
          // Position, scale, or modify the imported meshes if needed
          // For example, you can iterate through the `meshes` array and apply transformations
    
          // Set up your Babylon.js scene here

          const mesh = meshes[0];

          const meshFront = scene.getMeshByID("50_primitive3");
          const materialFront = new BABYLON.StandardMaterial('materialFront', scene);
          // Create a texture from the JPG file
          const textureFront = new BABYLON.Texture("fabric.jpg", scene);

          // Assign the texture to the material
          materialFront.diffuseTexture = textureFront;

          // Apply the material to the front mesh
          meshFront.material = materialFront;
        });
        }

        // ============================================ End Playground ============================================

        engine.runRenderLoop(() => {
          scene.render();
        });
    
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