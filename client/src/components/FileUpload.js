import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaFileUpload } from "react-icons/fa";
import styled from "styled-components";

const HiddenFileInput = styled.input`
  display: none;
`;

const FileUpload = ({
  field,
  form,
  label,
  multiple,
  maxFiles = 5,
  ...props
}) => {
  const [previews, setPreviews] = useState([...(form.values.images ?? null)]);
  // Handle file changes
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);

    form.setFieldTouched(field.name, true);
    form.setFieldValue("images", selectedFiles);
  };

  // Handle clicking on the upload container
  const handleClick = () => {
    document.getElementById(field.name).click();
  };

  return (
    <Wrapper>
      {label && <Form.Label>{label}</Form.Label>}
      <div className="upload-container">
        <div className="uploader" onClick={handleClick}>
          {previews.length === 0 ? (
            <span className="upload-icon">
              <FaFileUpload />
            </span>
          ) : (
            <span className="upload-icon inactive">
              <FaFileUpload />
            </span>
          )}
          <HiddenFileInput
            id={field.name}
            type="file"
            name={field.name}
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            {...props}
          />
        </div>
      </div>

      {previews.length > 0 && (
        <div className="preview-container">
          {previews.map((src, index) => (
            <img key={index} src={src} alt={`preview-${index}`} />
          ))}
        </div>
      )}

      {form.touched[field.name] && form.errors[field.name] && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {form.errors[field.name]}
        </Form.Control.Feedback>
      )}
    </Wrapper>
  );
};

export default FileUpload;

const Wrapper = styled(Form.Group)`
  .upload-container{
    padding: 2rem;
    background: var(--gray-400);
    border-radius: 4px;
  }
  .uploader {
    width: 100%;
    height: 300px;
    border:1px solid #e0e0e0;
    box-shadow: 2px 2px 16px var(--gray-800);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--gray-100);
    text-align: center;

    .upload-icon {
      font-size: 4rem;
      color: var(--primary-dark-500);
    }
    .inactive {
      color: #aaa;
    }
  }
  .preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
  @media (max-width: 992px) {
    .uploader {
      height: 200px;
    }
    .preview-container {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
`;
