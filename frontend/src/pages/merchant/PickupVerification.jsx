import { useState } from 'react';
import { useToast } from '../../components/common';
import { HiQrcode, HiCheckCircle, HiXCircle, HiCamera } from 'react-icons/hi';

const PickupVerification = () => {
  const { addToast } = useToast();
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null); // 'success' | 'error' | null
  const [scanning, setScanning] = useState(false);

  const validCodes = ['FSV-X1Y2Z3', 'FSV-A9B8C7', 'FSV-D6E5F4', 'FSV-M3N4O5'];

  const handleVerify = () => {
    if (!code.trim()) {
      addToast('Please enter a pickup code', 'error');
      return;
    }
    if (validCodes.includes(code.trim().toUpperCase())) {
      setResult('success');
      addToast('Pickup verified successfully!', 'success');
    } else {
      setResult('error');
      addToast('Invalid or already used code', 'error');
    }
  };

  const handleScanToggle = () => {
    setScanning(!scanning);
    if (!scanning) {
      addToast('Camera QR scanning requires HTTPS in production', 'info');
    }
  };

  const reset = () => {
    setCode('');
    setResult(null);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold text-neutral-900">Pickup Verification</h1>
        <p className="text-neutral-500 text-sm mt-1">Scan QR code or enter pickup code to verify customer pickup</p>
      </div>

      {/* Result */}
      {result && (
        <div className={`card text-center py-8 ${result === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {result === 'success' ? (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce-in">
                <HiCheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-green-800 mb-2">Pickup Verified! ✅</h2>
              <p className="text-green-600 text-sm mb-1">Order has been marked as picked up.</p>
              <p className="text-green-500 text-xs">Impact metrics have been updated.</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <HiXCircle className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-red-800 mb-2">Verification Failed</h2>
              <p className="text-red-600 text-sm">This code is invalid or has already been used.</p>
            </>
          )}
          <button onClick={reset} className="btn-primary mt-6">Verify Another</button>
        </div>
      )}

      {!result && (
        <>
          {/* QR Scanner Area */}
          <div className="card">
            <div
              onClick={handleScanToggle}
              className="w-full aspect-square max-h-72 rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-transparent flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/10 transition-all"
            >
              {scanning ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
                    <HiCamera className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-primary">Camera Active</p>
                  <p className="text-xs text-neutral-400 mt-1">Point at QR code...</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <HiQrcode className="w-10 h-10 text-primary" />
                  </div>
                  <p className="font-medium text-neutral-700">Tap to Scan QR Code</p>
                  <p className="text-sm text-neutral-400 mt-1">Use your camera to scan the customer's QR</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Manual Code Input */}
          <div className="card">
            <h2 className="font-heading font-bold text-neutral-900 mb-4">Enter Code Manually</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                className="input flex-1 font-mono text-center text-lg tracking-widest uppercase"
                placeholder="FSV-XXXXXX"
                maxLength={10}
              />
              <button onClick={handleVerify} className="btn-primary px-6">
                Verify
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center">
              Enter the 10-character pickup code from the customer's receipt
            </p>
          </div>

          {/* Tips */}
          <div className="card bg-amber-50 border-amber-100">
            <h3 className="font-semibold text-amber-800 mb-2">💡 Tips</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Ask the customer to show their digital receipt</li>
              <li>• Scan the QR code or type the pickup code manually</li>
              <li>• Each code can only be used once</li>
              <li>• Verified pickups automatically update impact metrics</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PickupVerification;
