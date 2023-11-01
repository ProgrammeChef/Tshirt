import React, { useRef } from 'react';

const GLBLoad = (props) => {
    const glbFileRef = useRef(null);

    const handleFileChange = () => {
        const file = glbFileRef.current.files[0];
        if (file) {
                props.fileChangedCallback(file);
        }
    }

    return (
        <div>
            <h3>Choose GLB file</h3>
            <input className="form-control" type="file" ref={glbFileRef} onChange={handleFileChange} />
        </div>
    )
}

export default GLBLoad;