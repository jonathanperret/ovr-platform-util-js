const __js = function () {
    const fs = require('fs');
    if (!fs.existsSync('ovr-platform-util.exe')) {
        require('child_process').execFileSync('curl', ['-L', '-o', 'ovr-platform-util.exe', 'https://www.oculus.com/download_app/?id=1076686279105243']);
    }
    const buf = fs.readFileSync('ovr-platform-util.exe');
    const startIndex = buf.indexOf('var __BUNDLE_START_TIME__');
    const realStartIndex = buf.indexOf('\n', startIndex) + 1;
    const endIndex = buf.indexOf(0, realStartIndex);
    return buf.slice(realStartIndex, endIndex).toString('utf-8');
}();

__processBinding = process.binding;
process.binding = (name) => {
    try {
        return __processBinding.call(process, name);
    } catch (e) {
        switch (name) {
            case 'rdiff':
                return {
                    delta(signaturePath, uploadPath, diffPath) {
                        require('child_process').execFileSync('rdiff', ['delta', signaturePath, uploadPath, diffPath]);
                    }
                };
            case 'ecinjection':
                return {};
            default:
                console.error(e.message);
                return {};
        }
    }
};
global.require = require;
eval(__js);