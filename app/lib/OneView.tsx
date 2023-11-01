import React, { useRef, useEffect } from 'react';
import * as BABYLON from 'babylonjs'
import * as Materials from 'babylonjs-materials';

const OneView = () => {
    const glbFileRef = useRef(null);

    const handleFileChange = () => {
        console.log("File: ", glbFileRef.current.files[0]);
    }

    useEffect(() => {

        const canvas = document.getElementById('ViewCanvas');
        const engine = new BABYLON.Engine(canvas, true);
        
        //////////////////////////////// Scene Start ////////////////////////////////

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

        //////////////////////////////// Scene End ////////////////////////////////

        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => {
          engine.dispose();
        };

    }, []);

    return (
        <div className="row">
            <div className = "col-md-3 p-2">
                <input className="form-control" type="file" ref={glbFileRef} onChange={handleFileChange} />
            </div>
            <div className = "col-md-9">
                <div className = "card-body">
                    <canvas style={{height: "100%", width: "100%"}} id="ViewCanvas" />
                </div>
            </div>
        </div>
    )
};

export default OneView;