import React, { useRef, useEffect, useState } from 'react';
import * as BABYLON from 'babylonjs'
import * as Materials from 'babylonjs-materials';

const OneView = () => {
    const [GLBBase64String, setGLBBase64String] = useState("");
    const [customGLBSetFlag, setCustomGLBSetFlag] = useState(false);

    const glbFileRef = useRef(null);

    let canvas, engine, scene, camera, light, file;

    function fileToBase64(file, callback) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var base64String = event.target.result.split(',')[1];
          console.log("base64String: ", base64String);
          callback(base64String);
        };
        reader.readAsDataURL(file);
    }

    const handleFileChange = () => {
        console.log("File: ", glbFileRef.current.files[0]);
        file = glbFileRef.current.files[0];
        if (file) {
            fileToBase64(file, base64String => {
                setGLBBase64String(base64String);
                setTimeout(() => {
                    setCustomGLBSetFlag(true);
                }, 200);
            })
        }
    }

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

        if (!customGLBSetFlag) {        
            // Sample Sphere
            const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
            
            // Sphere Material
            const mySphereMat = new BABYLON.StandardMaterial("mySphereMat", scene);
            mySphereMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
            sphere.material = mySphereMat;
        
            sphere.position.y = 1;

            // Sample Ground
            const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
        }

        if (customGLBSetFlag) {
            // If the user selects the GLB file to view it.
        }
        
        //////////////////////////////// Scene End ////////////////////////////////

        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => {
          engine.dispose();
        };

    }, [customGLBSetFlag]);

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