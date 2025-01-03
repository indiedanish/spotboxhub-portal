import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { QRCodeSVG } from "qrcode.react"; // Import QRCodeSVG
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";

const OnboardDevice = () => {
  const [deviceUUID, setDeviceUUID] = useState(null);
  const navigate = useNavigate();

  // Generate UUID and set it when the component mounts
  useEffect(() => {
    const generatedUUID = uuidv4(); // Generate a new UUID
    setDeviceUUID(generatedUUID); // Store it in the state
  }, []);

  const handlePlayAds = () => {
    navigate('/play-ads');
  }

  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Ad - List" />
        <div className="onboarding-container">
          <h2>Device Onboarding</h2>
          <button onClick={handlePlayAds} className="btn btn-danger mb-5">Play Advertisements -> </button>
          {deviceUUID ? (
            <div>
              <p>Scan the QR code below to onboard this device:</p>
              <div className="qr-container d-flex justify-content-center">
                {/* Use QRCodeSVG to display the QR code */}
                <QRCodeSVG
                  value={`${window.location.origin}/sign-in`}
                  size={256}
                  level="H" // Error correction level
                />
              </div>
              <p className="instructions mt-5">
                Scan this code with the device app to complete the onboarding
                process.
              </p>
            </div>
          ) : (
            <p>Generating QR Code...</p>
          )}
        </div>
      </MasterLayout>
    </>
  );
};

export default OnboardDevice;
