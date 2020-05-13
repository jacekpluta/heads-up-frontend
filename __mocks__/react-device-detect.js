const deviceDetect = jest.genMockFromModule("react-device-detect");
deviceDetect.isMobileOnly = true;
module.exports = deviceDetect;
