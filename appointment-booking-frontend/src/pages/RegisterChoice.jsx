import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterChoice = () => {
  const ownerSecretCode = "OWNER2024";
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const verifySecretCode = () => {
    if (secretCode === ownerSecretCode) {
      setShowOwnerForm(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold">
          Choose Registration Type
        </h2>

        <div className="space-y-4">
          <Link
            to="/register/user"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Register as User
          </Link>

          {!showOwnerForm ? (
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Enter Owner Secret Code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                onClick={verifySecretCode}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Verify Code
              </button>
            </div>
          ) : (
            <Link
              to="/register/owner"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Continue as Owner
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;
