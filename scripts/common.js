const { spawn } = require('child_process')

/** Gets the absolute path to the binary file
 * (used for mitigating issues with Windows and the PATH environment variable). */
function getFullCommandPath(cmd) {
  let cmds = []

  spawn('where', [cmd], {
    shell: true,
    stdio: 'pipe',
  }).stdout.on('data', (data) => {
    cmds.push(data.toString().trim())
  })

  return cmds
}

function runWorkspacePackage(workspaceName, script) {
  const yarnCmd =
    getFullCommandPath('yarn')[0] || getFullCommandPath('yarn.cmd')[0] || 'yarn'

  spawn(yarnCmd, ['workspace', workspaceName, script], {
    shell: true,
    stdio: 'inherit',
  })
}

module.exports = { getFullCommandPath, runWorkspacePackage }
