import React, { useRef } from 'react';

const GLBLoad = (props) => {
    const glbFileRef = useRef(null);

    const handleFileChange = () => {
        const file = glbFileRef.current.files[0];
        if (file) {
            console.log("handleFileChange!");
            props.fileChangedCallback(file);
        }
    }

    return (
        <div className="mb-3">
            <label className="form-label">Choose GLB file</label>
            <input className="form-control" type="file" ref={glbFileRef} onChange={handleFileChange} />
        </div>
    )
}

export default GLBLoad;