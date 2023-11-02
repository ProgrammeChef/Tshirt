import 'bootstrap/dist/css/bootstrap.css'
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import {useEffect} from 'react';

const BabylonScene = (props) => {
    // mesh: Mesh
    // texture: texture file name
    // scene: scene
    const applyMaterialSleeve = (mesh, texture, scene) => {
      const meshFront = scene.getMeshByID("50_primitive0");
      // Create the fabric texture material
      const materialFabric = new BABYLON.StandardMaterial("fabric", scene);
      materialFabric.diffuseTexture = new BABYLON.Texture(texture, scene);
      meshFront.material = materialFabric;
    }

    // mesh: Mesh
    // texture: texture file name
    // scene: scene
    const applyMaterialSewingThreads = (mesh, texture, scene) => {
      const meshFront = scene.getMeshByID("50_primitive1");
      // Create the fabric texture material
      const materialFabric = new BABYLON.StandardMaterial("fabric", scene);
      materialFabric.diffuseTexture = new BABYLON.Texture(texture, scene);
      meshFront.material = materialFabric;
    }

    // mesh: Mesh
    // textures: texture file names array
    // scene: scene
    const applyMaterialBack = (mesh, textures, scene) => {
      const meshFront = scene.getMeshByID("50_primitive2");
      // Create the fabric texture material
      const materialFabric = new BABYLON.StandardMaterial("fabric", scene);
      materialFabric.diffuseTexture = new BABYLON.Texture(textures[0], scene);

      if (textures.length === 2) {
        // Create the logo texture material
        const materialLogo = new BABYLON.StandardMaterial("logo", scene);
        materialLogo.diffuseTexture = new BABYLON.Texture(textures[1], scene);

        // Apply Multi Materials
        const multiMaterial = new BABYLON.MultiMaterial("multiMaterial", scene);
        multiMaterial.subMaterials.push(materialLogo);
        multiMaterial.subMaterials.push(materialFabric);
        meshFront.material = multiMaterial;
      }
      else {
        meshFront.material = materialFabric;
      }
    }

    // mesh: Mesh
    // textures: texture file names array
    // scene: scene
    const applyMaterialFront = (mesh, textures, scene) => {
      const meshFront = scene.getMeshByID("50_primitive3");
      // Create the fabric texture material
      const materialFabric = new BABYLON.StandardMaterial("fabric", scene);
      materialFabric.diffuseTexture = new BABYLON.Texture(textures[0], scene);

      if (textures.length === 2) {
        // Create the logo texture material
        const materialLogo = new BABYLON.StandardMaterial("logo", scene);
        materialLogo.diffuseTexture = new BABYLON.Texture(textures[1], scene);

        // Apply Multi Materials
        const multiMaterial = new BABYLON.MultiMaterial("multiMaterial", scene);
        multiMaterial.subMaterials.push(materialLogo);
        multiMaterial.subMaterials.push(materialFabric);
        meshFront.material = multiMaterial;
      }
      else {
        meshFront.material = materialFabric;
      }
    }

    // mesh: Mesh
    // texture: texture file name
    // scene: scene
    const applyMaterialNeckline = (mesh, texture, scene) => {
      const meshFront = scene.getMeshByID("50_primitive4");
      // Create the fabric texture material
      const materialFabric = new BABYLON.StandardMaterial("fabric", scene);
      materialFabric.diffuseTexture = new BABYLON.Texture(texture, scene);
      meshFront.material = materialFabric;
    }

    useEffect(() => {
        const canvas = document.getElementById('babylon-canvas');
        const engine = new BABYLON.Engine(canvas, true);

        // ============================================ Start Playground ============================================
        // From here, the things are same as normal Babylon js as babylonjs playground.

        const scene = new BABYLON.Scene(engine);
    
        // Create a camera
        var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
    
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
          
          mesh.scaling = new BABYLON.Vector3(20, 20, 20);
          mesh.position = new BABYLON.Vector3(0, -30, 0);

          applyMaterialSleeve(mesh, "./fabric.jpg", scene);
          applyMaterialSewingThreads(mesh, "./fabric.jpg", scene);
          applyMaterialFront(mesh, ["./fabric.jpg", "./tshirtlogo.jpg"], scene);
          applyMaterialBack(mesh, ["./fabric.jpg"], scene);
          applyMaterialNeckline(mesh, "./fabric.jpg", scene);
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