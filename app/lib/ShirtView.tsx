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
        <div className="row">
            <div className = "col-3 p-2">
                <GLBLoad fileChangedCallback = {fileChanged} />
            </div>
            <div className = "col-9">
                <BabylonScene key={file.name} file={`./${file.name}`}/>
            </div>
        </div>
    )
}

export default ShirtView;