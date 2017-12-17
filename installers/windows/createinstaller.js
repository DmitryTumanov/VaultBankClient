const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig () {
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
        appDirectory: path.join(outPath, 'VaultBank-win32-ia32'),
        authors: 'Tumanov Dmitry',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'VaultBank.exe',
        setupExe: 'VaultBankSetup.exe',
        loadingGif: path.join(rootPath, 'src', 'images', 'install.gif'),
        setupIcon: path.join(rootPath, 'src', 'images', 'main-icon.ico')
    })
}