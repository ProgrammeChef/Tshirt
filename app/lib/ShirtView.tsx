import React, {useState, useEffect} from 'react';
import BabylonScene from "./ShirtView/BabylonScene"
import GLBLoad from "./ShirtView/GLBLoad"

const ShirtView = () => {
    const [file, setFile] = useState("");

    const fileChanged = (file) => {
        console.log("ShirtView Component Updated");
        setFile(file);
    }

    useEffect(() => {
        console.log(file.name);
    }, [file]);

    return (
        <div>
           <BabylonScene key={file.name} file={`./${file.name}`}/>
           <GLBLoad fileChangedCallback = {fileChanged} />
        </div>
    )
}

export default ShirtView;