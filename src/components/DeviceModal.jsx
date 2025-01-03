import React, { useState, useEffect } from "react";

const DeviceModal = ({
  isOpen,
  title,
  actionType,
  initialData = {},
  onSubmit,
  onCancel,
}) => {
  const [deviceData, setDeviceData] = useState({
    roleName: "",
    description: "",
    status: "active",
    images: [],
  });

  useEffect(() => {
    if (actionType === "edit" && initialData) {
      setDeviceData({
        roleName: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "active",
        images: initialData.images || [],
      });
    } else if (actionType === "add") {
      setDeviceData({ roleName: "", description: "", status: "active", images: [] });
    }
  }, [actionType, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = files.map((file) => URL.createObjectURL(file));
    setDeviceData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...updatedImages],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(deviceData);
  };

  const renderTextInput = (label, name, value, placeholder, required = false) => (
    <div className="col-12 mb-20">
      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="form-control radius-8"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );

  const renderTextarea = (label, name, value, placeholder) => (
    <div className="col-12 mb-20">
      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
        {label}
      </label>
      <textarea
        name={name}
        className="form-control radius-8"
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );

  const renderRadioInput = (label, name, value) => (
    <div className="form-check d-flex align-items-center gap-2">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        value={value}
        checked={deviceData.status === value}
        onChange={handleChange}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content radius-16 bg-base">
          <div className="modal-header py-16 px-24 border-bottom">
            <h1 className="modal-title fs-5">{title}</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-24">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {actionType !== "delete" ? (
                  <>
                    {renderTextInput("Title", "roleName", deviceData.roleName, "Enter Title", true)}
                    {renderTextarea("Description", "description", deviceData.description, "Write some text")}
                    <div className="col-12 mb-20">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Status
                      </label>
                      <div className="d-flex align-items-center flex-wrap gap-28">
                        {renderRadioInput("Active", "status", "active")}
                        {renderRadioInput("Inactive", "status", "inactive")}
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Upload Images
                      </label>
                      <input
                        type="file"
                        name="images"
                        className="form-control"
                        multiple
                        onChange={handleImageChange}
                      />
                      <div className="image-preview d-flex flex-wrap gap-2 mt-3">
                        {deviceData.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Uploaded ${index + 1}`}
                            className="img-thumbnail"
                            width="100"
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-12 text-center mb-20">
                    <p>Are you sure you want to delete this device?</p>
                  </div>
                )}
                <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                  <button
                    type="button"
                    className="btn btn-danger radius-8"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary radius-8">
                    {actionType === "add"
                      ? "Add Device"
                      : actionType === "edit"
                      ? "Save Changes"
                      : "Delete"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceModal;
