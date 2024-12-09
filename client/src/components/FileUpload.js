import { useState,useEffect } from "react";
import styled from "styled-components";
import { FcRemoveImage } from "react-icons/fc";
import { FaRegFileImage } from "react-icons/fa";

const FileUpload = ({ form, field }) => {
  const [previews, setPreviews] = useState([...form.values[field.name]] || []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
    form.setFieldTouched(field.name,true);
    form.setFieldValue(field.name,selectedFiles);
  };
  const handleFileRemove = (event) => {
    event.stopPropagation();
    setPreviews([]);
  };
    useEffect(() => {
      if (!form.isSubmitting && form.values[field.name].length === 0) {
        setPreviews([]);
      }
    }, [form.isSubmitting, form.values, field.name]);

  return (
    <Wrapper>
      <div
        className="upload-container"
        onClick={() =>
          !previews.length && document.getElementById("fileInput").click()
        }
      >
        <input
          type="file"
          id="fileInput"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <div className="card mb-2">
          <div className="card-body">
            {previews.length ? (
              <>
                <span className="remove-icon" onClick={handleFileRemove}>
                  <FcRemoveImage />
                </span>
                <div className="prev-container">
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt="prev-image"
                      className="prev-img"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <span className="upload-icon">
                  <FaRegFileImage />
                </span>
                <div className="upload-msg">
                  Drag & Drop file here or
                  <button className="btn btn-light">Choose file</button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="info-container">
          <p>Supported formats: JPG, JPEG</p>
          <p>Max size: 1MB</p>
        </div>
      </div>

      {form.touched[field.name] && !!form.errors[field.name] ? (
        <p className="text-danger">
          {form.errors[field.name]}
        </p>
      ) : null}
    </Wrapper>
  );
};
export default FileUpload;

const Wrapper = styled.div`
  .upload-container {
    border: 1px solid #f2f3fb;
    padding: 1.25rem;
    text-align: center;
    height: 363px;
    border-radius: 1rem 1rem 0 0;
    cursor: pointer;
    &:hover {
      background: #e2e6ea;
    }
    .card-body {
      min-height: 280px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .hidden {
    display: none;
  }

  .info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    p {
      font-family: Inter;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 14px;
      text-align: left;
      color: #a6a4a4;
      padding: 0.625rem 0.25rem;
      margin: 0;
    }
  }
  .upload-msg {
    font-size: 16px;
    color: #6c757d;
    & .btn-link {
      font-weight: 600;
      font-size: 15px;
      color: #323232;
    }
  }
  .upload-icon {
    font-size: 4rem;
    color: #d2d2d2;
  }
  .remove-icon {
    font-size: 2rem;
  }

  .prev-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .prev-img {
    object-fit: cover;
    height: 50px;
    width: 50px;
    margin-top: 0.5rem;
    border-radius: 4px;
  }
`;
